"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================================
// CARRINHO — Zustand + persist (localStorage)
// O drawer lateral lê daqui. Add to cart não sai da página.
// ============================================================

export interface CartItem {
  slug: string;
  nome: string;
  preco: number;
  sabor?: string;
  qtd: number;
}

interface CartState {
  items: CartItem[];
  drawerOpen: boolean;
  add: (item: Omit<CartItem, "qtd">) => void;
  remove: (slug: string, sabor?: string) => void;
  setQtd: (slug: string, qtd: number, sabor?: string) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  total: () => number;
  count: () => number;
}

const sameLine = (a: CartItem, slug: string, sabor?: string) =>
  a.slug === slug && a.sabor === sabor;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      drawerOpen: false,

      add: (item) =>
        set((s) => {
          const existing = s.items.find((i) =>
            sameLine(i, item.slug, item.sabor)
          );
          const items = existing
            ? s.items.map((i) =>
                sameLine(i, item.slug, item.sabor)
                  ? { ...i, qtd: i.qtd + 1 }
                  : i
              )
            : [...s.items, { ...item, qtd: 1 }];
          return { items, drawerOpen: true };
        }),

      remove: (slug, sabor) =>
        set((s) => ({
          items: s.items.filter((i) => !sameLine(i, slug, sabor)),
        })),

      setQtd: (slug, qtd, sabor) =>
        set((s) => ({
          items:
            qtd <= 0
              ? s.items.filter((i) => !sameLine(i, slug, sabor))
              : s.items.map((i) =>
                  sameLine(i, slug, sabor) ? { ...i, qtd } : i
                ),
        })),

      clear: () => set({ items: [] }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),

      total: () => get().items.reduce((t, i) => t + i.preco * i.qtd, 0),
      count: () => get().items.reduce((t, i) => t + i.qtd, 0),
    }),
    {
      name: "dreewsmart-cart",
      // drawerOpen não persiste — só os itens
      partialize: (s) => ({ items: s.items }),
    }
  )
);
