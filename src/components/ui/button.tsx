import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const tones = {
  navy: "bg-navy text-paper hover:bg-brand-deep",
  paper: "bg-paper text-navy hover:bg-foam",
  line: "border border-line bg-paper text-ink hover:bg-foam",
  ghost: "border border-paper text-paper hover:bg-paper/15",
} as const;

export type Tone = keyof typeof tones;

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-center text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

export function buttonClass(tone: Tone = "navy", className?: string) {
  return cn(base, tones[tone], className);
}

export function Button({
  tone = "navy",
  className,
  ...props
}: ComponentProps<"button"> & { tone?: Tone }) {
  return <button className={buttonClass(tone, className)} {...props} />;
}

export function ButtonLink({
  tone = "navy",
  className,
  ...props
}: ComponentProps<typeof Link> & { tone?: Tone }) {
  return <Link className={buttonClass(tone, className)} {...props} />;
}

export function ButtonAnchor({
  tone = "navy",
  className,
  ...props
}: ComponentProps<"a"> & { tone?: Tone }) {
  return <a className={buttonClass(tone, className)} {...props} />;
}
