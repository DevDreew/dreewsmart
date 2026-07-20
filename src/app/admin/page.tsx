"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { perfilAtual, carregarPainel, sair, type ResumoAdmin } from "@/lib/auth";
import { CATALOGO, formatBRL } from "@/lib/catalog";

// ============================================================
// /admin — PAINEL EXCLUSIVO DO ADMINISTRADOR
// Guard duplo: client-side (redireciona) + RLS no banco (a query
// só retorna se o usuário for admin de verdade). Dashboard com
// vendas, pedidos e produtos da loja.
// ============================================================

const STATUS_COR: Record<string, string> = {
  criado: "text-ash",
  pago: "text-blood",
  enviado: "text-bone",
  cancelado: "text-steel line-through",
};

export default function Admin() {
  const router = useRouter();
  const [estado, setEstado] = useState<"checando" | "negado" | "ok">("checando");
  const [dados, setDados] = useState<ResumoAdmin | null>(null);

  useEffect(() => {
    (async () => {
      const p = await perfilAtual();
      if (!p) { router.replace("/entrar"); return; }
      if (p.role !== "admin") { setEstado("negado"); return; }
      const painel = await carregarPainel();
      setDados(painel);
      setEstado("ok");
    })();
  }, [router]);

  if (estado === "checando") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="num text-[11px] tracking-[0.14em] text-ash">VERIFICANDO ACESSO…</p>
      </div>
    );
  }

  if (estado === "negado") {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-5 text-center">
        <h1 className="display text-3xl">ACESSO RESTRITO</h1>
        <p className="mt-4 text-sm text-ash">Esta área é exclusiva para administradores.</p>
        <Link href="/conta" className="btn btn-ghost mt-8">VOLTAR À MINHA CONTA</Link>
      </div>
    );
  }

  const ativos = CATALOGO.length;

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-3">PAINEL ADMINISTRATIVO</p>
          <h1 className="display text-3xl md:text-5xl">DASHBOARD</h1>
        </div>
        <button
          onClick={async () => { await sair(); router.replace("/"); }}
          className="num border border-steel px-6 py-3 text-[11px] tracking-[0.14em] text-ash transition-colors hover:border-blood hover:text-bone"
        >SAIR</button>
      </div>

      {/* KPIs */}
      <div className="mt-10 grid grid-cols-2 gap-px border border-steel bg-steel lg:grid-cols-4">
        <Kpi label="RECEITA" valor={dados ? formatBRL(dados.receita) : "—"} destaque />
        <Kpi label="PEDIDOS" valor={dados ? String(dados.totalPedidos) : "—"} />
        <Kpi label="AGUARDANDO" valor={dados ? String(dados.pedidosCriados) : "—"} />
        <Kpi label="LEADS" valor={dados ? String(dados.leads) : "—"} />
      </div>

      {!dados && (
        <p className="num mt-6 text-xs text-ash">
          Sem conexão com o Supabase ou sem dados ainda. Configure o .env.local e rode os schemas para ver números reais.
        </p>
      )}

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        {/* PEDIDOS */}
        <section>
          <h2 className="display mb-5 text-xl">ÚLTIMOS PEDIDOS</h2>
          <div className="border border-steel">
            <div className="num grid grid-cols-[1fr_auto_auto] gap-4 border-b border-steel px-5 py-3 text-[10px] tracking-[0.12em] text-ash">
              <span>CLIENTE</span><span>TOTAL</span><span>STATUS</span>
            </div>
            {dados && dados.ultimosPedidos.length > 0 ? (
              dados.ultimosPedidos.map((p) => (
                <div key={p.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-steel px-5 py-3.5 text-sm last:border-b-0">
                  <span className="truncate text-bone">{p.nome}</span>
                  <span className="num text-bone">{formatBRL(p.total)}</span>
                  <span className={`num text-[11px] uppercase tracking-[0.1em] ${STATUS_COR[p.status] ?? "text-ash"}`}>{p.status}</span>
                </div>
              ))
            ) : (
              <p className="px-5 py-8 text-center text-xs text-ash">Nenhum pedido ainda.</p>
            )}
          </div>
        </section>

        {/* PRODUTOS */}
        <section>
          <h2 className="display mb-5 text-xl">PRODUTOS ({ativos})</h2>
          <div className="border border-steel">
            {CATALOGO.slice(0, 8).map((p) => (
              <div key={p.slug} className="flex items-center justify-between gap-3 border-b border-steel px-5 py-3 text-sm last:border-b-0">
                <span className="text-bone">{p.nome}</span>
                <span className="num text-ash">{formatBRL(p.preco)}</span>
              </div>
            ))}
          </div>
          <Link href="/loja" className="num mt-4 inline-flex text-[11px] tracking-[0.14em] text-blood hover:underline">
            VER CATÁLOGO COMPLETO →
          </Link>
        </section>
      </div>
    </div>
  );
}

function Kpi({ label, valor, destaque }: { label: string; valor: string; destaque?: boolean }) {
  return (
    <div className="bg-carbon p-6">
      <p className="num text-[10px] tracking-[0.14em] text-ash">{label}</p>
      <p className={`display mt-2 text-3xl ${destaque ? "text-blood" : "text-bone"}`}>{valor}</p>
    </div>
  );
}
