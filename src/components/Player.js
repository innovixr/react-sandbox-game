import { useRapier, RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { PerspectiveCamera, useKeyboardControls } from '@react-three/drei';
import { Crosshair } from "./Crosshair.js";
import { useMouseInput } from "./hooks/useMouseInput.js";

//import { Bullet } from "./Bullet";

const SPEED = 5;
const playerHeight = 1.75;

const mirrorPosition = [0, 0.01, 10];
const roofPosition = [0, 8.5, 0];

export const Player = ( {position=mirrorPosition, mass=70}) => {

  // References
  const rigidBodyRef = useRef();
  const playerRef = useRef();

  // Bullets
  //const [bullets, setBullets] = useState([]);

  // Camera
  const { camera } = useThree();

  // Player movement constants
  const frontVector = useMemo(() => new Vector3(), []);
  const sideVector = useMemo(() => new Vector3(), []);
  const direction = useMemo(() => new Vector3(), []);
  const playerPosition = useMemo(() => new Vector3(), []);

  // Physics
  const { rapier, world } = useRapier();
  const rapierWorld = useMemo(() => world.raw(), []);

  // Keyboard
  const [ subscribedKeys, getKeys ] = useKeyboardControls();

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
    const velocity = rigidBodyRef.current.linvel();

    const ray = rapierWorld.castRay(
      new rapier.Ray(rigidBodyRef.current.translation(),
      { x: 0, y: -1, z: 0 }
    ));

    const grounded = ray && ray.collider && Math.abs(ray.toi) <= playerHeight-0.01;
    if (grounded) 
      rigidBodyRef
        .current
        .setLinvel({ x: velocity.x, y: 3, z: velocity.z })
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

  useFrame((state, delta) => {
    const velocity = rigidBodyRef.current.linvel();
    // const pos = rigidBodyRef.current.translation();
    // const rot = rigidBodyApi.current.rotation();

    frontVector.set(0, 0, 0);
    sideVector.set(0, 0, 0);
    const { forward, backward, leftward, rightward } = getKeys()
    if (forward) frontVector.z-= 1;
    if (backward) frontVector.z+= 1;
    if (rightward) sideVector.x-= 1;
    if (leftward) sideVector.x+= 1;
   
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(playerRef.current.rotation)
      .applyEuler(camera.rotation);

    // move player
    rigidBodyRef
      .current
      .setLinvel({ x: direction.x, y: velocity.y, z: direction.z });

    // move camera
    playerRef
      .current
      .getWorldPosition(playerPosition);
    playerPosition.y+=(playerHeight/2)-0.1;
    camera.position.copy(playerPosition);

  });

  return (
    <>
      <RigidBody ref={ rigidBodyRef } mass={mass} colliders="hull" enabledRotations={[false, false, false]} friction={0} position={position}>

        <PerspectiveCamera makeDefault position={[0, 0, 0]}>
          <Crosshair position={[0,0,-0.1]}/>
        </PerspectiveCamera>

        <mesh ref={ playerRef }>
          <capsuleGeometry args={[0.5, 1.75/2]}/>
          <meshStandardMaterial color={0xFF0000} transparent="true" opacity="0.5"/>
        </mesh>

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
