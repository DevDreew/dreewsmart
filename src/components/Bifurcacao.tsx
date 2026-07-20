"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ============================================================
// SEÇÃO 02 — BIFURCAÇÃO (100vh, split 50/50)
// A metade não-hovered cai para 35% de opacidade.
// Sem borda entre elas — só o corte.
// A home NÃO vende os dois ao mesmo tempo. Força a escolha.
//
// ASSET PENDENTE (metade esquerda): vídeo 6s loop, sem áudio,
// granulado, plano fechado de barra —
//   <video autoPlay muted loop playsInline poster="...">
//     <source src="/video/academia-barra.mp4" type="video/mp4" />
//   </video>
// Até lá: gradiente escuro + tipografia.
// ============================================================

export default function Bifurcacao() {
  const [hover, setHover] = useState<"a" | "b" | null>(null);

  const lado = (qual: "a" | "b") =>
    `relative flex min-h-[50vh] flex-1 items-end overflow-hidden p-8 transition-opacity duration-500 md:min-h-screen md:p-14 ${
      hover && hover !== qual ? "opacity-35" : "opacity-100"
    }`;

  return (
    <section className="flex flex-col md:flex-row" aria-label="Escolha: academia ou loja">
      {/* ESQUERDA — ACADEMIA */}
      <Link
        href="/academia"
        className={lado("a")}
        onMouseEnter={() => setHover("a")}
        onMouseLeave={() => setHover(null)}
        onFocus={() => setHover("a")}
        onBlur={() => setHover(null)}
      >
        <Image
          src="/img/academia.webp"
          alt="Área de treino da DREEWSMART em Barueri"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* véu para o texto respirar sobre a foto */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent"
        />
        <div className="relative">
          <h2 className="display text-4xl font-extrabold md:text-6xl">TREINE AQUI</h2>
          <p className="num mt-4 text-[12px] tracking-[0.14em] text-ash">
            BARUERI · 1.400M² · 24H
          </p>
        </div>
      </Link>

      {/* DIREITA — LOJA */}
      <Link
        href="/loja"
        className={lado("b")}
        onMouseEnter={() => setHover("b")}
        onMouseLeave={() => setHover(null)}
        onFocus={() => setHover("b")}
        onBlur={() => setHover(null)}
      >
        {/* fundo escuro fixo — a luz do glow precisa de algo pra acender contra */}
        <div aria-hidden className="absolute inset-0 bg-void" />

        {/* GLOW — luz vermelha ao redor do produto, só acende no hover.
            Não é 3D nem segue o mouse: um halo que aparece atrás do produto. */}
        <div
          aria-hidden
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
            hover === "b" ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-[70%] w-[70%] rounded-full bg-blood/35 blur-[100px]" />
        </div>

        <div className={`absolute inset-0 ${hover === "b" ? "" : ""}`}>
          <div className="drift absolute inset-0">
            <Image
              src="/img/suplemente.webp"
              alt="MONO — creatina DREEWSMART"
              fill
              quality={90}
              className={`object-cover transition-transform duration-700 ${
                hover === "b" ? "scale-105" : "scale-100"
              }`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
        <div className="relative">
          <h2 className="display text-4xl font-extrabold md:text-6xl">SUPLEMENTE</h2>
          <p className="num mt-4 text-[12px] tracking-[0.14em] text-ash">
            5 PRODUTOS. DOSE ABERTA.
          </p>
        </div>
      </Link>
    </section>
  );
}
