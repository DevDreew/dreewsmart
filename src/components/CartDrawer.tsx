"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/store";
import { formatBRL } from "@/lib/catalog";

export default function CartDrawer() {
  const { items, drawerOpen, closeDrawer, setQtd, remove } = useCart();
  const total = items.reduce((t, i) => t + i.preco * i.qtd, 0);

  // ESC fecha
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-void/70 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-steel bg-carbon transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho"
      >
        <div className="flex items-center justify-between border-b border-steel px-6 py-5">
          <h2 className="display text-lg font-bold">CARRINHO</h2>
          <button
            type="button"
            onClick={closeDrawer}
            className="num text-[11px] tracking-[0.14em] text-ash hover:text-bone"
          >
            FECHAR ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="pt-10 text-center">
              <p className="text-sm text-ash">Carrinho vazio.</p>
              <Link
                href="/loja"
                onClick={closeDrawer}
                className="num mt-6 inline-block border border-steel px-6 py-3 text-[11px] tracking-[0.14em] text-bone hover:border-blood"
              >
                VER CATÁLOGO
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((i) => (
                <li
                  key={i.slug + (i.sabor ?? "")}
                  className="border border-steel p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="display text-sm font-bold">{i.nome}</p>
                      {i.sabor && (
                        <p className="mt-0.5 text-xs text-ash">{i.sabor}</p>
                      )}
                    </div>
                    <span className="num text-sm">{formatBRL(i.preco)}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="num flex items-center border border-steel text-[12px]">
                      <button
                        type="button"
                        className="px-3 py-1.5 text-ash hover:text-bone"
                        onClick={() => setQtd(i.slug, i.qtd - 1, i.sabor)}
                        aria-label={`Diminuir quantidade de ${i.nome}`}
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{i.qtd}</span>
                      <button
                        type="button"
                        className="px-3 py-1.5 text-ash hover:text-bone"
                        onClick={() => setQtd(i.slug, i.qtd + 1, i.sabor)}
                        aria-label={`Aumentar quantidade de ${i.nome}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="num text-[10px] tracking-[0.14em] text-ash hover:text-blood"
                      onClick={() => remove(i.slug, i.sabor)}
                    >
                      REMOVER
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-steel px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="eyebrow">TOTAL</span>
              <span className="num text-xl">{formatBRL(total)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="num block w-full bg-blood py-4 text-center text-[12px] tracking-[0.14em] text-bone transition-colors hover:bg-blood-dim"
            >
              FECHAR PEDIDO
            </Link>
            <Link
              href="/carrinho"
              onClick={closeDrawer}
              className="num mt-3 block w-full border border-steel py-3 text-center text-[11px] tracking-[0.14em] text-ash hover:text-bone"
            >
              VER CARRINHO
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
