"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/store";

const NAV: {
  href: string;
  label: string;
  sub?: { href: string; label: string }[];
}[] = [
  { href: "/", label: "INÍCIO" },
  {
    href: "/academia",
    label: "ACADEMIA",
    sub: [
      { href: "/academia/estrutura", label: "Estrutura" },
      { href: "/academia/planos", label: "Planos" },
      { href: "/academia/modalidades", label: "Modalidades" },
      { href: "/academia/treinadores", label: "Treinadores" },
      { href: "/academia/matricula", label: "Matrícula" },
    ],
  },
  {
    href: "/loja",
    label: "LOJA",
    sub: [
      { href: "/loja/pre-treino", label: "Pré-treino" },
      { href: "/loja/proteina", label: "Proteína" },
      { href: "/loja/creatina", label: "Creatina" },
      { href: "/loja/acessorios", label: "Acessórios" },
      { href: "/loja/vestuario", label: "Vestuário" },
    ],
  },
  { href: "/rotulo-aberto", label: "RÓTULO ABERTO" },
  { href: "/ajuda", label: "AJUDA" },
  { href: "/contato", label: "CONTATO" },
];

export default function Header() {
  const pathname = usePathname();
  const openDrawer = useCart((s) => s.openDrawer);
  const items = useCart((s) => s.items);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // count só depois do mount — evita mismatch de hidratação com o persist
  useEffect(() => setMounted(true), []);
  const count = mounted ? items.reduce((t, i) => t + i.qtd, 0) : 0;

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "border-blood/30 bg-void/95 shadow-[0_1px_24px_rgba(0,0,0,0.5)]"
          : "border-steel bg-void/80"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link href="/" className="display text-lg font-extrabold tracking-tight">
          DREEW<span className="text-blood">SMART</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <div key={item.href} className="group/nav relative">
                <Link
                  href={item.href}
                  className={`num relative flex items-center gap-1.5 py-5 text-[11px] tracking-[0.14em] transition-colors ${
                    active ? "text-bone" : "text-ash hover:text-bone"
                  }`}
                  aria-current={active ? "page" : undefined}
                  aria-haspopup={item.sub ? "menu" : undefined}
                >
                  {item.label}
                  {item.sub && (
                    <span
                      aria-hidden
                      className="text-[8px] text-steel transition-transform duration-200 group-hover/nav:rotate-180 group-hover/nav:text-blood"
                    >
                      ▼
                    </span>
                  )}
                  <span
                    aria-hidden
                    className={`absolute bottom-3 left-0 h-px bg-blood transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover/nav:w-full"
                    }`}
                  />
                </Link>

                {/* dropdown estilo Gaviões — hover, CSS puro */}
                {item.sub && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100">
                    <div className="border border-steel bg-void/98 shadow-[0_16px_48px_rgba(0,0,0,0.6)] backdrop-blur-md">
                      <span aria-hidden className="block h-0.5 w-full bg-blood" />
                      {item.sub.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="num block border-b border-steel/40 px-5 py-3.5 text-[11px] tracking-[0.12em] text-ash transition-colors last:border-b-0 hover:bg-carbon hover:pl-6 hover:text-bone"
                        >
                          {s.label.toUpperCase()}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/conta"
            className="num hidden border border-steel px-4 py-2 text-[11px] tracking-[0.14em] text-bone transition-colors hover:border-blood sm:inline-block"
            aria-label="Minha conta"
          >
            CONTA
          </Link>
          <button
            type="button"
            onClick={openDrawer}
            className="num relative border border-steel px-4 py-2 text-[11px] tracking-[0.14em] text-bone transition-colors hover:border-blood"
            aria-label={`Abrir carrinho, ${count} itens`}
          >
            CARRINHO
            {count > 0 && (
              <span className="num absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center bg-blood px-1 text-[10px] text-bone">
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Abrir menu"
          >
            <span
              className={`h-px w-6 bg-bone transition-transform ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-bone transition-transform ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label="Menu móvel"
          className="border-t border-steel bg-void lg:hidden"
        >
          {NAV.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="num block border-b border-steel/50 px-5 py-4 text-[12px] tracking-[0.14em] text-bone"
              >
                {item.label}
              </Link>
              {item.sub?.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="num block border-b border-steel/30 py-3 pl-10 pr-5 text-[11px] tracking-[0.12em] text-ash"
                >
                  {s.label.toUpperCase()}
                </Link>
              ))}
            </div>
          ))}
          <Link
            href="/conta"
            className="num block px-5 py-4 text-[12px] tracking-[0.14em] text-blood"
          >
            MINHA CONTA
          </Link>
        </nav>
      )}
    </header>
  );
}
