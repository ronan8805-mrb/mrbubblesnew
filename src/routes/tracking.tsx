import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/page-intro";
import { TraceDemo } from "@/components/tracking/trace";

export const Route = createFileRoute("/tracking")({
  head: () => ({
    meta: [
      { title: "Tracking · Mr Bubbles" },
      {
        name: "description",
        content:
          "Every bag is labelled and scanned at collection and return. Walk the sample bag MB-10482 from Greenlanes to delivery.",
      },
    ],
  }),
  component: TrackingPage,
});

function TrackingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Tracking"
        title="Every bag has a label. Every handoff has a scan."
        lede="The driver app records the door. The desk log shows the same events. The trace below is a sample, not a login."
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <TraceDemo />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Labelled", "Each bag gets a QR label before it leaves the site."],
            ["Scanned twice at least", "Once at collection. Once when it is returned."],
            ["Tied to the driver app", "The scan at the door is the same record the desk sees."],
          ].map(([title, body]) => (
            <section key={title} className="bg-paper p-5 ring-1 ring-line">
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
