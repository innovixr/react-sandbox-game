export const Crosshair = ({position}) => {

  // adapted from https://codepen.io/driezis/pen/jOPzjLG

  const vertexShader = `
  uniform float rotation;
  uniform vec2 center;
  #include <common>
  varying vec2 vUv;
  void main() {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
      vec2 scale;
      scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
      scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
      #ifndef USE_SIZEATTENUATION
          bool isPerspective = isPerspectiveMatrix( projectionMatrix );
          if ( isPerspective ) scale *= - mvPosition.z;
      #endif
      vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
      vec2 rotatedPosition;
      rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
      rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
      mvPosition.xy += rotatedPosition;
      gl_Position = projectionMatrix * mvPosition;
  }
  `;

  const fragmentShader = `
  uniform vec3 main_color;
  uniform vec3 border_color;
  uniform float opacity;

  uniform float thickness;
  uniform float height;
  uniform float offset;
  uniform float border;

  varying vec2 vUv;
  void main() {

      float a = (step(abs(vUv.x - 0.5), thickness)) * step(abs(vUv.y - 0.5), height + offset) * step(offset, abs(vUv.y - 0.5)) + (step(abs(vUv.y - 0.5), thickness)) * step(abs(vUv.x - 0.5), height + offset) * step(offset, abs(vUv.x - 0.5));
      float b = (step(abs(vUv.x - 0.5), thickness - border)) * step(abs(vUv.y - 0.5), height + offset - border) * step(offset + border, abs(vUv.y - 0.5)) + (step(abs(vUv.y - 0.5), thickness - border)) * step(abs(vUv.x - 0.5), height + offset - border) * step(offset + border, abs(vUv.x - 0.5));
      gl_FragColor = vec4( mix(border_color, main_color, b), a * opacity);
  }
  `;

  const uniforms = {
    main_color: {value: {r: 1, g: 1, b: 1}},
    border_color: {value: {r: 0, g: 0, b: 0.1}},
    thickness: {value:0.006},
    height: {value:0.13},
    offset: {value:0.05},
    border: {value:0.003},
    opacity: {value: 1},
    center: {value: {x: 0.5, y: 0.5}},
    rotation: {value: 0},
  }

  return (
    <mesh position={position} scale={0.5}>
      <sprite/>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent="true"
        />
    </mesh>
  );
};
