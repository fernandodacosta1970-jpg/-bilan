import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      {/* Hero */}
      <section>
        <h1 className="max-w-2xl font-serif text-4xl font-medium leading-[1.15] text-ink sm:text-5xl">
          Le bilan que vos clients attendent, sans que vous ayez à y penser.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
          Vous facturez au mois. Vos clients, eux, jugent au résultat — et
          sans bilan clair, le doute s&rsquo;installe avant le renouvellement.
          Bilan met vos chiffres en page et les envoie le 1er de chaque mois,
          automatiquement.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-sm bg-accent px-6 py-3 font-sans text-sm font-semibold text-ink transition hover:brightness-95"
          >
            Essayer gratuitement
          </Link>
          <span className="text-sm text-slate">39&nbsp;€/mois · 10 clients suivis</span>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="mt-20 grid gap-10 border-t border-line pt-14 sm:grid-cols-3">
        <div>
          <h2 className="font-serif text-lg font-medium text-ink">
            Une minute de saisie
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            Entrez les chiffres du mois pour un client, pas de tableur à
            maintenir.
          </p>
        </div>
        <div>
          <h2 className="font-serif text-lg font-medium text-ink">
            Mis en page tout seul
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            Le rapport prend automatiquement vos couleurs. Vous ne touchez à
            aucune mise en page.
          </p>
        </div>
        <div>
          <h2 className="font-serif text-lg font-medium text-ink">
            Envoyé et confirmé
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            Départ automatique le 1er du mois, avec accusé de lecture du
            client.
          </p>
        </div>
      </section>

      {/* Preuve sociale (placeholder) */}
      <section className="mt-20 border-t border-line pt-14">
        <blockquote className="max-w-xl font-serif text-xl italic leading-snug text-ink">
          &laquo;&nbsp;Mes clients ne m&rsquo;ont plus jamais reposé la
          question de ce qu&rsquo;ils obtenaient pour leur argent.&nbsp;&raquo;
        </blockquote>
        <p className="mt-3 text-sm text-slate">
          — Prénom Nom, activité (témoignage à remplacer)
        </p>
      </section>

      {/* CTA final */}
      <section className="mt-20 border-t border-line pt-14">
        <p className="max-w-md text-slate">
          Premier bilan envoyé ce mois-ci. Aucune carte requise pour tester.
        </p>
        <div className="mt-6">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-sm bg-accent px-6 py-3 font-sans text-sm font-semibold text-ink transition hover:brightness-95"
          >
            Essayer gratuitement
          </Link>
        </div>
      </section>
    </main>
  );
}
