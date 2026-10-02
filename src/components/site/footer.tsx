import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/site/logo";
import { ADDRESSES, EMAIL, pages, PHONE_DISPLAY, PHONE_TEL } from "@/lib/content";

export function Footer() {
  return (
    <footer className="on-navy bg-navy text-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed">
            Ireland’s laundry and linen specialists. Fresh, hygienic, on time.
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            Certified to ISO 9001 and ISO 45001. Fully insured. Irish owned.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold">Depots</h2>
          <ul className="mt-3 grid gap-3 text-sm leading-relaxed">
            {ADDRESSES.map((address) => (
              <li key={address.title}>{address.lines}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold">Talk to the depot</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <a className="inline-flex min-h-11 items-center font-semibold underline-offset-2 hover:underline" href={`tel:${PHONE_TEL}`}>
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                className="inline-flex min-h-11 items-center break-all font-semibold underline-offset-2 hover:underline"
                href={`mailto:${EMAIL}`}
              >
                {EMAIL}
              </a>
            </li>
            <li className="text-sm">mrbubbles.ie</li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold">Sitemap</h2>
          <ul className="mt-3 grid gap-1 text-sm">
            {pages.map((page) => (
              <li key={page.to}>
                <Link
                  to={page.to}
                  className="inline-flex min-h-11 items-center font-semibold underline-offset-2 hover:underline"
                  activeOptions={{ exact: page.to === "/" }}
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
