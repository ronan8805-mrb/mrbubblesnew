import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/page-intro";
import { ADDRESSES, EMAIL, PHONE_DISPLAY, PHONE_TEL, provinces } from "@/lib/content";

export const Route = createFileRoute("/coverage")({
  head: () => ({
    meta: [
      { title: "Coverage · Mr Bubbles" },
      {
        name: "description",
        content:
          "Two units in Drogheda and business collections across Ireland. Choose a county on the quote and we confirm the run.",
      },
    ],
  }),
  component: CoveragePage,
});

function CoveragePage() {
  return (
    <>
      <PageIntro
        eyebrow="Coverage"
        title="Drogheda base. Collections across Ireland."
        lede="Two units in Co. Louth. Business collections are booked by county. This list is not a set of local depots."
      />
      <div className="mx-auto max-w-6xl px-4 py-14">
        <ol className="relative grid gap-6 border-l-2 border-brand pl-6">
          <li>
            <h2 className="text-xl font-bold">Drogheda base</h2>
            <p className="mt-1 text-muted">Co. Louth. Both units run from here.</p>
          </li>
          {ADDRESSES.map((address) => (
            <li key={address.title}>
              <h2 className="text-xl font-bold">{address.title}</h2>
              <p className="mt-1">{address.lines}</p>
            </li>
          ))}
          <li>
            <h2 className="text-xl font-bold">Nationwide business collections</h2>
            <p className="mt-1 text-muted">
              Put the county on the brief. We confirm whether that site is on a run.{" "}
              <Link to="/quote" className="font-semibold text-brand underline-offset-2 hover:underline">
                Get a collection quote
              </Link>
              .
            </p>
          </li>
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <a className="inline-flex min-h-11 items-center font-semibold text-brand" href={`tel:${PHONE_TEL}`}>
            Call {PHONE_DISPLAY}
          </a>
          <a className="inline-flex min-h-11 items-center font-semibold text-brand" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </div>
        <h2 className="mt-12 text-3xl font-bold">Counties</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {provinces.map((province) => (
            <section key={province.name} className="bg-paper p-5 ring-1 ring-line">
              <h3 className="text-xl font-bold">{province.name}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {province.counties.map((county) => (
                  <li key={county}>
                    <span
                      className={
                        county === "Louth"
                          ? "inline-flex min-h-11 items-center bg-navy px-3 text-sm font-semibold text-paper"
                          : "inline-flex min-h-11 items-center bg-foam px-3 text-sm"
                      }
                    >
                      {county}
                      {county === "Louth" ? " · depot" : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
