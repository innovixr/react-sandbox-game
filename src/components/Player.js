import { useRapier, RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { DoubleSide, CameraHelper, Vector3, Quaternion, BoxGeometry } from "three";
import { PerspectiveCamera, useKeyboardControls, useHelper } from '@react-three/drei';
import { Crosshair } from "./Crosshair.js";
import { useMouseInput } from "./hooks/useMouseInput.js";
import { Movement } from './xr/Movement';
import { XR, useController, Controllers, Hands } from "@react-three/xr";
import { SPEED, PLAYER_HEIGHT } from './Constant';
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
extend({ PointerLockControls });

//import { Bullet } from "./Bullet";

const mirrorPosition = [0, PLAYER_HEIGHT/2, 8];
const roofPosition = [0, 8.5, 0];

export const Player = ( {position=mirrorPosition, mass=70}) => {

  // References
  const rigidBodyRef = useRef();
  const playerMeshRef = useRef();
  const cameraRef = useRef();
  //useHelper(cameraRef, CameraHelper);

  // Bullets
  //const [bullets, setBullets] = useState([]);

  // Camera
  const { invalidate, gl, camera } = useThree();

  // Player movement constants
  const frontVector = useMemo(() => new Vector3(), []);
  const sideVector = useMemo(() => new Vector3(), []);
  const direction = useMemo(() => new Vector3(), []);
  let XRInProgress = false;

  // Physics
  const { rapier, world } = useRapier();
  const rapierWorld = useMemo(() => world.raw(), []);

  // Keyboard
  const [ subscribedKeys, getKeys ] = useKeyboardControls();

  useEffect(() => {
    cameraRef.current.addEventListener('change', invalidate)
    return () => cameraRef.current.removeEventListener('change', invalidate)
  }, [])

  useEffect(() => {
    const unsubscribeJump = subscribedKeys(
      state => state.jump,
      value => value && jump()
    );

    return () => {
      unsubscribeJump();
    }
  }, [])

  const jump = () => {
    const trans = rigidBodyRef.current.translation();
    trans.y-=PLAYER_HEIGHT/2+0.1;

    const ray = rapierWorld.castRay(
      new rapier.Ray(trans, { x: 0, y: -1, z: 0 }),
      10,
      true
    );

    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 0.15
    if (grounded) {
      const velocity = rigidBodyRef.current.linvel();
      rigidBodyRef
        .current
        .setLinvel({ x: velocity.x, y: 3, z: velocity.z })
    }
  }
  /*

    // Handles shooting
    const bulletDirection = cameraDirection.clone().multiplyScalar(bulletSpeed);
    const bulletPosition = camera.position
      .clone()
      .add(cameraDirection.clone().multiplyScalar(2));

    if (mouseInput.current.left) {
      const now = Date.now();
      if (now >= state.current.timeToShoot) {
        state.current.timeToShoot = now + bulletCoolDown;
        setBullets((bullets) => [
          ...bullets,
          {
            id: now,
            position: [bulletPosition.x, bulletPosition.y, bulletPosition.z],
            forward: [bulletDirection.x, bulletDirection.y, bulletDirection.z]
          }
        ]);
      }
    }
    */

  let velocity;

  //const leftController = useController('left');
  //const rightController = useController('right');
  //const gazeController = useController('none');

  useFrame((state, delta) => {
    
    if (XRInProgress) return;

    velocity = rigidBodyRef.current.linvel();
    // const pos = rigidBodyRef.current.translation();
    // const rot = rigidBodyApi.current.rotation();

    frontVector.set(0, 0, 0);
    sideVector.set(0, 0, 0);

    if (getKeys().forward) frontVector.z-= 1;
    if (getKeys().backward) frontVector.z+= 1;
    if (getKeys().rightward) sideVector.x-= 1;
    if (getKeys().leftward) sideVector.x+= 1;
   
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      //.applyEuler(playerRef.current.rotation)
      .applyEuler(camera.rotation);

    // move player
    rigidBodyRef
      .current
      .setLinvel({ x: direction.x, y: velocity.y, z: direction.z });

    // this required camera to have rotation order set to YXZ
    playerMeshRef.current.rotation.y = camera.rotation.y
    
  });
  
  const onXRStart = () => {
    XRInProgress = true;
    //cameraRef.current.lookAt(0,0,0);
    //cameraRef.position.y=0;
  }

  const pointerlockRef = useRef();

  useEffect(() => {
    // important !
    cameraRef.current.rotation.order="YXZ";
    const handleFocus = (e) => {
      pointerlockRef.current.lock();
    }
    gl.domElement.addEventListener("click", handleFocus);
    return () => {
      gl.domElement.removeEventListener("click", handleFocus);
    };
  }, []);

  return (
    <>
      <pointerLockControls ref={pointerlockRef} args={[camera, gl.domElement ]}/>
      <RigidBody 
        name="rigidBody" 
        ref={ rigidBodyRef } 
        position={position} 
        mass={mass} 
        colliders="hull" 
        enabledRotations={[false, false, false]}
        friction={0}
      >
        <XR onSessionStart={ onXRStart } >

          <mesh castShadow name="playerRef" ref={ playerMeshRef }>
            <capsuleGeometry args={[0.2, PLAYER_HEIGHT*0.8, 1, 4]}/>
            <meshStandardMaterial wireframe={false}/>
          </mesh>

          <PerspectiveCamera ref={cameraRef} makeDefault position={[0, PLAYER_HEIGHT/2-0.1, 0]}>
              { !XRInProgress && <Crosshair position={[0,0,-0.1]}/> }
          </PerspectiveCamera>

          <Controllers rayMaterial={{ color: 'blue' }} hideRaysOnBlur={false}/>
          <Hands />
          <Movement
            rigidBodyRef={rigidBodyRef}
            playerMeshRef={playerMeshRef}
          />
        </XR>

      </RigidBody>

      {/** Renders bullets 
      {bullets.map((bullet) => {
        return (
          <Bullet
            key={bullet.id}
            velocity={bullet.forward}
            position={bullet.position}
          />
        );
      })}
      */}
    </>
  );
};
