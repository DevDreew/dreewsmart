"use client";

import { useEffect, useRef, useState } from "react";

// ============================================================
// GATE DE WEBGL — Regras de performance não negociáveis:
//   · Mobile < 768px: ZERO WebGL
//   · prefers-reduced-motion: nenhuma animação automática
//   · IntersectionObserver corta o render loop fora da viewport
//   · Aba oculta também pausa
// O poster é sempre o primeiro pixel; o canvas entra por cima.
// ============================================================

export function useWebGLGate<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [pode3D, setPode3D] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState(true);

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 768px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const suportaWebGL = (() => {
      try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl2") || c.getContext("webgl"));
      } catch {
        return false;
      }
    })();

    const avaliar = () =>
      setPode3D(mqDesktop.matches && !mqMotion.matches && suportaWebGL);

    avaliar();
    mqDesktop.addEventListener("change", avaliar);
    mqMotion.addEventListener("change", avaliar);
    return () => {
      mqDesktop.removeEventListener("change", avaliar);
      mqMotion.removeEventListener("change", avaliar);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setVisivel(e.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onVis = () => setAbaAtiva(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return { ref, pode3D, ativo: visivel && abaAtiva };
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const f = () => setReduced(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return reduced;
}

export function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const f = () => setMobile(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return mobile;
}
