import { useMemo } from 'react';
import { Perf } from 'r3f-perf';
import { folder, useControls } from 'leva';
import { Canvas } from "@react-three/fiber";
import { KeyboardControls, Environment, PerformanceMonitor } from '@react-three/drei';
import { VRButton } from "@react-three/xr";

import Scene from "./components/Scene";
import "./styles.css";

export default function App() {

  const lc = useControls({
    'Debug':folder({
      perfMonitor:true
    }),
    'Environment':folder({
      'Background':folder({
        preset:{
          value:'city',
          options:[
            'sunset',
            'dawn',
            'night',
            'warehouse',
            'forest',
            'apartment',
            'studio',
            'city',
            'lobby'
          ]
        }
      }),
    }),
    'Lights':folder({
      'Directional':folder({
        dirEnable:true,
        dirIntensity:{ value: 0.1, min: 0, max: 30, step: 0.1 },
      }),
      'Point':folder({
        ptEnable:false,
        ptIntensity:{ value: 4.5, min: 0, max: 30, step: 0.1 },
      }),
      'Ambiant':folder({
        ambEnable:false,
        ambIntensity:{ value: 3, min: 0, max: 30, step: 0.1 },
      })
    })
  });

  const keyboardMap = useMemo(() => [
    { name:'forward', keys:['KeyW'] },
    { name:'backward', keys:['KeyS'] },
    { name:'leftward', keys:['KeyA'] },
    { name:'rightward', keys:['KeyD'] },
    { name:'jump', keys:['Space'] },
    { name:'addABallon', keys:['KeyB'] },
  ], []);

  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45, position: [0, 10, 40] }}>
        {
          lc.perfMonitor && 
            <Perf position="top-left" />
        }
        {
          lc.dirEnable && 
            <directionalLight
              intensity={lc.dirIntensity}
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
        }
        {
          lc.ptEnable && 
            <pointLight
              intensity={lc.ptIntensity}
              castShadow={true}
              shadow-bias={-0.001}
              shadow-mapSize={[4096, 4096]}
              position={[45.0, 40.0, 35.0]}
              distance={150}
            />
        }
        {
          lc.ambEnable &&
            <ambientLight color={ 0x909090 } intensity={lc.ambIntensity} />
        }
        <Scene />
        <Environment
          preset={lc.preset}
          background
          blur={0}
          intensity={0.1}
          ground={{
            height: 10,
            radius: 115,
            scale: 100
          }}
        />
        { /* <ContactShadows scale={20} position={[1, 1, 1]} opacity={2} /> */ }
      </Canvas>
      <VRButton />
    </KeyboardControls>
  );
}
