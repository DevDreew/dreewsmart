import { UNIDADE } from "@/lib/academia";

// ============================================================
// WHATSAPP FLUTUANTE — padrão Gaviões: atendimento sempre à mão,
// canto inferior direito, em todas as páginas. Sem lib, só CSS.
// ============================================================

export default function WhatsFlutuante() {
  return (
    <a
      href={`https://wa.me/${UNIDADE.whatsapp}?text=${encodeURIComponent("Olá! Vim pelo site da DreewSmart.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Atendimento pelo WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3"
    >
      {/* rótulo que aparece no hover (desktop) */}
      <span className="num pointer-events-none hidden translate-x-2 border border-steel bg-void/95 px-3 py-2 text-[11px] tracking-[0.14em] text-bone opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        ATENDIMENTO
      </span>
      {/* botão */}
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blood shadow-[0_8px_24px_rgba(255,15,0,0.35)] transition-transform duration-200 group-hover:scale-110">
        {/* ícone WhatsApp (SVG inline, sem dependência) */}
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-bone" aria-hidden>
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5v-.5c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.5 1.1 2.7c.1.2 1.9 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3Z" />
        </svg>
      </span>
    </a>
  );
}
