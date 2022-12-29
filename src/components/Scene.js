import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef, forwardRef, useMemo } from 'react';
import { Debug, Physics } from "@react-three/rapier";
import { SphereGeometry } from "three";
import { Model as MyMap } from './MyMap.jsx';

export default function Scene() {
  
  const usePhysic = true;

  return (
    <>
      <directionalLight
          intensity={1}
          castShadow={true}
          shadow-bias={-0.00015}
          shadow-radius={4}
          shadow-blur={10}
          shadow-mapSize={[2048, 2048]}
          position={[85.0, 80.0, 70.0]}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
        />

      <ambientLight color={ 0x909090 } intensity={1} />

      {
      usePhysic ? 
        
        <Physics>
          <Debug/>
          <MyMap position={[0, 0, 0]}/>
          <RigidBody colliders="ball" restitution={0.8} friction={0.7}>
            <mesh position={[10.5, 10, 10]}>
              <sphereGeometry/>
              <meshStandardMaterial color={0xFF0000}/>
            </mesh>
          </RigidBody>
        </Physics> : 
        
        <MyMap position={[0, 0, 0]}/>
      }
    </>
  )
}