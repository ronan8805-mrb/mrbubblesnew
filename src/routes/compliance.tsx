import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/page-intro";
import { Seal } from "@/components/site/seal";

export const Route = createFileRoute("/compliance")({
  head: () => ({
    meta: [
      { title: "Compliance · Mr Bubbles" },
      {
        name: "description",
        content:
          "ISO 9001, ISO 45001, fully insured, and Irish owned. HSE-approved healthcare processes with a scan at each handoff.",
      },
    ],
  }),
  component: CompliancePage,
});

const standards = [
  {
    title: "ISO 9001",
    body: "Quality. The wash, the finish, and the handoff are done the same way each time, and the bag record shows that they were.",
  },
  {
    title: "ISO 45001",
    body: "Health and safety. The plant and the vans are run so the people doing the work go home safe.",
  },
  {
    title: "Fully insured",
    body: "The company carries insurance for the work. Ask the depot if a site needs the certificate.",
  },
  {
    title: "Irish owned",
    body: "Mr Bubbles is an Irish company, based in Drogheda.",
  },
];

function CompliancePage() {
  return (
    <>
      <PageIntro
        eyebrow="Compliance"
        title="Certified operations. Plain words."
        lede="ISO 9001 for quality. ISO 45001 for health and safety. Insured. Irish owned. A scan on every bag."
      />
      <div className="mx-auto max-w-6xl px-4 py-14">
        <ul className="grid gap-4 md:grid-cols-2">
          {standards.map((item) => (
            <li key={item.title} className="bg-paper p-5 ring-1 ring-line">
              <Seal className="text-brand" />
              <h2 className="mt-3 text-2xl font-bold">{item.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
        <section className="on-navy mt-8 bg-navy p-6 text-paper">
          <div className="flex items-start gap-4">
            <Seal className="shrink-0 text-paper" />
            <div>
              <h2 className="text-2xl font-bold">Traceability, accountability, safe work</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-relaxed">
                <li>Traceability: every bag is labelled. Collection, plant, and return are on the same record.</li>
                <li>Accountability: the brief names the run. The phone number reaches the depot.</li>
                <li>Safe work: soiled linen is handled as soiled. Clean linen does not share that bag.</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="mt-8 bg-paper p-6 ring-1 ring-line">
          <h2 className="text-2xl font-bold">Healthcare</h2>
          <p className="mt-3 leading-relaxed">
            Healthcare laundry uses HSE-approved processes. Soiled and clean are kept apart. Thermal disinfection is
            used where the load needs it. Each handoff is scanned.
          </p>
          <p className="mt-3 leading-relaxed">This page does not claim a hospital contract.</p>
        </section>
      </div>
    </>
  );
}
