"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Model } from "@/components/Model";
import { Scene } from "@/components/Scene"; // Importa el componente del escenario
import { useState, useEffect } from "react";

const presets = [
  "sunset",
  "dawn",
  "night",
  "warehouse",
  "apartment",
  "city",
  "lobby",
] as const;

export function EnvironmentCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % presets.length);
    }, 5000); // cambia cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return <Environment preset={presets[index]} />;
}

export default function Page() {
  return (
    <div className="w-screen h-screen">
      <Canvas shadows camera={{ position: [0, 1, 18], fov: 10 }}>
        {/* Escenario */}
        <Scene />

        {/* Cargar el modelo */}
        <Suspense fallback={null}>
          <Model />
        </Suspense>

        {/* Controles de órbita */}
        <OrbitControls />

        {/* Entorno */}
        {/* <Suspense fallback={<Environment preset={"night"} />}>
          <EnvironmentCycler />
        </Suspense> */}
        {/* <Environment preset={"night"} /> */}
      </Canvas>
    </div>
  );
}
