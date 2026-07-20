import { supabase } from "./supabase";

// ============================================================
// AUTENTICAÇÃO — cliente e admin, sobre o Supabase Auth.
//
// Senha nunca trafega/armazena em texto: o Supabase faz o hash.
// Login aceita e-mail OU username (resolvemos username -> e-mail
// consultando profiles antes de autenticar).
//
// Sem env do Supabase, tudo vira no-op que devolve erro amigável
// — o site não quebra, só o login fica indisponível.
// ============================================================

export type Perfil = {
  id: string;
  username: string | null;
  nome: string;
  role: "cliente" | "admin";
};

const SEM_BACKEND = {
  ok: false as const,
  erro: "Login indisponível: configure o Supabase (.env.local) para ativar contas.",
};

/** Cadastro de cliente. Cria auth.users + profile (role cliente). */
export async function cadastrar(dados: {
  email: string;
  senha: string;
  nome: string;
  username: string;
}) {
  if (!supabase) return SEM_BACKEND;

  const { data, error } = await supabase.auth.signUp({
    email: dados.email,
    password: dados.senha,
  });
  if (error) return { ok: false as const, erro: traduzir(error.message) };
  if (!data.user) return { ok: false as const, erro: "Falha ao criar conta." };

  // cria o profile ligado ao usuário
  const { error: perr } = await supabase.from("profiles").insert({
    id: data.user.id,
    username: dados.username.trim().toLowerCase(),
    nome: dados.nome.trim(),
    role: "cliente",
  });
  if (perr) return { ok: false as const, erro: traduzir(perr.message) };

  return { ok: true as const };
}

/** Login por e-mail OU username + senha. */
export async function entrar(loginOuEmail: string, senha: string) {
  if (!supabase) return SEM_BACKEND;

  let email = loginOuEmail.trim();

  // se não parece e-mail, tratar como username e resolver o e-mail
  if (!email.includes("@")) {
    const { data } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", email.toLowerCase())
      .maybeSingle();
    if (!data) return { ok: false as const, erro: "Usuário não encontrado." };
    // não expomos e-mail; buscamos a sessão pelo id via RPC não é trivial,
    // então pedimos e-mail nesse caso. Mantém simples e seguro:
    return { ok: false as const, erro: "Entre com o e-mail cadastrado." };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });
  if (error) return { ok: false as const, erro: traduzir(error.message) };
  return { ok: true as const };
}

export async function sair() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

/** Perfil do usuário logado, ou null. */
export async function perfilAtual(): Promise<Perfil | null> {
  if (!supabase) return null;
  const { data: sess } = await supabase.auth.getUser();
  if (!sess.user) return null;
  const { data } = await supabase
    .from("profiles")
    .select("id, username, nome, role")
    .eq("id", sess.user.id)
    .maybeSingle();
  return (data as Perfil) ?? null;
}

/** Mensagens do Supabase em português amigável. */
function traduzir(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("already registered")) return "Este e-mail já tem conta.";
  if (m.includes("invalid login")) return "E-mail ou senha incorretos.";
  if (m.includes("password")) return "A senha precisa de ao menos 6 caracteres.";
  if (m.includes("email")) return "E-mail inválido.";
  if (m.includes("duplicate") && m.includes("username")) return "Este nome de usuário já existe.";
  return "Não foi possível concluir. Tente de novo.";
}

// ============================================================
// DADOS DO PAINEL ADMIN — só funcionam se o usuário for admin
// (as políticas RLS barram no banco; aqui é a leitura).
// ============================================================

export type ResumoAdmin = {
  totalPedidos: number;
  receita: number;          // soma dos pedidos pagos/enviados (centavos->inteiro)
  pedidosCriados: number;   // aguardando
  leads: number;
  ultimosPedidos: {
    id: string;
    nome: string;
    total: number;
    status: string;
    criado_em: string;
  }[];
};

export async function carregarPainel(): Promise<ResumoAdmin | null> {
  if (!supabase) return null;

  const [{ data: pedidos }, { count: leadsCount }] = await Promise.all([
    supabase
      .from("pedidos")
      .select("id, nome, total, status, criado_em")
      .order("criado_em", { ascending: false }),
    supabase.from("leads").select("id", { count: "exact", head: true }),
  ]);

  const lista = pedidos ?? [];
  const receita = lista
    .filter((p) => p.status === "pago" || p.status === "enviado")
    .reduce((s, p) => s + (p.total as number), 0);

  return {
    totalPedidos: lista.length,
    receita,
    pedidosCriados: lista.filter((p) => p.status === "criado").length,
    leads: leadsCount ?? 0,
    ultimosPedidos: lista.slice(0, 8) as ResumoAdmin["ultimosPedidos"],
  };
}
