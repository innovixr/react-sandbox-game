import { useEffect, useMemo, useRef, useState } from 'react';
import { Debug, Physics, RigidBody } from "@react-three/rapier";
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls, ContactShadows } from '@react-three/drei';
import { folder, useControls } from 'leva';
import { Map } from './Map.js';
import { Player } from "./Player";
import { Skybox } from "./Skybox";
import { Mirror } from "./Mirror.js";
import { XR, Controllers, Hands, VRButton } from "@react-three/xr";

import * as THREE from 'three';

//import { softShadows } from "@react-three/drei";

/*
softShadows({
  frustum: 3.75,
  size: 0.005,
  near: 9.5,
  samples: 17,
  rings: 11, // Rings (default: 11) must be a int
})
*/

const rr = 1;
const rf = 1;
const MAX_SPHERE = 100;
let lastInsertedSphere = 0;

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function Scene({ clicked }) {

  const { camera, gl } = useThree();

  const [ subscribedKeys, getKeys ] = useKeyboardControls();

  const lc = useControls({
    'Debug':folder({
      debugPhysics:false,
      addBallons:false,
      mirrorEnable:false
    })
  });

  useEffect(() => {
    camera.layers.enable(0);
    camera.layers.enable(1);
  }, [camera]);

  let timeCount = 0;
  const [spheres, setSpheres] = useState([]);

  useFrame((state, delta) => {
    const { addABallon } = getKeys()

    if (addABallon) {
      const nis = lastInsertedSphere + (1*500);
      const canInsertSphere = Date.now() > nis;
      if (canInsertSphere) {
        const kname='rs'+spheres.length;
        let color = new THREE.Color( 0xffffff );
        color.setHex( Math.random() * 0xffffff );
        setSpheres([
          ...spheres,
          <RigidBody key={kname} colliders="ball" restitution={rr} friction={rf}>
            <mesh 
              castShadow
              receiveShadow
              position={[ randomIntFromInterval(-1,1), 20, randomIntFromInterval(-1,1)]}>
              <sphereGeometry args={[0.5]}/>
              <meshStandardMaterial color={color}/>
            </mesh>
          </RigidBody>
        ]);
        lastInsertedSphere = Date.now();
      }
    }


    if (lc.addBallons) {
      timeCount+=delta;
      if (timeCount>2 && spheres.length < MAX_SPHERE) {
        timeCount = 0;
        const kname='rs'+spheres.length;
        setSpheres([
          ...spheres,
          <RigidBody key={kname} colliders="ball" restitution={rr} friction={rf}>
            <mesh 
              castShadow
              receiveShadow
              position={[ randomIntFromInterval(-1,1), 20, randomIntFromInterval(-1,1)]}>
              <sphereGeometry args={[0.5]}/>
              <meshStandardMaterial color="darkorange"/>
            </mesh>
          </RigidBody>
        ])
      }
    }
  })


  return (
    <>
      { /* <Skybox/> */ }
      {
        lc.mirrorEnable && 
          <Mirror position={[0, 1.01, 5.2]}/> 
      }
      <Physics timeStep="vary">
        { lc.debugPhysics && <Debug/> }
        <Map position={[0, 0, 0]}/>
        <Player mass="10"/>
        { [...spheres] }
      </Physics>
      { /* <axesHelper position={[0,0,10]}/> */ }
    </>
  )
}