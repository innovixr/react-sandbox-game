import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
/*
import { Controllers, Hands, VRButton, XR } from "@react-three/xr";
import { KeyboardControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
*/

import Scene from "./components/Scene";
import "./styles.css";

/*
const keyMap = [
  { name: "forward", keys: ["KeyW"] },
  { name: "backward", keys: ["KeyS"] },
  { name: "left", keys: ["KeyA"] },
  { name: "right", keys: ["KeyD"] },
  { name: "running", keys: ["ShiftLeft"] },
  { name: "crouch", keys: ["ControlLeft"] },
  { name: "jump", keys: ["Space"] },
];
*/

export default function App() {
  return (
    <>
      {/* <VRButton /> */}
      {/* <KeyboardControls map={keyMap}> */}
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45, position: [0, 10, 40] }}>
        {/*
        <Perf position="top-left" />
        <XR>
          <Controllers />
          <Hands />
          <Scene />
        </XR>
        */}
        <Scene />
        <OrbitControls target={[0, 2, 0]} />
      </Canvas>
      {/* </KeyboardControls> */}
    </>
  );
}
