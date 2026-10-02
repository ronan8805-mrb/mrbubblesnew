import { useEffect } from "react";
import type { ReactNode } from "react";
import { BubbleField } from "@/components/site/bubbles";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { MobileBar } from "@/components/site/mobile-bar";
import { useQuoteStore } from "@/lib/quote-store";

export function SiteShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    let live = true;
    void (async () => {
      try {
        await useQuoteStore.persist.rehydrate();
      } catch {
        if (live) {
          useQuoteStore.setState({
            error: "The saved brief could not be read on this device. Start a new one.",
            status: "error",
          });
        }
      } finally {
        if (live) useQuoteStore.setState({ hydrated: true });
      }
    })();
    return () => {
      live = false;
    };
  }, []);

  return (
    <div className="skin relative flex min-h-screen flex-col text-ink">
      <BubbleField />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main id="main" className="flex-1 pb-24 md:pb-0">
          {children}
        </main>
        <Footer />
      </div>
      <MobileBar />
    </div>
  );
}
