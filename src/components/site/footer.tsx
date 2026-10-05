import { Link } from "@tanstack/react-router";
import { ADDRESSES, CONTACT_EMAIL, pages, PHONE_DISPLAY, PHONE_TEL } from "@/lib/content";

export function Footer() {
  return (
    <footer className="on-navy bg-navy text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-sm">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <p className="font-bold">Mr Bubbles</p>
          <a className="font-semibold underline-offset-2 hover:underline" href={`tel:${PHONE_TEL}`}>
            {PHONE_DISPLAY}
          </a>
          <a className="font-semibold underline-offset-2 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          <p className="text-white/80">{ADDRESSES.map((address) => address.lines).join(" · ")}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-1">
          {pages.map((page) => (
            <Link
              key={page.to}
              to={page.to}
              className="underline-offset-2 hover:underline"
              activeOptions={{ exact: page.to === "/" }}
            >
              {page.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-white/75">ISO 9001 · ISO 45001 · Fully insured · Irish owned</p>
      </div>
    </footer>
  );
}
