-- ============================================================
-- DREEWSMART — SCHEMA SUPABASE
-- Rodar no SQL Editor do projeto. RLS ativo em tudo.
-- O site funciona 100% sem isso (catálogo local + fallback
-- offline); estas tabelas ligam pedidos e leads reais.
-- ============================================================

create table if not exists public.produtos (
  slug        text primary key,
  nome        text not null,
  preco       integer not null check (preco > 0),
  categoria   text not null,
  estoque     integer not null default 0 check (estoque >= 0),
  ativo       boolean not null default true,
  atualizado  timestamptz not null default now()
);

create table if not exists public.pedidos (
  id          uuid primary key default gen_random_uuid(),
  itens       jsonb not null,           -- [{slug, qtd, sabor}]
  total       integer not null check (total > 0),
  nome        text not null,
  contato     text not null,
  status      text not null default 'criado'
              check (status in ('criado','pago','enviado','cancelado')),
  criado_em   timestamptz not null default now()
);

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  nome        text not null,
  contato     text not null,
  origem      text not null check (origem in ('matricula','contato')),
  plano       text,
  mensagem    text,
  criado_em   timestamptz not null default now()
);

alter table public.produtos enable row level security;
alter table public.pedidos  enable row level security;
alter table public.leads    enable row level security;

-- catálogo é público para leitura
create policy "produtos_select_publico"
  on public.produtos for select
  to anon, authenticated
  using (ativo = true);

-- qualquer visitante pode criar pedido e lead; ninguém lê de volta pelo anon
create policy "pedidos_insert_publico"
  on public.pedidos for insert
  to anon, authenticated
  with check (true);

create policy "leads_insert_publico"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- seed do catálogo
insert into public.produtos (slug, nome, preco, categoria, estoque) values
  ('pulse-pre-treino', 'PULSE', 189, 'pre-treino', 100),
  ('helix-garrafa',    'HELIX', 129, 'acessorios', 100),
  ('core-whey',        'CORE',  249, 'proteina',   100),
  ('mono-creatina',    'MONO',   99, 'creatina',   100),
  ('grip-straps',      'GRIP',   79, 'acessorios', 100)
on conflict (slug) do nothing;
