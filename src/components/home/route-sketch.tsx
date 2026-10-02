import { Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const stops = [
  { title: "Drogheda depot", detail: "Greenlanes" },
  { title: "Hotel", detail: "Sheets and towels" },
  { title: "Clinic", detail: "Patient linen" },
  { title: "Salon", detail: "Towels and robes" },
];

const marks = [0.08, 0.36, 0.64, 0.92];

export function RouteSketch() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (media.matches) {
        setProgress(1);
        return;
      }
      const rect = node.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const next = (view * 0.92 - rect.top) / (view * 0.5);
      setProgress(Math.min(1, Math.max(0, next)));
    };
    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
    media.addEventListener("change", apply);
    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
      media.removeEventListener("change", apply);
    };
  }, []);

  return (
    <section ref={ref} className="on-navy bg-brand-deep text-paper" aria-labelledby="route-title">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-sm font-semibold">Sample route</p>
        <h2 id="route-title" className="mt-2 max-w-2xl text-3xl font-bold md:text-4xl">
          Depot, then a hotel, a clinic, and a salon.
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed">
          The line draws on as you scroll. It is a sketch of a morning run from Drogheda, not a live van.
        </p>
        <div className="relative mt-10">
          <div
            className="pointer-events-none absolute top-2 bottom-2 left-1.5 w-0.5 bg-paper/30 md:top-1.5 md:bottom-auto md:left-[10%] md:h-0.5 md:w-4/5"
            aria-hidden="true"
          >
            <span className="absolute inset-x-0 top-0 bg-paper md:hidden" style={{ height: `${progress * 100}%` }} />
            <span className="absolute inset-y-0 left-0 hidden bg-paper md:block" style={{ width: `${progress * 100}%` }} />
          </div>
          <span
            className="absolute left-0 z-10 flex size-9 -translate-x-1/4 items-center justify-center rounded-full bg-paper text-navy md:hidden"
            style={{ top: `calc(${progress} * (100% - 2.25rem))` }}
            aria-hidden="true"
          >
            <Truck className="size-4" />
          </span>
          <span
            className="absolute top-0 z-10 hidden size-9 -translate-x-1/2 -translate-y-1/3 items-center justify-center rounded-full bg-paper text-navy md:flex"
            style={{ left: `calc(10% + ${progress} * 70%)` }}
            aria-hidden="true"
          >
            <Truck className="size-4" />
          </span>
          <ol className="grid gap-6 md:grid-cols-4 md:gap-4">
            {stops.map((stop, index) => {
              const lit = progress >= marks[index];
              return (
                <li key={stop.title} className="relative pl-10 md:pt-10 md:pl-0 md:text-center">
                  <span
                    className={cn(
                      "absolute top-1 left-0 size-4 rounded-full border-2 border-paper md:top-0 md:left-1/2 md:-translate-x-1/2",
                      lit ? "bg-paper" : "bg-brand-deep",
                    )}
                    aria-hidden="true"
                  />
                  <p className="font-display text-lg font-bold">{stop.title}</p>
                  <p className="text-sm">{stop.detail}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
