import { cn } from "@/lib/utils";

export function Seal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("size-12", className)} aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M22 33.5 29 40.5 43 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
