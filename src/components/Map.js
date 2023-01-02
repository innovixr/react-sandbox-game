import { RigidBody } from "@react-three/rapier";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useLoader } from "@react-three/fiber";
import { KeyboardControls, Environment, BakeShadows, ContactShadows, Shadow } from '@react-three/drei';

export function Map(props) {

  const url = '/gltf/map.gltf';
  const gltf = useLoader(GLTFLoader, url);
  const map = [];

  const materials = {};
  for (const materialName in gltf.materials) {
    const material = gltf.materials[materialName];
    
    //material.flatShading = true;
    if (material.name && material.name.match(/Terrain|maison|mur|caisse|escalier/i)) {
      material.metalness = 0.2;
      material.roughness = 0.8;
    }
    if (material.name && material.name.match(/container/i)) {
      material.metalness = 0.5;
      material.roughness = 0.5;
    }
    //material.wireframe = true;
    if (materials[material.uuid]) {
      console.warn(`Map.js: ${materialName} is using an id already defined`);
    }
    materials[material.uuid] = material;
  }

  const uniq = {};

  for (const nodeName in gltf.nodes) {
    if (uniq[nodeName]) {
      console.warn(`Map.js: ${nodeName} is not uniq`);
    }
    uniq[nodeName] = 1;

    const node = gltf.nodes[nodeName];
    if (node.isMesh) {

      if (node.scale && ( node.scale.x !== 1 && node.scale.y !== 1 && node.scale.y !== 1)) {
        console.warn(`Map.js: mesh ${nodeName} got a custom scale !`, node.scale);
      }

      let colliders = node.userData.rigidbody || 'hull';

      node.rname = 'r'+node.name;

      map.push(
        <RigidBody
          key={node.rname}
          type="fixed"
          colliders={colliders}
          restitution={0.5}
          friction={0.7}
          canSleep={true}
          //onCollisionEnter={e => console.log('onCollisionEnter',e.colliderObject, node.name)}
          //onCollisionExit={e => console.log('onCollisionExit',e.colliderObject, node.name)}
          //onIntersectionEnter={e => console.log('onIntersectionEnter',e.colliderObject, node.name)}
          //onIntersectionExit={e => console.log('onIntersectionExit',e.colliderObject, node.name)}
          //onContactForce={e => console.log('onContactForce',e.colliderObject, node.name)}
        >
          <mesh 
            name={node.name}
            key={node.name} geometry={node.geometry} 
            material={materials[node.material.uuid]}
            position={node.position} 
            rotation={node.rotation}
            scale={node.scale}
            castShadow
            receiveShadow
          >
          { /* <Shadow rotation={[0, 0, 0]} scale={5} position={[0, -1, 0]} color="black" opacity={1} /> */ }
          </mesh>
        </RigidBody>
      );
    }
  }

  return (map)
}
