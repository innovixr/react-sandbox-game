import { Vector3, MathUtils } from "three";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useXR, useController } from "@react-three/xr";
import { SPEED, PLAYER_HEIGHT } from '../Constant';

export const Movement = ({rigidBodyRef, playerMeshRef}) => {

  const leftController = useController('left');
  const rightController = useController('right');
  const gazeController = useController('none');

  //const forward = useRef(new Vector3());
  //const horizontal = useRef(new Vector3());
  let velocity;
  const frontVector = useMemo(() => new Vector3(), []);
  const sideVector = useMemo(() => new Vector3(), []);
  const direction = useMemo(() => new Vector3(), []);

  const { player } = useXR()

  let lateral, horizontal, rotate;
  let rotateCounter = 0;

  useFrame((state, delta) => {
    
    if (!leftController) return;

    lateral = leftController.inputSource.gamepad.axes[2];
    horizontal = leftController.inputSource.gamepad.axes[3];
    rotate = rightController.inputSource.gamepad.axes[2];

    // move player

    velocity = rigidBodyRef.current.linvel();

    frontVector.set(0, 0, 0);
    sideVector.set(0, 0, 0);

    frontVector.z+=horizontal;
    sideVector.x-=lateral;
   
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(player.rotation)

    rigidBodyRef.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });

    // rotate player
    if (rotate!==0) {
      rotateCounter+=1;
      if (rotateCounter === 1) {
        if (rotate>0) {
          player.rotateY(-MathUtils.degToRad(20));
        } else {
          player.rotateY(-MathUtils.degToRad(-20));
        }
      }
      if (rotateCounter === 15) {
        rotateCounter = 0;
      }
    } else {
      rotateCounter = 0;
    }
    
    // rotate player mesh, but NO, if you rotate the head, you don't rotate your body
    //playerMeshRef.current.rotation.y=player.children[0].rotation.y;

    // ensure Y
    player.position.y=-(PLAYER_HEIGHT/2);

    // not sure
    player.rotation.order="YXZ";

  })

}