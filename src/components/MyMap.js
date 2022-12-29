import { RigidBody } from "@react-three/rapier";

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Modified to update gltf path and add RigidBody to the floor
@TODO; test Instancied mesh for containers
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function MyMap(props) {
  const { nodes, materials } = useGLTF("/gltf/scene01.gltf");
  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        {/*
        
        Enabling RigidBody trigger this error:
        
        Uncaught TypeError: Cannot destructure property 'world' of 'useRapier(...)' as it is undefined.
        at useRigidBody (bundle.js:17929:5)
        at bundle.js:18631:45
        at renderWithHooks (bundle.js:59869:22)
        at updateForwardRef (bundle.js:63430:24)
        at beginWork (bundle.js:65490:20)
        at HTMLUnknownElement.callCallback (bundle.js:65761:18)
        at Object.invokeGuardedCallbackDev (bundle.js:65805:20)
        at invokeGuardedCallback (bundle.js:65859:35)
        at beginWork$1 (bundle.js:70284:11)
        at performUnitOfWork (bundle.js:69570:16)
        */}

        {/* <RigidBody type="fixed" restitution={0.5} friction={0.7}> */}
        <mesh
          name="Terrain"
          castShadow
          receiveShadow
          geometry={nodes.Terrain.geometry}
          material={materials.Terrain}
          position={[-1.05, 0, 0]}
          scale={57.47}
        />
        {/*  </RigidBody> */}
        <mesh
          name="Container"
          castShadow
          receiveShadow
          geometry={nodes.Container.geometry}
          material={materials.ContainerBlanc}
          position={[13.98, 1.14, -0.48]}
        />
        <mesh
          name="Container001"
          castShadow
          receiveShadow
          geometry={nodes.Container001.geometry}
          material={materials.ContainerBleu}
          position={[8, 1.14, 0]}
        />
        <mesh
          name="Container002"
          castShadow
          receiveShadow
          geometry={nodes.Container002.geometry}
          material={nodes.Container002.material}
          position={[12.58, 3.42, -0.37]}
          rotation={[0, 0.1, 0]}
        />
        <mesh
          name="Container003"
          castShadow
          receiveShadow
          geometry={nodes.Container003.geometry}
          material={materials.ContainerBleu}
          position={[4.28, 1.15, 16.25]}
        />
        <mesh
          name="Container004"
          castShadow
          receiveShadow
          geometry={nodes.Container004.geometry}
          material={materials.ContainerOrange}
          position={[0.37, 0, 0]}
        />
        <mesh
          name="Container005"
          castShadow
          receiveShadow
          geometry={nodes.Container005.geometry}
          material={materials.ContainerOrange}
          position={[13.91, 1.14, 9.46]}
        />
        <mesh
          name="Container006"
          castShadow
          receiveShadow
          geometry={nodes.Container006.geometry}
          material={materials.ContainerOrange}
          position={[-0.21, 1.14, 14.2]}
        />
        <mesh
          name="Container007"
          castShadow
          receiveShadow
          geometry={nodes.Container007.geometry}
          material={materials.ContainerBlanc}
          position={[-6.22, 1.14, 14.74]}
        />
        <mesh
          name="Container008"
          castShadow
          receiveShadow
          geometry={nodes.Container008.geometry}
          material={materials.ContainerOrange}
          position={[-14.61, 1.14, 14.7]}
        />
        <mesh
          name="Container009"
          castShadow
          receiveShadow
          geometry={nodes.Container009.geometry}
          material={materials.ContainerBleu}
          position={[-14.61, 1.14, 10.18]}
        />
        <mesh
          name="Container010"
          castShadow
          receiveShadow
          geometry={nodes.Container010.geometry}
          material={materials.ContainerBleu}
          position={[-18.09, 1.14, 1.73]}
        />
        <mesh
          name="Container011"
          castShadow
          receiveShadow
          geometry={nodes.Container011.geometry}
          material={materials.ContainerBlanc}
          position={[-18.09, 1.14, -1.27]}
        />
        <mesh
          name="Container012"
          castShadow
          receiveShadow
          geometry={nodes.Container012.geometry}
          material={materials.ContainerBleu}
          position={[-13.62, 1.14, 0.24]}
        />
        <mesh
          name="Container013"
          castShadow
          receiveShadow
          geometry={nodes.Container013.geometry}
          material={materials.ContainerOrange}
          position={[-18.09, 3.42, 1.73]}
        />
        <mesh
          name="Container014"
          castShadow
          receiveShadow
          geometry={nodes.Container014.geometry}
          material={materials.ContainerBleu}
          position={[-18.09, 3.42, -1.28]}
        />
        <mesh
          name="Container015"
          castShadow
          receiveShadow
          geometry={nodes.Container015.geometry}
          material={materials.ContainerBlanc}
          position={[-13.62, 3.42, 0.24]}
        />
        <mesh
          name="Container016"
          castShadow
          receiveShadow
          geometry={nodes.Container016.geometry}
          material={materials.ContainerOrange}
          position={[4.1, 1.15, 22.34]}
          rotation={[0, -0.06, 0]}
        />
        <mesh
          name="Container017"
          castShadow
          receiveShadow
          geometry={nodes.Container017.geometry}
          material={materials.ContainerOrange}
          position={[-1.31, 1.14, 23.68]}
          scale={[1, 1, 1.32]}
        />
        <mesh
          name="Container018"
          castShadow
          receiveShadow
          geometry={nodes.Container018.geometry}
          material={materials.ContainerBleu}
          position={[1.77, 3.42, 23.65]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <mesh
          name="Container019"
          castShadow
          receiveShadow
          geometry={nodes.Container019.geometry}
          material={materials.ContainerBlanc}
          position={[-4.63, 3.42, 23.96]}
          rotation={[0, 0.08, 0]}
        />
        <mesh
          name="Container020"
          castShadow
          receiveShadow
          geometry={nodes.Container020.geometry}
          material={materials.ContainerOrange}
          position={[-8.2, 1.14, 24.24]}
        />
        <mesh
          name="Container021"
          castShadow
          receiveShadow
          geometry={nodes.Container021.geometry}
          material={materials.ContainerBleu}
          position={[-14.16, 1.14, 24.26]}
        />
        <mesh
          name="Container022"
          castShadow
          receiveShadow
          geometry={nodes.Container022.geometry}
          material={materials.ContainerBlanc}
          position={[-20.11, 1.14, 24.25]}
        />
        <mesh
          name="Container023"
          castShadow
          receiveShadow
          geometry={nodes.Container023.geometry}
          material={materials.ContainerOrange}
          position={[6.19, 1.14, 31.46]}
        />
        <mesh
          name="Container024"
          castShadow
          receiveShadow
          geometry={nodes.Container024.geometry}
          material={materials.ContainerBlanc}
          position={[12.18, 1.14, 31.49]}
        />
        <mesh
          name="Container025"
          castShadow
          receiveShadow
          geometry={nodes.Container025.geometry}
          material={materials.ContainerOrange}
          position={[4.5, 1.15, 36.02]}
          rotation={[0, -0.06, 0]}
        />
        <mesh
          name="Container026"
          castShadow
          receiveShadow
          geometry={nodes.Container026.geometry}
          material={materials.ContainerOrange}
          position={[-2.07, 1.14, -12.5]}
        />
        <mesh
          name="Container027"
          castShadow
          receiveShadow
          geometry={nodes.Container027.geometry}
          material={materials.ContainerBlanc}
          position={[-8.09, 1.14, -11.95]}
        />
        <mesh
          name="Container028"
          castShadow
          receiveShadow
          geometry={nodes.Container028.geometry}
          material={materials.ContainerOrange}
          position={[-19.43, 1.14, -12.89]}
          rotation={[0, 1.24, 0]}
        />
        <mesh
          name="Container029"
          castShadow
          receiveShadow
          geometry={nodes.Container029.geometry}
          material={materials.ContainerBlanc}
          position={[-12.62, 1.14, -13.47]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          name="Container030"
          castShadow
          receiveShadow
          geometry={nodes.Container030.geometry}
          material={materials.ContainerBleu}
          position={[-22.43, 1.14, -21.66]}
        />
        <mesh
          name="Container031"
          castShadow
          receiveShadow
          geometry={nodes.Container031.geometry}
          material={materials.ContainerOrange}
          position={[-21.07, 1.14, -24.66]}
        />
        <mesh
          name="Container033"
          castShadow
          receiveShadow
          geometry={nodes.Container033.geometry}
          material={materials.ContainerBlanc}
          position={[-21.91, 3.42, -23.52]}
          rotation={[0, 0.36, 0]}
        />
        <mesh
          name="Container032"
          castShadow
          receiveShadow
          geometry={nodes.Container032.geometry}
          material={materials.ContainerBleu}
          position={[-11.17, 1.14, -17.97]}
        />
        <mesh
          name="Container034"
          castShadow
          receiveShadow
          geometry={nodes.Container034.geometry}
          material={materials.ContainerOrange}
          position={[2.81, 0, -23.24]}
        />
        <mesh
          name="Container035"
          castShadow
          receiveShadow
          geometry={nodes.Container035.geometry}
          material={nodes.Container035.material}
          position={[-6.74, 3.42, -18.21]}
          rotation={[0, 0.1, 0]}
        />
        <mesh
          name="Container036"
          castShadow
          receiveShadow
          geometry={nodes.Container036.geometry}
          material={materials.ContainerBleu}
          position={[-11.17, 1.14, -24.61]}
        />
        <mesh
          name="Container037"
          castShadow
          receiveShadow
          geometry={nodes.Container037.geometry}
          material={materials.ContainerBleu}
          position={[4.67, 1.14, -18.4]}
        />
        <mesh
          name="Container038"
          castShadow
          receiveShadow
          geometry={nodes.Container038.geometry}
          material={nodes.Container038.material}
          position={[-0.29, 3.42, -18.21]}
          rotation={[0, 0.1, 0]}
        />
        <mesh
          name="Escalier_exterieur"
          castShadow
          receiveShadow
          geometry={nodes.Escalier_exterieur.geometry}
          material={materials.Escalier}
          position={[2.5, 0, 5.65]}
        />
        <mesh
          name="Escalier_exterieur001"
          castShadow
          receiveShadow
          geometry={nodes.Escalier_exterieur001.geometry}
          material={materials.Escalier}
          position={[-5.65, 0.38, -2.5]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          name="Escalier_exterieur002"
          castShadow
          receiveShadow
          geometry={nodes.Escalier_exterieur002.geometry}
          material={materials.Escalier}
          position={[2.5, 0.38, -5.65]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          name="Escalier_interieur"
          castShadow
          receiveShadow
          geometry={nodes.Escalier_interieur.geometry}
          material={nodes.Escalier_interieur.material}
          position={[4.12, 1.02, 2]}
        />
        <mesh
          name="MaisonEtage"
          castShadow
          receiveShadow
          geometry={nodes.MaisonEtage.geometry}
          material={materials.MaisonEtage}
          position={[0, 3.1, 0]}
          scale={[1.02, 1, 1.02]}
        />
        <mesh
          name="MaisonMur"
          castShadow
          receiveShadow
          geometry={nodes.MaisonMur.geometry}
          material={materials.MaisonMur}
        />
        <mesh
          name="MaisonPlancher"
          castShadow
          receiveShadow
          geometry={nodes.MaisonPlancher.geometry}
          material={materials.MaisonPlancher}
          position={[0, 0.04, 0]}
          scale={[1.02, 0.96, 1.02]}
        />
        <mesh
          name="MaisonToit"
          castShadow
          receiveShadow
          geometry={nodes.MaisonToit.geometry}
          material={materials.MaisonToit}
          position={[0, 6.31, 0]}
          scale={[1.02, 0.96, 1.02]}
        />
        <mesh
          name="Plane"
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={materials.Murs}
          position={[1.56, 1.15, 38.99]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          name="Plane001"
          castShadow
          receiveShadow
          geometry={nodes.Plane001.geometry}
          material={materials.Murs}
          position={[-1.44, 1.15, 38.99]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          name="Plane002"
          castShadow
          receiveShadow
          geometry={nodes.Plane002.geometry}
          material={materials.Murs}
          position={[-4.44, 1.15, 38.99]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          name="Plane003"
          castShadow
          receiveShadow
          geometry={nodes.Plane003.geometry}
          material={materials.Murs}
          position={[-7.45, 1.15, 38.99]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          name="Plane004"
          castShadow
          receiveShadow
          geometry={nodes.Plane004.geometry}
          material={materials.Murs}
          position={[-8.99, 1.15, 37.49]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        />
        <mesh
          name="Plane005"
          castShadow
          receiveShadow
          geometry={nodes.Plane005.geometry}
          material={materials.Murs}
          position={[-8.99, 1.15, 34.49]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        />
        <mesh
          name="Plane006"
          castShadow
          receiveShadow
          geometry={nodes.Plane006.geometry}
          material={materials.Murs}
          position={[-8.99, 1.15, 31.48]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        />
        <mesh
          name="Plane007"
          castShadow
          receiveShadow
          geometry={nodes.Plane007.geometry}
          material={materials.Murs}
          position={[-8.99, 1.15, 28]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[1.33, 1, 1]}
        />
        <mesh
          name="Plane008"
          castShadow
          receiveShadow
          geometry={nodes.Plane008.geometry}
          material={materials.Murs}
          position={[-16.25, 1.15, 26.01]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[4.87, 1, 1]}
        />
        <mesh
          name="Plane009"
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials.Murs}
          position={[-25.38, 1.15, 16.87]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[4.87, 1, 1]}
        />
        <mesh
          name="Plane010"
          castShadow
          receiveShadow
          geometry={nodes.Plane010.geometry}
          material={materials.Murs}
          position={[15.23, 1.15, 31.48]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        />
        <mesh
          name="Plane011"
          castShadow
          receiveShadow
          geometry={nodes.Plane011.geometry}
          material={materials.Murs}
          position={[22.19, 1.15, 9.32]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[4.87, 1, 1]}
        />
        <mesh
          name="Plane012"
          castShadow
          receiveShadow
          geometry={nodes.Plane012.geometry}
          material={materials.Murs}
          position={[16.73, 1.15, 18.46]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          name="Plane013"
          castShadow
          receiveShadow
          geometry={nodes.Plane013.geometry}
          material={materials.Murs}
          position={[16.73, 1.15, -11.44]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          name="Plane014"
          castShadow
          receiveShadow
          geometry={nodes.Plane014.geometry}
          material={materials.Murs}
          position={[9.01, 1.15, -16.85]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        />
        <mesh
          name="Plane015"
          castShadow
          receiveShadow
          geometry={nodes.Plane015.geometry}
          material={materials.Murs}
          position={[-16.25, 1.15, -26.11]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[4.87, 1, 1]}
        />
        <mesh
          name="Plane016"
          castShadow
          receiveShadow
          geometry={nodes.Plane016.geometry}
          material={materials.Murs}
          position={[3.7, 1.15, -25.56]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        />
        <mesh
          name="Plane017"
          castShadow
          receiveShadow
          geometry={nodes.Plane017.geometry}
          material={materials.Murs}
          position={[6.81, 1.15, -20.14]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          name="Cube"
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.Caisse}
          position={[-16.48, 0, 15.64]}
        />
        <mesh
          name="Cube001"
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.Caisse}
          position={[-16.48, 0, 14.85]}
        />
        <mesh
          name="Cube002"
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={materials.Caisse}
          position={[-16.48, 0, 13.99]}
        />
        <mesh
          name="Cube003"
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials.Caisse}
          position={[-16.48, 0, 13.2]}
        />
        <mesh
          name="Cube004"
          castShadow
          receiveShadow
          geometry={nodes.Cube004.geometry}
          material={materials.Caisse}
          position={[-16.48, 0, 12.39]}
        />
        <mesh
          name="Cube005"
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={materials.Caisse}
          position={[-16.48, 0, 11.7]}
        />
        <mesh
          name="Cube006"
          castShadow
          receiveShadow
          geometry={nodes.Cube006.geometry}
          material={materials.Caisse}
          position={[-17.25, 0, 14.85]}
        />
        <mesh
          name="Cube007"
          castShadow
          receiveShadow
          geometry={nodes.Cube007.geometry}
          material={materials.Caisse}
          position={[-17.25, 0, 14.08]}
        />
        <mesh
          name="Cube008"
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          material={materials.Caisse}
          position={[-17.25, 0, 13.29]}
        />
        <mesh
          name="Cube009"
          castShadow
          receiveShadow
          geometry={nodes.Cube009.geometry}
          material={materials.Caisse}
          position={[-17.25, 0, 12.49]}
        />
        <mesh
          name="Cube010"
          castShadow
          receiveShadow
          geometry={nodes.Cube010.geometry}
          material={materials.Caisse}
          position={[-16.48, 0.75, 14.32]}
        />
        <mesh
          name="Cube011"
          castShadow
          receiveShadow
          geometry={nodes.Cube011.geometry}
          material={materials.Caisse}
          position={[-16.54, 0.75, 13.56]}
        />
        <mesh
          name="Cube012"
          castShadow
          receiveShadow
          geometry={nodes.Cube012.geometry}
          material={materials.Caisse}
          position={[-16.76, 0.75, 12.77]}
        />
        <mesh
          name="Cube013"
          castShadow
          receiveShadow
          geometry={nodes.Cube013.geometry}
          material={materials.Caisse}
          position={[-24.93, 0, 13.82]}
        />
        <mesh
          name="Cube014"
          castShadow
          receiveShadow
          geometry={nodes.Cube014.geometry}
          material={materials.Caisse}
          position={[-24.71, 0.75, 13.73]}
          rotation={[Math.PI, -1.24, Math.PI]}
        />
        <mesh
          name="Cube015"
          castShadow
          receiveShadow
          geometry={nodes.Cube015.geometry}
          material={materials.Caisse}
          position={[-24.13, 0, 13.82]}
        />
        <mesh
          name="Cube016"
          castShadow
          receiveShadow
          geometry={nodes.Cube016.geometry}
          material={materials.Caisse}
          position={[16.37, 0, 18]}
        />
        <mesh
          name="Cube017"
          castShadow
          receiveShadow
          geometry={nodes.Cube017.geometry}
          material={materials.Caisse}
          position={[16.59, 0.75, 17.92]}
          rotation={[Math.PI, -1.24, Math.PI]}
        />
        <mesh
          name="Cube018"
          castShadow
          receiveShadow
          geometry={nodes.Cube018.geometry}
          material={materials.Caisse}
          position={[17.15, 0, 18]}
        />
        <mesh
          name="Cube019"
          castShadow
          receiveShadow
          geometry={nodes.Cube019.geometry}
          material={materials.Caisse}
          position={[17.4, 0, -0.09]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <mesh
          name="Cube020"
          castShadow
          receiveShadow
          geometry={nodes.Cube020.geometry}
          material={materials.Caisse}
          position={[17.36, 0.75, -0.6]}
          rotation={[0, 0.03, 0]}
        />
        <mesh
          name="Cube021"
          castShadow
          receiveShadow
          geometry={nodes.Cube021.geometry}
          material={materials.Caisse}
          position={[17.4, 0, -1.11]}
          rotation={[0, Math.PI / 2, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/gltf/scene01.gltf");
