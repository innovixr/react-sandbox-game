import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import "./styles.css";

export default function App() {
  return (
    <>
      {/* <VRButton /> */}
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
      </Canvas>
    </>
  );
}
