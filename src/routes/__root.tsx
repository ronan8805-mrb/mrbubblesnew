import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteShell } from "@/components/site/shell";
import { ButtonLink } from "@/components/ui/button";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mr Bubbles · Laundry and linen specialists" },
      {
        name: "description",
        content:
          "Mr Bubbles Express Laundry & Linen Specialists. Commercial laundry, linen rental, and workwear from Drogheda, delivered across Ireland.",
      },
      { name: "theme-color", content: "#0678A0" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: Root,
  notFoundComponent: NotFound,
});

function Root() {
  return (
    <html lang="en-IE" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <SiteShell>
            <Outlet />
          </SiteShell>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-20">
      <h1 className="text-4xl font-bold">That page is not on the run</h1>
      <p className="mt-4 leading-relaxed">The address does not match a page. Try the quote, or call the depot.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <ButtonLink to="/quote">Get a collection quote</ButtonLink>
        <ButtonLink to="/" tone="line">
          Home
        </ButtonLink>
      </div>
    </section>
  );
}
