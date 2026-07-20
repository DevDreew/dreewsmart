import { UNIDADE } from "@/lib/academia";

// Como chegar — mapa embutido (sem API key, embed público do Google Maps),
// endereço, horários e botão de rota. Dados vêm de UNIDADE.
export default function ComoChegar() {
  const q = encodeURIComponent(UNIDADE.mapsQuery);
  const embed = `https://www.google.com/maps?q=${q}&output=embed`;
  const rota = `https://www.google.com/maps/dir/?api=1&destination=${q}`;

  return (
    <div className="grid gap-px overflow-hidden border border-steel bg-steel lg:grid-cols-2">
      {/* mapa */}
      <div className="relative min-h-[360px] bg-carbon">
        <iframe
          title={`Mapa — ${UNIDADE.nome}`}
          src={embed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full grayscale-[0.4] contrast-[1.1]"
          style={{ border: 0 }}
        />
      </div>

      {/* dados */}
      <div className="flex flex-col justify-between gap-10 bg-carbon p-8 md:p-10">
        <div>
          <p className="eyebrow mb-4">A UNIDADE</p>
          <h3 className="display text-2xl tracking-tight md:text-3xl">{UNIDADE.nome}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ash">{UNIDADE.endereco}</p>
          <p className="num mt-1 text-xs tracking-[0.14em] text-steel">CEP {UNIDADE.cep}</p>
        </div>

        <div>
          <p className="eyebrow mb-4">HORÁRIOS</p>
          <ul className="divide-y divide-steel border-y border-steel">
            {UNIDADE.horarios.map((h) => (
              <li key={h.dias} className="flex items-center justify-between py-3">
                <span className="num text-[12px] tracking-[0.14em] text-ash">{h.dias}</span>
                <span className="num text-[12px] tracking-[0.14em] text-bone">{h.hora}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-4">
          <a href={rota} target="_blank" rel="noopener noreferrer" className="btn btn-blood">
            TRAÇAR ROTA
          </a>
          <a
            href={`https://wa.me/${UNIDADE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            FALAR NO WHATSAPP
          </a>
        </div>
      </div>
    </div>
  );
}
