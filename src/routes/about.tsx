import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageIntro } from "@/components/site/page-intro";
import { Photo } from "@/components/site/photo";
import { ADDRESSES, clients } from "@/lib/content";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Mr Bubbles" },
      {
        name: "description",
        content:
          "Mr Bubbles Express Laundry & Linen Specialists, based in Drogheda. Irish owned, ISO 9001 and ISO 45001.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        title="Mr Bubbles Express Laundry & Linen Specialists."
        lede="Ireland’s laundry and linen specialists. Fresh, hygienic, on time."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2">
        <div className="grid gap-4">
          <h2 className="text-3xl font-bold">The company</h2>
          <p className="leading-relaxed">
            Mr Bubbles Express Laundry & Linen Specialists was set up to give hotels, healthcare sites, restaurants, and
            hair and beauty studios a reliable laundry from Drogheda.
          </p>
          <p className="leading-relaxed">
            We collect, wash, and return. The plant runs under ISO 9001 and ISO 45001. The company is Irish owned and
            fully insured.
          </p>
          <p className="leading-relaxed">From Drogheda we collect for businesses across Ireland.</p>
          <p className="leading-relaxed">
            The aim is straightforward: raise the standard of laundry and linen through care, compliance, and a scan on
            every bag.
          </p>
        </div>
        <div className="aspect-photo overflow-hidden bg-foam">
          <Photo photo={photos.fleet} />
        </div>
      </div>
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-3xl font-bold">Trusted by</h2>
          <p className="mt-2 text-muted">Categories we work with. No client logos and no star scores on this site.</p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {clients.map((client) => (
              <li key={client} className="flex min-h-11 items-center gap-3 font-semibold">
                <Check className="size-5 shrink-0 text-brand" aria-hidden="true" />
                {client}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-bold">Where we work</h2>
        <ul className="mt-4 grid gap-3">
          {ADDRESSES.map((address) => (
            <li key={address.title} className="bg-paper p-4 ring-1 ring-line">
              {address.lines}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
