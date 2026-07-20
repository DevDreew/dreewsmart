"use client";

import { useState } from "react";
import { FAQ as ITENS } from "@/lib/academia";

// Acordeão de dúvidas — um aberto por vez. Acessível (aria-expanded,
// controlado por teclado nativo via <button>). Sem lib.
export default function FAQ() {
  const [aberto, setAberto] = useState<number | null>(0);

  return (
    <div className="border-t border-steel">
      {ITENS.map((item, i) => {
        const ativo = aberto === i;
        return (
          <div key={i} className="border-b border-steel">
            <button
              type="button"
              onClick={() => setAberto(ativo ? null : i)}
              aria-expanded={ativo}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-blood"
            >
              <span className="display text-lg tracking-tight md:text-xl">
                {item.pergunta}
              </span>
              <span
                aria-hidden
                className={`num shrink-0 text-2xl leading-none text-blood transition-transform duration-300 ${
                  ativo ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                ativo ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 text-sm leading-relaxed text-ash">
                  {item.resposta}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
