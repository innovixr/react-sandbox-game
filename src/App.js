import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import "./styles.css";
import { Perf } from 'r3f-perf';
import { folder, useControls } from 'leva';
import { XR, Controllers, Hands, VRButton } from "@react-three/xr";
import { useMemo } from 'react';
import { KeyboardControls } from '@react-three/drei';

export default function App() {

  const lc = useControls({
    'Debug':folder({
      perfMonitor:false
    }),
    'Lights':folder({
      'Directional':folder({
        dirEnable:true,
        dirIntensity:{ value: 0.5, min: 0, max: 30, step: 0.1 },
        dirRadius:{ value: 4, min: 0, max:100, step:0.01}
      }),
      'Ambiant':folder({
        ambEnable:true,
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
          /*
          <XR>
            <Controllers />
            <Hands />
            <Scene />
          </XR>
          */
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
          lc.ambEnable &&
            <ambientLight color={ 0x909090 } intensity={lc.ambIntensity} />
        }
        <XR>
          <Controllers />
          <Hands />
          <Scene />
        </XR>
      </Canvas>
      <VRButton />
    </KeyboardControls>
  );
}
