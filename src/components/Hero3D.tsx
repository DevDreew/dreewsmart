"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

// ============================================================
// SEÇÃO 01 — HERO (100vh) — INTERATIVO
// Render real da HELIX em queda livre.
//
// 3 camadas de movimento:
//  1. DRIFT  — flutuação contínua lenta (as garrafas "caem" sempre)
//  2. MOUSE  — parallax que segue o cursor (desktop, pointer fino)
//  3. SCROLL — desloca/escala ao rolar
//
// Mobile/touch: só drift (leve). reduced-motion: estático.
// A tag "HELIX™ · SHAKER 700ML" deixa claro que é a garrafa,
// não um suplemento — o produto certo com o nome certo.
// ============================================================

export default function Hero3D() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // respeita quem realmente pediu menos movimento no mouse-parallax,
    // mas o drift (CSS) continua — é sutil.
    const wantsLess = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (wantsLess || !fine) return;

    let raf = 0;
    let mx = 0, my = 0;       // alvo do mouse (-1..1)
    let cx = 0, cy = 0;       // posição suavizada
    let scrollP = 0;

    const paint = () => {
      // easing — o parallax "flutua" atrás do cursor
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;
      el.style.transform =
        `translate3d(${cx * 26}px, ${scrollP * 90 + cy * 18}px, 0) scale(${1.04 + scrollP * 0.06})`;
      raf = requestAnimationFrame(paint);
    };

    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const y = window.scrollY;
      scrollP = Math.min(y / window.innerHeight, 1.2);
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    raf = requestAnimationFrame(paint);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Render real — 3 camadas de movimento. scale base 1.04 evita borda no parallax */}
      <div ref={wrapRef} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.04)" }}>
        <div className="drift-slow absolute inset-0">
          <Image
            src="/posters/hero.webp"
            alt="Garrafas HELIX em queda livre, uma em foco"
            fill
            priority
            quality={92}
            className="object-cover object-right"
            sizes="100vw"
          />
        </div>
      </div>

      {/* véu de leitura à esquerda */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-void via-void/85 to-transparent md:w-3/4"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 md:px-10">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6">BARUERI/SP · 24H</p>
          <h1 className="display text-6xl md:text-8xl lg:text-9xl">
            BARRA NÃO
            <br />
            NEGOCIA<span className="text-blood">.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ash md:text-xl">
            Academia e linha de suplemento sob o mesmo padrão.
            <br />
            Rótulo aberto. Equipamento que aguenta.
          </p>
          <div className="mt-12 flex flex-wrap gap-5">
            <Link href="/academia/planos" className="btn btn-blood">
              VER PLANOS
            </Link>
            <Link href="/loja" className="btn btn-ghost">
              VER CATÁLOGO
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
