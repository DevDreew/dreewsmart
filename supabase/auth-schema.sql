-- ============================================================
-- DREEWSMART — AUTENTICAÇÃO E CONTAS
-- Rodar no SQL Editor DEPOIS do schema.sql principal.
--
-- Usa o auth.users nativo do Supabase (senha já com hash seguro,
-- e-mail/sessão gerenciados pela plataforma). A tabela profiles
-- estende cada usuário com nome, username e role (cliente|admin).
-- ============================================================

-- Perfil 1:1 com auth.users
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  username   varchar(40) unique,
  nome       varchar(120) not null default '',
  role       varchar(10) not null default 'cliente'
             check (role in ('cliente', 'admin')),
  criado_em  timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Cada um lê e edita só o próprio perfil…
drop policy if exists "perfil proprio - leitura" on public.profiles;
create policy "perfil proprio - leitura"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "perfil proprio - update" on public.profiles;
create policy "perfil proprio - update"
  on public.profiles for update
  using (auth.uid() = id);

-- …e o próprio usuário cria seu perfil no cadastro
drop policy if exists "perfil proprio - insert" on public.profiles;
create policy "perfil proprio - insert"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Função utilitária: o usuário atual é admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ============================================================
-- POLÍTICAS ADMIN — só admin lê pedidos/leads/produtos no painel
-- ============================================================

drop policy if exists "admin le pedidos" on public.pedidos;
create policy "admin le pedidos"
  on public.pedidos for select
  using (public.is_admin());

drop policy if exists "admin atualiza pedidos" on public.pedidos;
create policy "admin atualiza pedidos"
  on public.pedidos for update
  using (public.is_admin());

drop policy if exists "admin le leads" on public.leads;
create policy "admin le leads"
  on public.leads for select
  using (public.is_admin());

drop policy if exists "admin gere produtos" on public.produtos;
create policy "admin gere produtos"
  on public.produtos for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- COMO PROMOVER ALGUÉM A ADMIN (rodar manualmente, uma vez):
--   1. A pessoa se cadastra normalmente pelo site (/entrar)
--   2. Rode no SQL Editor, trocando o e-mail:
--
--   update public.profiles set role = 'admin'
--   where id = (select id from auth.users where email = 'voce@exemplo.com');
-- ============================================================
