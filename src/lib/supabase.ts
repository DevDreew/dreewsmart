import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ============================================================
// SUPABASE — produtos, pedidos, leads
//
// Tabelas previstas (schema public, RLS ativo):
//   produtos  — espelho do catálogo p/ estoque e preço dinâmico
//   pedidos   — checkout grava aqui (status: criado|pago|enviado)
//   leads     — matrícula da academia + contato
//
// .env.local:
//   NEXT_PUBLIC_SUPABASE_URL=
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=
//
// Sem as envs o site roda 100% com o catálogo local —
// nenhuma página quebra. O client só nasce se as envs existem.
// ============================================================

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  url && anon ? createClient(url, anon) : null;

/** Grava lead de matrícula/contato. No-op silencioso sem env. */
export async function gravarLead(lead: {
  nome: string;
  contato: string;
  origem: "matricula" | "contato";
  plano?: string;
  mensagem?: string;
}) {
  if (!supabase) return { ok: false, offline: true };
  const { error } = await supabase.from("leads").insert(lead);
  return { ok: !error, offline: false, error };
}

/** Grava pedido do checkout. */
export async function gravarPedido(pedido: {
  itens: { slug: string; qtd: number; sabor?: string }[];
  total: number;
  nome: string;
  contato: string;
}) {
  if (!supabase) return { ok: false, offline: true };
  const { error } = await supabase.from("pedidos").insert({
    ...pedido,
    status: "criado",
  });
  return { ok: !error, offline: false, error };
}
