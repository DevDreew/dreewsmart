"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/store";
import { formatBRL } from "@/lib/catalog";
import { gravarPedido } from "@/lib/supabase";

export default function CheckoutView() {
  const { items, clear } = useCart();
  const [mounted, setMounted] = useState(false);
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [status, setStatus] = useState<"idle" | "enviando" | "ok" | "erro">("idle");

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="mt-14 h-40" aria-hidden />;

  const total = items.reduce((t, i) => t + i.preco * i.qtd, 0);

  if (status === "ok") {
    return (
      <div className="mt-14 max-w-xl border border-steel p-10">
        <p className="display text-2xl font-bold">PEDIDO CRIADO.</p>
        <p className="mt-3 text-sm text-ash">
          A gente confirma pagamento e envio pelo seu contato. Envio em 24h úteis.
        </p>
        <Link
          href="/loja"
          className="num mt-8 inline-block border border-steel px-6 py-3 text-[11px] tracking-[0.14em] text-bone hover:border-blood"
        >
          VOLTAR AO CATÁLOGO
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mt-14 max-w-xl border border-steel p-10">
        <p className="text-sm text-ash">Nada pra fechar. O carrinho está vazio.</p>
        <Link
          href="/loja"
          className="num mt-6 inline-block border border-steel px-6 py-3 text-[11px] tracking-[0.14em] text-bone hover:border-blood"
        >
          VER CATÁLOGO
        </Link>
      </div>
    );
  }

  async function fechar() {
    if (!nome.trim() || !contato.trim()) {
      setStatus("erro");
      return;
    }
    setStatus("enviando");
    const r = await gravarPedido({
      itens: items.map((i) => ({ slug: i.slug, qtd: i.qtd, sabor: i.sabor })),
      total,
      nome,
      contato,
    });
    if (r.ok || r.offline) {
      clear();
      setStatus("ok");
    } else {
      setStatus("erro");
    }
  }

  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-3">
      <div className="max-w-xl space-y-5 lg:col-span-2">
        <div>
          <label htmlFor="ck-nome" className="eyebrow mb-2 block">
            NOME
          </label>
          <input
            id="ck-nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border border-steel bg-carbon px-4 py-3 text-sm text-bone outline-none focus:border-blood"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="ck-contato" className="eyebrow mb-2 block">
            WHATSAPP OU E-MAIL
          </label>
          <input
            id="ck-contato"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            className="w-full border border-steel bg-carbon px-4 py-3 text-sm text-bone outline-none focus:border-blood"
            autoComplete="tel"
          />
        </div>
        {status === "erro" && (
          <p className="text-sm text-blood">
            Preencha nome e contato pra fechar o pedido.
          </p>
        )}
        {/* Fase 6: endereço, frete e pagamento entram aqui */}
      </div>

      <aside>
        <div className="sticky top-24 border border-steel p-8">
          <p className="eyebrow mb-5">RESUMO</p>
          <ul className="space-y-3">
            {items.map((i) => (
              <li
                key={i.slug + (i.sabor ?? "")}
                className="num flex justify-between text-sm"
              >
                <span className="text-ash">
                  {i.qtd}× {i.nome}
                </span>
                <span>{formatBRL(i.preco * i.qtd)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex justify-between border-t border-steel pt-5">
            <span className="eyebrow">TOTAL</span>
            <span className="num text-xl">{formatBRL(total)}</span>
          </div>
          <button
            type="button"
            onClick={fechar}
            disabled={status === "enviando"}
            className="num mt-8 w-full bg-blood py-4 text-[12px] tracking-[0.14em] text-bone transition-colors hover:bg-blood-dim disabled:opacity-50"
          >
            {status === "enviando" ? "ENVIANDO…" : "CONFIRMAR PEDIDO"}
          </button>
        </div>
      </aside>
    </div>
  );
}
