import { Suspense, useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import violinGlb from '../../assets/models/models/Violin.glb?url';
import violinTexture from '../../assets/models/textures/TextureViolin.webp';

/* ------------------------------------------------------------------ *
 * THE SHADER
 *
 * Two programs that run on the GPU. The vertex shader runs once per
 * point in the violin mesh. The fragment shader runs once per pixel
 * the violin covers on screen. Both run in parallel, every frame.
 * ------------------------------------------------------------------ */

const vertexShader = /* glsl */ `
  // "varying" = computed per vertex, then smoothly interpolated
  // across the triangle and handed to the fragment shader.
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    // uv, normal, position, normalMatrix, modelViewMatrix and
    // projectionMatrix are all injected by three.js. We never declare them.
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    // The one job of a vertex shader: put this 3D point on the 2D screen.
    // Model space -> camera space -> clip space.
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  // "uniform" = a value passed in from JavaScript. Same for every pixel.
  uniform sampler2D uMap;
  uniform float     uTime;
  uniform vec3      uSweepColor;
  uniform float     uSweepWidth;
  uniform float     uSweepSpeed;

  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    // 1. Sample the violin's texture at this pixel's UV coordinate.
    //    Because the texture is tagged SRGBColorSpace, the GPU decodes it
    //    to linear for us on read, so the maths below is done in linear light.
    vec3 base = texture2D(uMap, vUv).rgb;

    // 2. Hand-written diffuse lighting. dot(normal, lightDir) is just
    //    "how much is this surface facing the light", clamped at 0.
    vec3  lightDir = normalize(vec3(0.4, 0.8, 0.6));
    float diffuse  = max(dot(vNormal, lightDir), 0.0);
    vec3  colour   = base * (0.35 + 0.75 * diffuse);

    // 3. The effect. fract() ramps 0->1 forever, giving a band that
    //    travels down the violin. smoothstep() softens its edges so it
    //    reads as light rather than a hard stripe.
    float head = fract(uTime * uSweepSpeed);
    float band = smoothstep(uSweepWidth, 0.0, abs(vUv.y - head));
    colour += uSweepColor * band;

    // 4. Encode linear -> sRGB for display. three does this automatically
    //    for its built-in materials, but a raw ShaderMaterial is on its own.
    //    Delete this line and everything looks washed out.
    colour = pow(colour, vec3(1.0 / 2.2));

    gl_FragColor = vec4(colour, 1.0);
  }
`;

/* ------------------------------------------------------------------ */

function ViolinMesh({ targetY }: { targetY: React.MutableRefObject<number> }) {
  const dragRef = useRef<THREE.Group>(null);
  const { scene: rawScene } = useGLTF(violinGlb);
  const texture = useTexture(violinTexture);
  const { camera } = useThree();

  // GLTF packs UVs with the origin at the top left, so the texture has to
  // be told not to flip. Tagging it sRGB lets the GPU decode it on sample.
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uMap:        { value: texture },
          uTime:       { value: 0 },
          uSweepColor: { value: new THREE.Color('#4aaf81') }, // Eden green
          uSweepWidth: { value: 0.06 },
          uSweepSpeed: { value: 0.22 },
        },
      }),
    [texture]
  );

  // Cloned once, not on every render. The original ViolinModel calls
  // clone(true) in the render body, which deep-copies the whole scene
  // graph 60 times a second.
  const scene = useMemo(() => {
    const copy = rawScene.clone(true);
    copy.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) mesh.material = material;
    });
    return copy;
  }, [rawScene, material]);

  // Frame the model from its own bounding box rather than guessing.
  useEffect(() => {
    const size = new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    const distance = (maxDim / 2 / Math.tan(fov / 2)) * 1.17;
    camera.position.set(0, distance * 0.25, distance);
    camera.near = distance / 100;
    camera.far = distance * 10;
    camera.updateProjectionMatrix();
  }, [scene, camera]);

  // Drive the uniform. This is the bridge from React to the GPU:
  // JS writes uTime, and 2 million pixels read it next frame.
  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    if (dragRef.current) {
      dragRef.current.rotation.y += (targetY.current - dragRef.current.rotation.y) * 0.04;
    }
  });

  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      <group ref={dragRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

export function ShaderViolin({ maxRot = Math.PI / 4 }: { maxRot?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetY = useRef(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(rect.left, Math.min(rect.right, e.clientX));
      targetY.current = (((x - rect.left) / rect.width) * 2 - 1) * maxRot;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [maxRot]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ position: 'absolute', inset: 0 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ViolinMesh targetY={targetY} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(violinGlb);
