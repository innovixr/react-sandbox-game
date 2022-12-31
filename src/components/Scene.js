import { RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState } from 'react';
import { Debug, Physics } from "@react-three/rapier";
import { Map } from './Map.js';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { Player } from "./Player";
import { Skybox } from "./Skybox";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { Mirror } from "./Mirror.js";
import { folder, useControls } from 'leva';
import * as THREE from 'three';
import { useKeyboardControls } from '@react-three/drei';
//import { softShadows } from "@react-three/drei";

extend({ PointerLockControls });

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

  const levaControls = useControls({
    'Debug':folder({
      debugPhysics:false,
      addBallons:false
    })
  });

  useEffect(() => {
    camera.layers.enable(0);
    camera.layers.enable(1);
  }, [camera]);

  useEffect(() => {
    const handleFocus = () => controls.current.lock();
    document.addEventListener("click", handleFocus);
    return () => {
      document.removeEventListener("click", handleFocus);
    };
  }, [gl]);


  let timeCount = 0;
  const [spheres, setSpheres] = useState([]);

  const controls = useRef();
  
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


    if (levaControls.addBallons) {
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
      <Skybox/>
      <pointerLockControls ref={controls} args={[camera, gl.domElement]}/>      
      <Mirror position={[0, 1.01, 5.2]}/>
      <Physics timeStep="vary">
        { levaControls.debugPhysics && <Debug/> }
        <Map position={[0, 0, 0]}/>
        <Player mass="10"/>
        { [...spheres] }
      </Physics>
    </>
  )
}