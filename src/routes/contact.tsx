import { createFileRoute } from "@tanstack/react-router";
import { QuoteForm } from "@/components/quote/configurator";
import { PageIntro } from "@/components/site/page-intro";
import { ADDRESSES, EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · Mr Bubbles" },
      {
        name: "description",
        content: "Call 086 270 9299, email mrbubblesexpress@gmail.com, or send the same collection brief from this page.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Call the depot, or send the brief."
        lede="Both units are in Drogheda. The form posts the same collection brief as the quote."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          <a className="flex min-h-11 flex-col justify-center bg-navy p-5 text-paper" href={`tel:${PHONE_TEL}`}>
            <span className="text-xs font-semibold tracking-wide uppercase">Phone</span>
            <span className="mt-1 text-xl font-bold">{PHONE_DISPLAY}</span>
          </a>
          <a className="flex min-h-11 flex-col justify-center bg-paper p-5 ring-1 ring-line" href={`mailto:${EMAIL}`}>
            <span className="text-xs font-semibold tracking-wide uppercase text-muted">Email</span>
            <span className="mt-1 font-bold break-all">{EMAIL}</span>
          </a>
          <div className="bg-paper p-5 ring-1 ring-line">
            <p className="text-xs font-semibold tracking-wide uppercase text-muted">Depots</p>
            <ul className="mt-2 grid gap-2 text-sm">
              {ADDRESSES.map((address) => (
                <li key={address.title}>{address.lines}</li>
              ))}
            </ul>
          </div>
        </div>
        <QuoteForm layout="stack" />
      </div>
    </>
  );
}
