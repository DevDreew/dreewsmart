"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshReflectorMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

// ============================================================
// CENA 3D COMPARTILHADA — hero e PDP usam esta base.
//
// Placeholders: primitivas Three.js com os materiais corretos —
//   · soft-touch fosco (roughness alta, metalness baixa)
//   · UM highlight especular vindo de cima-esquerda
//   · rim light vermelho traseiro
//   · piso com reflexo
//   · ZERO glow em volta do objeto
//
// SWAP PARA GLB REAL (Draco ≤800KB, KTX2 1024²):
//   import { useGLTF } from "@react-three/drei";
//   useGLTF.preload("/models/helix.glb");
//   const { scene } = useGLTF("/models/helix.glb");
//   return <primitive object={scene} />;
//   (Draco: <Canvas> já resolve com useGLTF + draco decoder via CDN
//    ou copie os decoders para /public/draco e configure o loader.)
// ============================================================

const BLOOD = "#e10600";
const BONE = "#f5f3f0";

export type Primitiva = "cilindro" | "capsula" | "caixa";

function corpoMaterial(cor: string) {
  return (
    <meshStandardMaterial
      color={cor}
      roughness={0.88}
      metalness={0.08}
    />
  );
}

export function ProductMesh({
  primitiva,
  cor,
  corAlvoRef,
  girar = true,
}: {
  primitiva: Primitiva;
  cor: string;
  /** ref mutável com a cor alvo — cross-fade 300ms sem mover a câmera */
  corAlvoRef?: React.MutableRefObject<string>;
  girar?: boolean;
}) {
  const grupo = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const alvo = useRef(new THREE.Color(cor));

  useFrame((_, delta) => {
    if (girar && grupo.current) {
      grupo.current.rotation.y += delta * 0.25; // girando devagar
    }
    // Troca de sabor: cross-fade de cor ~300ms. Sem movimento de câmera.
    if (matRef.current && corAlvoRef) {
      alvo.current.set(corAlvoRef.current);
      matRef.current.color.lerp(alvo.current, Math.min(1, delta * 10));
    }
  });

  return (
    <group ref={grupo}>
      {primitiva === "capsula" && (
        <>
          {/* garrafa HELIX — cápsula + tampa */}
          <mesh position={[0, 0, 0]} castShadow>
            <capsuleGeometry args={[0.55, 1.3, 12, 28]} />
            <meshStandardMaterial
              ref={matRef}
              color={cor}
              roughness={0.85}
              metalness={0.1}
            />
          </mesh>
          <mesh position={[0, 1.18, 0]} castShadow>
            <cylinderGeometry args={[0.34, 0.4, 0.34, 28]} />
            {corpoMaterial("#8b0400")}
          </mesh>
        </>
      )}

      {primitiva === "cilindro" && (
        <>
          {/* pote — cilindro + tampa vermelha escura */}
          <mesh position={[0, -0.1, 0]} castShadow>
            <cylinderGeometry args={[0.75, 0.75, 1.5, 36]} />
            <meshStandardMaterial
              ref={matRef}
              color={cor}
              roughness={0.9}
              metalness={0.06}
            />
          </mesh>
          <mesh position={[0, 0.78, 0]} castShadow>
            <cylinderGeometry args={[0.8, 0.8, 0.26, 36]} />
            {corpoMaterial("#8b0400")}
          </mesh>
        </>
      )}

      {primitiva === "caixa" && (
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.9, 0.9]} />
          <meshStandardMaterial
            ref={matRef}
            color={cor}
            roughness={0.92}
            metalness={0.05}
          />
        </mesh>
      )}
    </group>
  );
}

export default function SceneShell({
  ativo,
  primitiva,
  cor,
  corAlvoRef,
  cameraZ = 4.2,
}: {
  ativo: boolean;
  primitiva: Primitiva;
  cor: string;
  corAlvoRef?: React.MutableRefObject<string>;
  cameraZ?: number;
}) {
  return (
    <Canvas
      // IntersectionObserver + visibilidade da aba cortam o loop AQUI.
      frameloop={ativo ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, cameraZ], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      shadows
      style={{ background: "transparent" }}
    >
      {/* base baixa — o preto faz o trabalho pesado */}
      <ambientLight intensity={0.25} />
      {/* UM highlight especular: cima-esquerda */}
      <spotLight
        position={[-4.5, 6, 4]}
        intensity={40}
        angle={0.5}
        penumbra={0.6}
        color={BONE}
        castShadow
      />
      {/* rim light vermelho traseiro */}
      <spotLight
        position={[0.5, 1.6, -5]}
        intensity={30}
        angle={0.7}
        penumbra={1}
        color={BLOOD}
      />

      <ProductMesh primitiva={primitiva} cor={cor} corAlvoRef={corAlvoRef} />

      {/* piso com reflexo */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]}>
        <planeGeometry args={[24, 24]} />
        <MeshReflectorMaterial
          blur={[280, 90]}
          resolution={512}
          mixBlur={1}
          mixStrength={9}
          roughness={1}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.3}
          color="#0a0a0b"
          metalness={0.4}
        />
      </mesh>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.9}
      />
    </Canvas>
  );
}
