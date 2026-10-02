import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/page-intro";
import { Photo } from "@/components/site/photo";
import { Seal } from "@/components/site/seal";
import { SectorSwitcher } from "@/components/sector/switcher";
import { ButtonLink } from "@/components/ui/button";
import { sectorById, services, type SectorId } from "@/lib/content";
import { photos } from "@/lib/photos";
import { useQuoteStore } from "@/lib/quote-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services · Mr Bubbles" },
      {
        name: "description",
        content:
          "Commercial laundry, hotel linen, salon towels, healthcare linen, restaurant linen, workwear, pressing, and pickup from Drogheda.",
      },
    ],
  }),
  component: ServicesPage,
});

const anchor: Record<SectorId, string> = {
  hotel: "hotel",
  healthcare: "healthcare",
  salon: "salon",
  restaurant: "restaurant",
  workwear: "workwear",
};

function ServicesPage() {
  const sectorId = useQuoteStore((state) => state.sector);
  const setSector = useQuoteStore((state) => state.setSector);
  const sector = sectorById(sectorId);

  function choose(id: SectorId) {
    setSector(id);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(anchor[id])?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  return (
    <>
      <PageIntro
        eyebrow="Services"
        title="What we collect, how it is washed, what comes back."
        lede="Each line below is a real service. The sector switch jumps to that wash and sets the quote default."
      />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <SectorSwitcher value={sectorId} onChange={choose} label="Jump to a sector" />
        <div
          role="tabpanel"
          id={`sector-panel-${sector.id}`}
          aria-labelledby={`sector-tab-${sector.id}`}
          className="mt-4 bg-paper p-5 ring-1 ring-line"
        >
          <h2 className="text-2xl font-bold">{sector.packTitle}</h2>
          <p className="mt-2">{sector.items.join(", ")}.</p>
          <p className="mt-2 text-muted">{sector.turnaround}</p>
        </div>
        <div className="mt-6 divide-y divide-line">
          {services.map((service, index) => (
            <article id={service.id} key={service.id} className="scroll-mt-24 grid items-center gap-6 py-12 md:grid-cols-2">
              <div className={cn("aspect-photo overflow-hidden bg-foam", index % 2 === 1 && "md:order-2")}>
                <Photo photo={photos[service.photo]} />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{service.title}</h2>
                <p className="mt-3 leading-relaxed">{service.lede}</p>
                {service.note ? (
                  <p className="mt-3 flex items-start gap-3 text-sm font-semibold">
                    <Seal className="size-8 shrink-0 text-brand" />
                    <span>{service.note}</span>
                  </p>
                ) : null}
                <dl className="mt-5 grid gap-3">
                  {(
                    [
                      ["Collected", service.collected],
                      ["Processed", service.processed],
                      ["Comes back", service.returns],
                      ["QR record", service.qr],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs font-bold tracking-wide uppercase text-brand">{label}</dt>
                      <dd className="mt-1 text-sm leading-relaxed">{value}</dd>
                    </div>
                  ))}
                </dl>
                <ButtonLink
                  to="/quote"
                  tone="line"
                  className="mt-5"
                  onClick={() => {
                    if (service.sector) setSector(service.sector);
                  }}
                >
                  Price this collection
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
