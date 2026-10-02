import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/page-intro";
import { Photo } from "@/components/site/photo";
import { ButtonLink } from "@/components/ui/button";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works · Mr Bubbles" },
      {
        name: "description",
        content:
          "Book a collection, we scan the bag, wash it to the sector standard, and scan it back. Four steps from the Drogheda depot.",
      },
    ],
  }),
  component: HowPage,
});

const steps = [
  {
    title: "Book a collection",
    body: "Tell us the sector, whether the linen is yours or rental, a rough weekly volume, how often to collect, and the county. We confirm the run and the rate. Nothing on this site is a price list.",
  },
  {
    title: "We collect",
    body: "The driver labels every bag and scans it on the app at the door. Soiled healthcare linen stays separate from clean.",
  },
  {
    title: "Wash to the standard that sector needs",
    body: "Hotel and restaurant linen is washed and finished for service. Salon work comes back folded. Healthcare loads follow HSE-approved processes, including thermal disinfection where the load needs it. Workwear is washed as workwear, not mixed into a guest-linen load.",
  },
  {
    title: "Return scanned",
    body: "The bag is scanned onto the van and scanned again at your door. The desk log and the driver app show the same handoff.",
  },
];

function HowPage() {
  return (
    <>
      <PageIntro
        eyebrow="How it works"
        title="Four steps. One bag record."
        lede="From the brief to the return scan. The same label stays with the bag the whole way."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[minmax(0,1fr)_20rem]">
        <ol className="grid gap-6">
          {steps.map((step, index) => (
            <li key={step.title} className="bg-paper p-5 ring-1 ring-line">
              <p className="text-sm font-bold text-brand">Step {index + 1}</p>
              <h2 className="mt-2 text-2xl font-bold">{step.title}</h2>
              <p className="mt-3 leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="grid gap-4">
          <div className="aspect-photo overflow-hidden bg-foam">
            <Photo photo={photos.fold} />
          </div>
          <div className="aspect-video overflow-hidden bg-foam">
            <Photo photo={photos.fleet} />
          </div>
          <ButtonLink to="/tracking">See a sample trace</ButtonLink>
          <ButtonLink to="/quote" tone="line">
            Get a collection quote
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
