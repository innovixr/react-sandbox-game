import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState, useMemo, Object } from 'react';
import { Debug, Physics } from "@react-three/rapier";
import { Map } from './Map.js';
import { useFrame, useThree } from '@react-three/fiber';

const rr = 1;
const rf = 1;
const MAX_SPHERE = 20;

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function Scene() {

  let timeCount = 0;
  const [spheres, setSpheres] = useState([]);

  useFrame((state, delta) => {
    timeCount+=delta;
    if (timeCount>1 && spheres.length < MAX_SPHERE) {
      timeCount = 0;
      const kname='rs'+spheres.length;
      setSpheres([
        ...spheres,
        <RigidBody key={kname} colliders="ball" restitution={rr} friction={rf}>
          <mesh position={[ randomIntFromInterval(-1,1), 20, randomIntFromInterval(-1,1)]}>
            <sphereGeometry/>
            <meshStandardMaterial color="darkorange"/>
          </mesh>
        </RigidBody>
      ])
    }
  })

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

      <Physics timeStep="vary">
        <Debug/>
        <Map position={[0, 0, 0]}/>
        <RigidBody colliders="ball" restitution={rr} friction={rf}>
          <mesh position={[10.5, 10, 10]}>
            <sphereGeometry/>
            <meshStandardMaterial color="darkorange"/>
          </mesh>
        </RigidBody>
        <RigidBody colliders="ball" restitution={rr} friction={rf}>
          <mesh position={[12.5, 11, 10]}>
            <sphereGeometry/>
            <meshStandardMaterial color={0xFF0000}/>
          </mesh>
        </RigidBody>
        <RigidBody colliders="ball" restitution={rr} friction={rf}>
          <mesh position={[13.5, 12, 10]}>
            <sphereGeometry/>
            <meshStandardMaterial color={0xFF0000}/>
          </mesh>
        </RigidBody>
        <RigidBody colliders="ball" restitution={rr} friction={rf}>
          <mesh position={[15.5, 13, 10]}>
            <sphereGeometry/>
            <meshStandardMaterial color={0x0000FF}/>
          </mesh>
        </RigidBody>
        <RigidBody colliders="ball" restitution={rr} friction={rf}>
          <mesh position={[16.5, 14, 10]}>
            <sphereGeometry/>
            <meshStandardMaterial color={0x00FF00}/>
          </mesh>
        </RigidBody>
        { [...spheres] }
      </Physics>
    </>
  )
}