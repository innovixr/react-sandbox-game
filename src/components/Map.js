import { RigidBody } from "@react-three/rapier";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useLoader } from "@react-three/fiber";

export function Map(props) {

  const url = '/gltf/map.gltf';
  const gltf = useLoader(GLTFLoader, url);
  const map = [];

  const materials = {};
  for (const materialName in gltf.materials) {
    const material = gltf.materials[materialName];
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
          />
        </RigidBody>
      );
    }
  }

  return (map)
}
