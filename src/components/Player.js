//import { useSphere } from "@react-three/cannon";
import { RigidBody } from "@react-three/rapier";
import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useKeyboardInput } from "./hooks/useKeyboardInput";
import { useVariable } from "./hooks/useVariable";
//import { Bullet } from "./Bullet";
//import { Raycaster } from "three";

/** Player movement constants */
//const speed = 300;
//const bulletSpeed = 30;
//const bulletCoolDown = 300;
//const jumpSpeed = 5;
//const jumpCoolDown = 400;
const SPEED = 5;

export const Player = ( {position=[0, 1.6, 10] }) => {
  const rigidBodyRef = useRef();
  const playerRef = useRef();

  /** Bullets */
  //const [bullets, setBullets] = useState([]);

  /** Input hooks */
  const pressed = useKeyboardInput(["KeyW", "KeyA", "KeyS", "KeyD", "Space"]);

  /** Converts the input state to ref so they can be used inside useFrame */
  const input = useVariable(pressed);

  /** Player movement constants */
  const { camera } = useThree();
  const frontVector = useMemo(() => new Vector3(), []);
  const sideVector = useMemo(() => new Vector3(), []);
  const direction = useMemo(() => new Vector3(), []);
  const playerPosition = useMemo(() => new Vector3(), []);

  /** Player loop
  useFrame((_, delta) => {
    // Handles movement
    const { KeyW, KeyS, KeyQ, KeyD, Space } = input.current;

    let velocity = new Vector3(0, 0, 0);
    let cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);

    let forward = new Vector3();
    forward.setFromMatrixColumn(camera.matrix, 0);
    forward.crossVectors(camera.up, forward);

    let right = new Vector3();
    right.setFromMatrixColumn(camera.matrix, 0);

    let [horizontal, vertical] = [0, 0];

    if (KeyW) vertical += 1;
    if (KeyS) vertical -= 1;
    if (KeyD) horizontal += 1;
    if (KeyQ) horizontal -= 1;

    if (horizontal !== 0 && vertical !== 0) {
      velocity
        .add(forward.clone().multiplyScalar(speed * vertical))
        .add(right.clone().multiplyScalar(speed * horizontal));
      velocity.clampLength(-speed, speed);
    } else if (horizontal !== 0) {
      velocity.add(right.clone().multiplyScalar(speed * horizontal));
    } else if (vertical !== 0) {
      velocity.add(forward.clone().multiplyScalar(speed * vertical));
    }

    // Updates player velocity
    // api.velocity.set( velocity.x * delta, state.current.vel[1], velocity.z * delta );

    // Updates camera position
    // camera.position.set( sphereRef.current.position.x, sphereRef.current.position.y + 1, sphereRef.current.position.z );

    // Handles jumping
    if (state.current.Space && state.current.vel[1] < 0) {
      // Ground check
      const raycaster = new Raycaster(
        sphereRef.current.position,
        new Vector3(0, -1, 0),
        0,
        0.2
      );
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length !== 0) {
        state.current.Space = false;
      }
    }

    if (Space && !state.current.Space) {
      const now = Date.now();
      if (now > state.current.timeTojump) {
        state.current.timeTojump = now + jumpCoolDown;
        state.current.Space = true;
        //api.velocity.set(state.current.vel[0], jumpSpeed, state.current.vel[2]);
      }
    }

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
  });
  */

  useFrame((state, delta) => {
    //  access current player state
    const velocity = rigidBodyRef.current.linvel();
    //const pos = rigidBodyRef.current.translation();
    // const rot = rigidBodyApi.current.rotation();

    // movement
    let [horizontal, vertical] = [0, 0];

    const { KeyW, KeyS, KeyA, KeyD } = input.current;
    if (KeyW) vertical -= 1;
    if (KeyS) vertical += 1;
    if (KeyD) horizontal -= 1;
    if (KeyA) horizontal += 1;

    frontVector.set(0, 0, vertical);
    sideVector.set(horizontal, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      // apply player rotation (works when rotating player, not when rotating your head)
      .applyEuler(playerRef.current.rotation)
    // apply camera rotation ()
      .applyEuler(camera.rotation);
    rigidBodyRef.current.setLinvel({
      x: direction.x,
      y: velocity.y,
      z: direction.z
    });

    playerRef.current.getWorldPosition(playerPosition);
    camera.position.copy(playerPosition);
    //if (jump) onJump();
  });

  return (
    <>
      <RigidBody 
        ref = { rigidBodyRef }
        enabledRotations={[false, false, false]}
        colliders="hull"
        friction={0}
      >
        <mesh ref={ playerRef } position={position}>
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
