import Hero3D from "@/components/Hero3D";
import Bifurcacao from "@/components/Bifurcacao";
import Cinematica from "@/components/Cinematica";
import Vitrine from "@/components/Vitrine";
import PromoBanner from "@/components/PromoBanner";
import PlanosHome from "@/components/PlanosHome";
import Reveal from "@/components/Reveal";

// ============================================================
// HOMEPAGE — reestruturada (prompt de produção, etapas 3 e 6)
// 01 HERO · 02 BIFURCAÇÃO · 03 CINEMÁTICA (sequência PULSE)
// 04 VITRINE (novos / mais vendidos + feedback) · 05 PLANOS
// 06 FOOTER (global no layout)
//
// FORA da home: catálogo completo (só na Loja), protocolo e
// rótulo aberto (viraram páginas próprias, acessíveis pelo menu).
// ============================================================

export default function Home() {
  return (
    <>
      <Hero3D />
      <Bifurcacao />
      <Reveal><Cinematica /></Reveal>
      <PromoBanner />
      <Reveal><Vitrine /></Reveal>
      <Reveal><PlanosHome /></Reveal>
    </>
  );
}
