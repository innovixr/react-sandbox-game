import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { Center } from '@react-three/drei';
import * as THREE from 'three';

export const Crosshair = ({position}) => {

  const { paths } = useLoader(SVGLoader, '/svg/crosshair2.svg');

  const shapes = useMemo(
    () => paths.flatMap(
      p => p.toShapes(true).map(
        shape => {
          return ({
            shape,
            color: p.color,
            stroke: p.stroke,
            fillOpacity: p.userData.style.fillOpacity
          })
        }
      )
    ),
    [paths]
  )

  return (
    <Center position={position}>
      {
        shapes.map(
          ({color, shape, fillOpacity}, index) => {
            const uuid=THREE.MathUtils.generateUUID()
            return (
              <mesh key={uuid} scale={0.0003}>
                <meshBasicMaterial
                  color="white"
                  side={THREE.FrontSide}
                />
                <shapeGeometry args={[shape]} />
              </mesh>
            )
          }
        )
      }
    </Center>
  )
};
