import { Physics } from "@react-three/rapier";
import { MyMap } from './MyMap.js';

export default function Scene() {
  
  const usePhysic = false;

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
          <MyMap position={[0, -3, 0]}/>
        </Physics> : 
        
        <MyMap position={[0, -3, 0]}/>
      }
    </>
  )
}