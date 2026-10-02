import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { buttonClass } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { moreNav, primaryNav } from "@/lib/content";
import { cn } from "@/lib/utils";

const links = [...primaryNav, ...moreNav];

export function Header() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/25 bg-sky text-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) =>
            item.to === "/quote" ? (
              <Link key={item.to} to={item.to} className={buttonClass("paper")} activeProps={{ "aria-current": "page" }}>
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="inline-flex min-h-11 items-center px-3 text-sm font-semibold"
                activeProps={{ "aria-current": "page" }}
              >
                {item.label}
              </Link>
            ),
          )}
          <details className="relative">
            <summary className="inline-flex min-h-11 items-center px-3 text-sm font-semibold">More</summary>
            <div className="absolute right-0 z-50 mt-1 min-w-48 border border-line bg-paper p-2 text-ink shadow-sm">
              {moreNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex min-h-11 items-center px-3 text-sm font-semibold hover:bg-foam"
                  activeProps={{ "aria-current": "page" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </nav>
        <button
          ref={buttonRef}
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      {open ? (
        <div id={panelId} ref={panelRef} className="menu-panel border-t border-line bg-paper text-ink md:hidden">
          <nav aria-label="Mobile" className="mx-auto grid max-w-6xl px-2 py-2">
            {links.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-h-11 items-center px-3 text-base font-semibold",
                  item.to === "/quote" && "bg-navy text-paper",
                )}
                activeProps={{ "aria-current": "page" }}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
