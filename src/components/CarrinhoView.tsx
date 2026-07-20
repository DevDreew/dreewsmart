"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/store";
import { formatBRL } from "@/lib/catalog";

export default function CarrinhoView() {
  const { items, setQtd, remove } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="mt-14 h-40" aria-hidden />;

  const total = items.reduce((t, i) => t + i.preco * i.qtd, 0);

  if (items.length === 0) {
    return (
      <div className="mt-14 max-w-xl border border-steel p-10">
        <p className="text-sm text-ash">Carrinho vazio. O protocolo começa no catálogo.</p>
        <Link
          href="/loja"
          className="num mt-6 inline-block border border-steel px-6 py-3 text-[11px] tracking-[0.14em] text-bone hover:border-blood"
        >
          VER CATÁLOGO
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="border border-steel">
          {items.map((i) => (
            <div
              key={i.slug + (i.sabor ?? "")}
              className="flex flex-wrap items-center justify-between gap-4 border-b border-steel p-6 last:border-b-0"
            >
              <div>
                <p className="display text-lg font-bold">{i.nome}</p>
                {i.sabor && <p className="text-xs text-ash">{i.sabor}</p>}
              </div>
              <div className="flex items-center gap-6">
                <div className="num flex items-center border border-steel text-[12px]">
                  <button
                    type="button"
                    className="px-3 py-1.5 text-ash hover:text-bone"
                    onClick={() => setQtd(i.slug, i.qtd - 1, i.sabor)}
                    aria-label={`Diminuir ${i.nome}`}
                  >
                    −
                  </button>
                  <span className="w-8 text-center">{i.qtd}</span>
                  <button
                    type="button"
                    className="px-3 py-1.5 text-ash hover:text-bone"
                    onClick={() => setQtd(i.slug, i.qtd + 1, i.sabor)}
                    aria-label={`Aumentar ${i.nome}`}
                  >
                    +
                  </button>
                </div>
                <span className="num w-20 text-right text-sm">
                  {formatBRL(i.preco * i.qtd)}
                </span>
                <button
                  type="button"
                  className="num text-[10px] tracking-[0.14em] text-ash hover:text-blood"
                  onClick={() => remove(i.slug, i.sabor)}
                >
                  REMOVER
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside>
        <div className="sticky top-24 border border-steel p-8">
          <div className="flex items-center justify-between">
            <span className="eyebrow">TOTAL</span>
            <span className="num text-2xl">{formatBRL(total)}</span>
          </div>
          <Link
            href="/checkout"
            className="num mt-8 block w-full bg-blood py-4 text-center text-[12px] tracking-[0.14em] text-bone transition-colors hover:bg-blood-dim"
          >
            FECHAR PEDIDO
          </Link>
        </div>
      </aside>
    </div>
  );
}
