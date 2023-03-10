//import { useSphere } from "@react-three/cannon";
import { useRef } from 'react';

export const Bullet = (props) => {
  /** Bullet collider */
  /*
  const [sphereRef] = useSphere(() => ({
    mass: 5,
    args: 0.1,
    ...props
  }));
  */

  const sphereRef = useRef();

  return (
    <mesh ref={sphereRef} castShadow>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshLambertMaterial color="hotpink" />
    </mesh>
  );
};
