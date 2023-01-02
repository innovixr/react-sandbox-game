import { useEffect, useMemo, useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { BULLET_SPEED } from "./Constant";

export const Gun = () => {

  const gunRef = useRef();
  const { camera, gl } = useThree();
  let fireTimer;

  const startFire = () => {
    fireTimer = setInterval(fire, 100);
  }

  const stopFire = () => {
    clearInterval(fireTimer)
  }

  const fire = () => {
    console.log('fire !', camera);
    //const bulletDirection = cameraDirection.clone().multiplyScalar(BULLET_SPEED);
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


  useEffect(() => {
    gl.domElement.addEventListener('mousedown', startFire)
    gl.domElement.addEventListener('mouseup', stopFire)
    return () => {
      gl.domElement.removeEventListener('mousedown', startFire)
      gl.domElement.removeEventListener('mouseup', stopFire)
    }
  });

  return (
    <mesh name="gunRef" ref={ gunRef } position={[0.15, -0.1, -0.3]}>
      <boxGeometry args={[0.05, 0.04, 0.7]}/>
      <meshStandardMaterial/>
    </mesh>
  )
}