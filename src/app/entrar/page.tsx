"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { entrar, cadastrar } from "@/lib/auth";

// ============================================================
// /entrar — login e cadastro de cliente num só lugar (abas).
// Após entrar, vai para /conta. Admin vê link para /admin lá.
// ============================================================

export default function Entrar() {
  const router = useRouter();
  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  // campos
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");

  async function submeter(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    const r =
      modo === "login"
        ? await entrar(email, senha)
        : await cadastrar({ email, senha, nome, username });

    setCarregando(false);

    if (!r.ok) {
      setErro(r.erro);
      return;
    }
    if (modo === "cadastro") {
      setModo("login");
      setErro("");
      alert("Conta criada. Agora é só entrar.");
      return;
    }
    router.push("/conta");
  }

  const inputCls =
    "w-full border border-steel bg-carbon px-4 py-3.5 text-sm text-bone placeholder:text-ash focus:border-blood focus:outline-none";

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 py-20">
      <p className="eyebrow mb-3">CONTA DREEWSMART</p>
      <h1 className="display text-3xl md:text-4xl">
        {modo === "login" ? "ENTRAR" : "CRIAR CONTA"}
      </h1>

      {/* abas */}
      <div className="mt-8 flex gap-2">
        <button
          type="button"
          onClick={() => { setModo("login"); setErro(""); }}
          className={`num flex-1 py-3 text-[11px] tracking-[0.14em] transition-colors ${
            modo === "login" ? "bg-blood text-bone" : "border border-steel text-ash hover:border-blood"
          }`}
        >JÁ TENHO CONTA</button>
        <button
          type="button"
          onClick={() => { setModo("cadastro"); setErro(""); }}
          className={`num flex-1 py-3 text-[11px] tracking-[0.14em] transition-colors ${
            modo === "cadastro" ? "bg-blood text-bone" : "border border-steel text-ash hover:border-blood"
          }`}
        >CRIAR CONTA</button>
      </div>

      <form onSubmit={submeter} className="mt-8 flex flex-col gap-4">
        {modo === "cadastro" && (
          <>
            <input
              className={inputCls} placeholder="Nome completo" required
              value={nome} onChange={(e) => setNome(e.target.value)}
            />
            <input
              className={inputCls} placeholder="Nome de usuário" required
              value={username} onChange={(e) => setUsername(e.target.value)}
            />
          </>
        )}
        <input
          className={inputCls} type="email" placeholder="E-mail" required
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={inputCls} type="password" placeholder="Senha" required minLength={6}
          value={senha} onChange={(e) => setSenha(e.target.value)}
        />

        {erro && <p className="num text-xs text-blood">{erro}</p>}

        <button type="submit" disabled={carregando} className="btn btn-blood mt-2 justify-center disabled:opacity-60">
          {carregando ? "..." : modo === "login" ? "ENTRAR" : "CRIAR CONTA"}
        </button>
      </form>

      <Link href="/" className="num mt-8 text-center text-[11px] tracking-[0.14em] text-ash hover:text-blood">
        ← VOLTAR AO INÍCIO
      </Link>
    </div>
  );
}
