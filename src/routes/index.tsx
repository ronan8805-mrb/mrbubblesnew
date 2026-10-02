import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { RouteSketch } from "@/components/home/route-sketch";
import { Certifications } from "@/components/site/certifications";
import { Photo } from "@/components/site/photo";
import { Seal } from "@/components/site/seal";
import { SectorSwitcher } from "@/components/sector/switcher";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { flow, PHONE_DISPLAY, PHONE_TEL, proofs, questions, sectorById } from "@/lib/content";
import { photos } from "@/lib/photos";
import { useQuoteStore } from "@/lib/quote-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mr Bubbles · Fresh linen, on the van" },
      {
        name: "description",
        content:
          "Commercial laundry, linen rental, and workwear for hotels, healthcare, salons, and restaurants. Collected in Drogheda, delivered across Ireland.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const sectorId = useQuoteStore((state) => state.sector);
  const setSector = useQuoteStore((state) => state.setSector);
  const sector = sectorById(sectorId);

  return (
    <>
      <section className="hero-frame relative flex items-center overflow-hidden text-paper">
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-[1.05fr_0.95fr] md:py-16">
          <div>
            <p className="text-sm font-bold tracking-wide">Mr Bubbles · Drogheda</p>
            <h1 className="mt-3 text-4xl font-bold md:text-6xl">Fresh linen. On the van. Back before service.</h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed">
              Commercial laundry, linen rental, and workwear for hotels, healthcare, salons, and restaurants. Collected
              in Drogheda, delivered across Ireland.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to="/quote">Get a collection quote</ButtonLink>
              <ButtonAnchor href={`tel:${PHONE_TEL}`} tone="ghost">
                {PHONE_DISPLAY}
              </ButtonAnchor>
            </div>
          </div>
          <figure className="overflow-hidden bg-navy shadow-lg ring-4 ring-white/80">
            <Photo photo={photos.fleet} priority className="aspect-video h-full w-full object-cover" />
            <figcaption className="sr-only">The Mr Bubbles fleet at the depot.</figcaption>
          </figure>
        </div>
      </section>

      <RouteSketch />

      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="sector-heading">
        <h2 id="sector-heading" className="text-3xl font-bold md:text-4xl">
          Pick the sector. See the pack.
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          The pack, the turnaround, and the quote default all follow the sector you choose.
        </p>
        <div className="mt-6">
          <SectorSwitcher value={sectorId} onChange={setSector} />
        </div>
        <div
          role="tabpanel"
          id={`sector-panel-${sector.id}`}
          aria-labelledby={`sector-tab-${sector.id}`}
          className="mt-6 grid gap-6 bg-paper p-5 ring-1 ring-line md:grid-cols-[minmax(0,1fr)_16rem]"
        >
          <div>
            <h3 className="text-2xl font-bold">{sector.packTitle}</h3>
            <ul className="mt-4 grid gap-2">
              {sector.items.map((item) => (
                <li key={item} className="flex min-h-11 items-center gap-3 border-b border-line text-base font-semibold">
                  <span className="size-2 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 leading-relaxed">{sector.turnaround}</p>
            <ButtonLink to="/quote" className="mt-5">
              Price this collection
            </ButtonLink>
          </div>
          <p className="sr-only" aria-live="polite">
            {sector.label} pack shown.
          </p>
          <div className="aspect-photo overflow-hidden bg-foam">
            <Photo
              photo={
                sector.id === "hotel"
                  ? photos.hotel
                  : sector.id === "healthcare"
                    ? photos.healthcare
                    : sector.id === "salon"
                      ? photos.salon
                      : sector.id === "restaurant"
                        ? photos.restaurant
                        : photos.workwear
              }
            />
          </div>
        </div>
      </section>

      <section className="on-navy bg-navy text-paper" aria-labelledby="proof-heading">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 id="proof-heading" className="text-3xl font-bold">
            What you can check
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {proofs.map((proof) => (
              <li key={proof.title} className="border border-white/20 p-5">
                <Seal className="text-paper" />
                <h3 className="mt-4 text-xl font-bold">{proof.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{proof.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <Certifications />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="flow-heading">
        <h2 id="flow-heading" className="text-3xl font-bold">
          How a bag moves
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {flow.map((step, index) => (
            <li key={step.title} className="bg-paper p-5 ring-1 ring-line">
              <p className="font-display text-sm font-bold text-brand">0{index + 1}</p>
              <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <ButtonLink to="/how-it-works" tone="line" className="mt-6">
          Read the full run
        </ButtonLink>
      </section>

      <section className="bg-foam" aria-labelledby="ask-heading">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 id="ask-heading" className="text-3xl font-bold">
            What operators ask
          </h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {questions.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex min-h-11 items-center justify-between gap-4 py-3 font-semibold">
                  {item.q}
                  <ChevronDown className="size-5 shrink-0 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="pb-4 leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="quote-teaser">
        <div className="grid items-center gap-6 bg-paper p-6 ring-1 ring-line md:grid-cols-2">
          <div>
            <h2 id="quote-teaser" className="text-3xl font-bold">
              Send a collection brief
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              Six short steps. You get a brief to email. We confirm the run and the rate. No rate card on this site. It
              opens on {sector.label.toLowerCase()}.
            </p>
            <ButtonLink to="/quote" className="mt-5">
              Get a collection quote
            </ButtonLink>
          </div>
          <div className="aspect-video overflow-hidden bg-foam">
            <Photo photo={photos.towels} />
          </div>
        </div>
      </section>
    </>
  );
}
