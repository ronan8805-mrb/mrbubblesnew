import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

const FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-start justify-center gap-3 px-4 py-16">
      <TriangleAlert className="size-10 text-navy" aria-hidden="true" />
      <h1 className="font-display text-3xl font-bold text-ink">Something went wrong</h1>
      <p className="text-sm break-words text-muted">{errorMessage(error)}</p>
      <a className="inline-flex min-h-11 items-center font-semibold text-brand" href="/">
        Back to the home page
      </a>
    </main>
  );
}
