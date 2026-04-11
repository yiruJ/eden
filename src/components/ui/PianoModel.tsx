import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';
import pianoGlb from '../../assets/models/models/Piano.glb?url';
import pianoTexture from '../../assets/models/textures/TexturePiano.webp';

const MAX_ROT = Math.PI / 4;
const EASE = 0.04;

function PianoMesh({ targetY }: { targetY: React.MutableRefObject<number> }) {
  const baseRef = useRef<THREE.Group>(null);
  const dragRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(pianoGlb);
  const texture = useTexture(pianoTexture);
  const { camera } = useThree();

  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      const applyTexture = (mat: THREE.Material) => {
        const m = mat as THREE.MeshStandardMaterial;
        m.map = texture;
        m.needsUpdate = true;
      };
      if (Array.isArray(mesh.material)) mesh.material.forEach(applyTexture);
      else applyTexture(mesh.material);
    }
  });

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    const distance = (maxDim / 2) / Math.tan(fov / 2) * 0.95;
    camera.position.set(0, -distance * 0.05, distance);
    camera.near = distance / 100;
    camera.far = distance * 10;
    camera.updateProjectionMatrix();
  }, [scene, camera]);

  useFrame(() => {
    if (!dragRef.current) return;
    dragRef.current.rotation.y += (targetY.current - dragRef.current.rotation.y) * EASE;
  });

  return (
    <group ref={baseRef} rotation={[0, Math.PI / 3, 0]}>
      <group ref={dragRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

export function PianoModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetY = useRef(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(rect.left, Math.min(rect.right, e.clientX));
      const nx = ((x - rect.left) / rect.width) * 2 - 1;
      targetY.current = nx * MAX_ROT;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 3]} intensity={1.2} />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} />
        <Suspense fallback={null}>
          <PianoMesh targetY={targetY} />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(pianoGlb);
