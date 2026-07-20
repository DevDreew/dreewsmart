import Link from "next/link";

// 4 colunas. SEM newsletter — newsletter em site premium é ruído.
const COLS: { titulo: string; links: { href: string; label: string }[] }[] = [
  {
    titulo: "ACADEMIA",
    links: [
      { href: "/academia/estrutura", label: "Estrutura" },
      { href: "/academia/planos", label: "Planos" },
      { href: "/academia/modalidades", label: "Modalidades" },
      { href: "/academia/treinadores", label: "Treinadores" },
      { href: "/academia/matricula", label: "Matrícula" },
    ],
  },
  {
    titulo: "LOJA",
    links: [
      { href: "/loja/pre-treino", label: "Pré-treino" },
      { href: "/loja/proteina", label: "Proteína" },
      { href: "/loja/creatina", label: "Creatina" },
      { href: "/loja/acessorios", label: "Acessórios" },
      { href: "/loja/vestuario", label: "Vestuário" },
    ],
  },
  {
    titulo: "AJUDA",
    links: [
      { href: "/ajuda", label: "Central de Ajuda" },
      { href: "/conta", label: "Minha conta" },
      { href: "/rotulo-aberto", label: "Rótulo aberto" },
      { href: "/protocolo", label: "Protocolo" },
      { href: "mailto:denuncia@dreewsmart.com.br", label: "Disque Denúncia" },
    ],
  },
  {
    titulo: "CONTATO",
    links: [
      { href: "/contato", label: "Fale com a gente" },
      { href: "/carrinho", label: "Carrinho" },
      { href: "/academia/matricula", label: "Matricule-se" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-steel bg-void">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-10 px-5 py-16 md:grid-cols-4 md:px-10">
        {COLS.map((col) => (
          <div key={col.titulo}>
            <p className="eyebrow mb-5">{col.titulo}</p>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-ash transition-colors hover:text-bone"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-steel">
        <div className="num mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 text-[11px] tracking-[0.14em] text-ash md:px-10">
          <span>DREEWSMART © 2026</span>
          <span>BARUERI/SP</span>
        </div>
      </div>
    </footer>
  );
}
