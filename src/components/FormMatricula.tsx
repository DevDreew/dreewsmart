"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { gravarLead } from "@/lib/supabase";
import { PLANOS, getPlano } from "@/lib/planos";

// ============================================================
// MATRÍCULA — sistema padrão Smart Fit:
// escolheu o plano → o painel ao lado mostra na hora o preço
// promocional, o selo e TUDO que aquele plano entrega
// (riscado o que não entrega). Zero dúvida antes de enviar.
// ============================================================

export default function FormMatricula() {
  const params = useSearchParams();
  const planoParam = params.get("plano");
  const [planoId, setPlanoId] = useState(
    PLANOS.some((p) => p.id === planoParam) ? (planoParam as string) : "performance"
  );
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [status, setStatus] = useState<"idle" | "enviando" | "ok" | "erro">("idle");

  const plano = getPlano(planoId)!;

  async function enviar() {
    if (!nome.trim() || !contato.trim()) {
      setStatus("erro");
      return;
    }
    setStatus("enviando");
    const r = await gravarLead({ nome, contato, plano: planoId, origem: "matricula" });
    setStatus(r.ok || r.offline ? "ok" : "erro");
  }

  if (status === "ok") {
    return (
      <div className="mt-14 max-w-xl border border-steel p-10">
        <p className="display text-2xl">RECEBIDO.</p>
        <p className="mt-3 text-sm text-ash">
          A gente chama no seu contato pra fechar a matrícula do plano{" "}
          <span className="num text-bone">{plano.nome}</span> por{" "}
          <span className="num text-blood">R$ {plano.precoPromo} no 1º mês</span>.
          Traga documento com foto. O treino começa no mesmo dia.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_400px]">
      {/* FORMULÁRIO */}
      <div className="max-w-xl">
        <div className="mb-8">
          <p className="eyebrow mb-3">PLANO</p>
          <div className="flex flex-wrap gap-2">
            {PLANOS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlanoId(p.id)}
                className={`num relative border px-5 py-3 text-[11px] tracking-[0.14em] transition-colors ${
                  planoId === p.id
                    ? "border-blood bg-blood/10 text-bone"
                    : "border-steel text-ash hover:text-bone"
                }`}
                aria-pressed={planoId === p.id}
              >
                {p.nome}
                {p.selo && (
                  <span className="num absolute -top-2 right-2 bg-blood px-1.5 text-[8px] tracking-[0.1em] text-bone">
                    TOP
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="nome" className="eyebrow mb-2 block">NOME</label>
            <input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border border-steel bg-carbon px-4 py-3 text-sm text-bone outline-none focus:border-blood"
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="contato" className="eyebrow mb-2 block">WHATSAPP OU E-MAIL</label>
            <input
              id="contato"
              value={contato}
              onChange={(e) => setContato(e.target.value)}
              className="w-full border border-steel bg-carbon px-4 py-3 text-sm text-bone outline-none focus:border-blood"
              autoComplete="tel"
            />
          </div>
        </div>

        {status === "erro" && (
          <p className="mt-4 text-sm text-blood">
            Preencha nome e contato. Sem isso a gente não te acha.
          </p>
        )}

        <button
          type="button"
          onClick={enviar}
          disabled={status === "enviando"}
          className="num mt-8 w-full bg-blood py-4 text-[12px] tracking-[0.14em] text-bone transition-colors hover:bg-blood-dim disabled:opacity-50"
        >
          {status === "enviando" ? "ENVIANDO…" : `MATRICULAR NO ${plano.nome}`}
        </button>
      </div>

      {/* PAINEL DO PLANO ESCOLHIDO — atualiza na hora do clique */}
      <aside
        aria-live="polite"
        className={`h-fit border p-7 ${
          plano.destaque ? "border-blood shadow-[0_0_40px_rgba(255,15,0,0.1)]" : "border-steel"
        }`}
      >
        {plano.selo && (
          <span className="num mb-3 inline-block bg-blood px-2.5 py-1 text-[9px] tracking-[0.14em] text-bone">
            {plano.selo}
          </span>
        )}
        <p className="display text-xl">{plano.nome}</p>
        <p className="mt-1 text-xs text-ash">{plano.tagline}</p>

        <div className="mt-5 border-y border-steel py-4">
          <p className="num text-xs text-steel line-through">R$ {plano.preco},00</p>
          <p className="display text-3xl">
            R$ {plano.precoPromo}
            <span className="num ml-2 align-middle text-[11px] text-blood">{plano.off}% OFF</span>
          </p>
          <p className="num mt-1 text-[10px] text-ash">
            <span className="text-bone">no 1º mês</span> · depois R$ {plano.preco}/mês · {plano.fidelidade}
          </p>
        </div>

        <p className="eyebrow mb-3 mt-5">O QUE ESSE PLANO ENTREGA</p>
        <ul className="space-y-2.5">
          {plano.beneficios.map((b) => (
            <li key={b.label} className="flex items-start gap-2.5 text-[13px]">
              <span aria-hidden className={`num mt-0.5 text-xs ${b.incluso ? "text-blood" : "text-steel"}`}>
                {b.incluso ? "✓" : "✕"}
              </span>
              <span className={b.incluso ? "text-bone" : "text-steel line-through"}>
                {b.label}
              </span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
