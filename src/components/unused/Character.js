import { useState, useEffect, useRef } from 'react';
import { useKeyboardControls, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { useRapier, RigidBody } from "@react-three/rapier";
import * as THREE from 'three';
import AnimationsHandler from './Animations.js';

//import { SphereGeometry } from 'three';

// take a look at this
// https://gltf.pmnd.rs/

function shadowRecursive(el) {
    if (el.isMesh) {
      el.castShadow = true;
    }
    if (el.children) {
      el.children.forEach(shadowRecursive);
    }
}

export default function Player() {
  const model = useGLTF('/gltf/bot45.gltf');
  model.scene.children.forEach(shadowRecursive);

  const animations = useAnimations(model.animations, model.scene);
  const [ subscribeKeys, getKeys ] = useKeyboardControls();

  const body = useRef();
  const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3());
  const [ smoothedCameraTarget ] = useState(() => new THREE.Vector3());
  const direction = new THREE.Vector3()
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const cameraPosition = new THREE.Vector3();
  const cameraTarget = new THREE.Vector3();

  function updateCamera(state) {

    cameraPosition.copy(body.current.translation());
    cameraPosition.x+=1.5;
    cameraPosition.y+=1.6;
    //cameraPosition.z+=5.7;
    
    cameraTarget.copy(body.current.translation());
    cameraTarget.y+=0.8;

    //smoothedCameraPosition.lerp(cameraPosition, 0.1);
    //smoothedCameraTarget.lerp(cameraTarget, 0.1);

    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(cameraTarget);
  }

  useEffect(() => {

    const animHandler = new AnimationsHandler(animations.actions);

    const unSubscribeForwardKey = subscribeKeys( s => s.forward, v => animHandler.moveForward(v) )
    const unSubscribeBackwardKey = subscribeKeys( s => s.backward, v => animHandler.moveBackward(v) )
    const unSubscribeLeftKey = subscribeKeys( s => s.left, v => animHandler.moveLeft(v) )
    const unSubscribeRightKey = subscribeKeys( s => s.right, v => animHandler.moveRight(v) )
    const unSubscribeShiftKey = subscribeKeys( s => s.running, v => animHandler.toggleFaster(v) )
    const unSubscribeCtrlKey = subscribeKeys( s => s.crouch, v => animHandler.toggleCrouch(v) )
    
    return () => {
      unSubscribeForwardKey();
      unSubscribeBackwardKey();
      unSubscribeLeftKey();
      unSubscribeRightKey();
      unSubscribeShiftKey();
      unSubscribeCtrlKey();
    }

  }, [])

  useFrame((state, delta) => {

    const { forward, backward, left, right, running } = getKeys();

    let speed = forward ? 1.8 : 1.2;
    if (running) {
      if (forward) {
        speed = speed * 3;
      } else {
        speed = speed * 2.5;
      }
    }
    frontVector.set(0, 0, - (backward - forward))
    sideVector.set(-(left - right), 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed);//.applyEuler(state.camera.rotation)

    const velocity = body.current.linvel()
    body.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })

    updateCamera(state);

  })


  const useBody = true;
  return <>
  <RigidBody
      //position={[0, 1, 0]}
      ref={body}
      restitution={0.2}
      friction={1}
      //linearDamping={0.5}
      //angularDamping={1}
      // onCollisionEnter={() => console.log("player bang")}
      // ccd={true}
      canSleep={true}
      //colliders={false}
      //enabledRotations={[false, true, false]}
      type="dynamic"
    >
      {
        useBody 
        ? <primitive object={model.scene} scale={1}/>
        : <mesh scale={ 0.5 } position-y={ 1.5 } castShadow>
            <sphereGeometry/>
            <meshStandardMaterial color="orange"/>
          </mesh>
      }
    </RigidBody>
    
  </>
}
