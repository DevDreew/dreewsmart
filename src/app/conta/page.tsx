"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { perfilAtual, sair, type Perfil } from "@/lib/auth";

// ============================================================
// /conta — área do cliente logado. Admin vê atalho para /admin.
// Guard client-side: sem sessão, manda para /entrar.
// ============================================================

export default function Conta() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    perfilAtual().then((p) => {
      if (!p) {
        router.replace("/entrar");
        return;
      }
      setPerfil(p);
      setCarregando(false);
    });
  }, [router]);

  async function logout() {
    await sair();
    router.replace("/");
  }

  if (carregando) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="num text-[11px] tracking-[0.14em] text-ash">CARREGANDO…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-20">
      <p className="eyebrow mb-3">MINHA CONTA</p>
      <h1 className="display text-3xl md:text-5xl">OLÁ, {perfil!.nome.split(" ")[0].toUpperCase()}.</h1>

      <div className="mt-10 grid gap-px bg-steel sm:grid-cols-2">
        <div className="bg-carbon p-6">
          <p className="eyebrow mb-2">USUÁRIO</p>
          <p className="text-bone">@{perfil!.username}</p>
        </div>
        <div className="bg-carbon p-6">
          <p className="eyebrow mb-2">TIPO DE CONTA</p>
          <p className="text-bone">{perfil!.role === "admin" ? "Administrador" : "Cliente"}</p>
        </div>
      </div>

      {/* atalho admin — só aparece para admin */}
      {perfil!.role === "admin" && (
        <Link href="/admin" className="btn btn-blood mt-8 inline-flex">
          ABRIR PAINEL ADMIN
        </Link>
      )}

      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/loja" className="btn btn-ghost">IR À LOJA</Link>
        <button onClick={logout} className="num border border-steel px-8 py-4 text-[11px] tracking-[0.14em] text-ash transition-colors hover:border-blood hover:text-bone">
          SAIR
        </button>
      </div>
    </div>
  );
}
