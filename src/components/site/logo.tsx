import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ tone = "paper" }: { tone?: "paper" | "navy" }) {
  return (
    <Link to="/" className={cn("flex min-h-11 items-center gap-2", tone === "paper" ? "text-paper" : "text-navy")}>
      <svg viewBox="0 0 48 32" className="h-8 w-12 shrink-0" aria-hidden="true">
        <circle cx="14" cy="18" r="9" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="26" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="36" cy="11" r="5.5" fill="currentColor" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-sm font-bold tracking-tight">MR. BUBBLES</span>
        <span className="mt-0.5 block text-xs font-semibold leading-tight tracking-wide">
          <span className="sm:hidden">LAUNDRY & LINEN</span>
          <span className="hidden sm:inline">LAUNDRY & LINEN SPECIALIST</span>
        </span>
      </span>
      <span className="sr-only">Home</span>
    </Link>
  );
}
