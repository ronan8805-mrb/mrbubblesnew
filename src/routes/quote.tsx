import { createFileRoute } from "@tanstack/react-router";
import { QuoteForm } from "@/components/quote/configurator";
import { PageIntro } from "@/components/site/page-intro";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Quote · Mr Bubbles" },
      {
        name: "description",
        content:
          "Build a collection brief for Mr Bubbles. Sector, linen, volume, frequency, and county. We confirm the run and the rate.",
      },
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  return (
    <>
      <PageIntro
        eyebrow="Quote"
        title="Get a collection quote."
        lede="A brief, not a rate card. We confirm the run and the rate. The brief stays on this device if you refresh."
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <QuoteForm layout="steps" />
      </div>
    </>
  );
}
