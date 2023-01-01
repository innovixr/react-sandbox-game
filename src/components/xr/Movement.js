import { useFrame } from "@react-three/fiber";
import { useXR, useController } from "@react-three/xr";

export const Movement = ({}) => {

  const leftController = useController('left');
  const rightController = useController('right');
  const gazeController = useController('none');
  const { player } = useXR();

  //const forward = useRef(new Vector3());
  //const horizontal = useRef(new Vector3());

  useFrame((state, delta) => {
    if (!rightController) return;
    //console.log(leftController.grip);
    //console.log(rightController.inputSource.gamepad.axes);
    const [unused1, unused2, frontStick, sideStick ] = rightController.inputSource.gamepad.axes;
    console.log(frontStick, sideStick);

  })

}