import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SAMPLE = "MB-10482";

const steps = [
  {
    title: "Collected",
    time: "06:40",
    place: "Greenlanes",
    detail: "Driver scanned the bag at the door.",
  },
  {
    title: "In plant",
    time: "07:15",
    place: "Unit 105, An Tsean Mhargadh",
    detail: "Bag checked in at the depot.",
  },
  {
    title: "Washed",
    time: "08:05",
    place: "Wash floor",
    detail: "Load washed to the sector standard.",
  },
  {
    title: "Finished",
    time: "10:20",
    place: "Packing",
    detail: "Pressed, folded, and packed.",
  },
  {
    title: "Out for delivery",
    time: "13:40",
    place: "Van run",
    detail: "Scanned onto the return van.",
  },
  {
    title: "Delivered",
    time: "15:10",
    place: "Customer door",
    detail: "Scanned back to the site.",
  },
] as const;

type Lookup = "empty" | "loading" | "error" | "ready";

export function TraceDemo() {
  const [code, setCode] = useState("");
  const [lookup, setLookup] = useState<Lookup>("empty");
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState("");
  const request = useRef(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const listId = useId();
  const inputId = useId();

  useEffect(() => {
    if (!playing || lookup !== "ready") return;
    if (active >= steps.length - 1) {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => setActive((value) => Math.min(steps.length - 1, value + 1)), 900);
    return () => window.clearTimeout(timer);
  }, [playing, active, lookup]);

  function runLookup(raw: string) {
    const next = raw.trim().toUpperCase();
    const id = ++request.current;
    if (!next) {
      setLookup("empty");
      setMessage("");
      setPlaying(false);
      return;
    }
    setLookup("loading");
    setMessage("");
    setPlaying(false);
    window.setTimeout(() => {
      if (request.current !== id) return;
      if (next === SAMPLE) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setCode(SAMPLE);
        setLookup("ready");
        setActive(reduce ? steps.length - 1 : 0);
        setPlaying(!reduce);
        return;
      }
      setLookup("error");
      setPlaying(false);
      setMessage("No sample bag matches that code. Try MB-10482.");
    }, 450);
  }

  function select(index: number) {
    setPlaying(false);
    setActive(index);
    tabs.current[index]?.focus();
  }

  const current = steps[active];

  return (
    <div className="grid gap-6">
      <form
        className="grid gap-3 bg-paper p-4 ring-1 ring-line sm:grid-cols-[minmax(0,1fr)_auto]"
        aria-busy={lookup === "loading"}
        onSubmit={(event) => {
          event.preventDefault();
          runLookup(code);
        }}
      >
        <div className="grid gap-2">
          <label className="text-sm font-semibold" htmlFor={inputId}>
            Sample bag code
          </label>
          <input
            id={inputId}
            className="h-11 rounded-md border border-line bg-mist px-3 font-semibold tracking-wide uppercase"
            value={code}
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
            placeholder="MB-10482"
            onChange={(event) => setCode(event.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <Button type="submit" disabled={lookup === "loading"}>
            {lookup === "loading" ? "Checking…" : "Look up"}
          </Button>
          <Button type="button" tone="line" onClick={() => runLookup(SAMPLE)}>
            Use {SAMPLE}
          </Button>
        </div>
        <p className="text-sm text-muted sm:col-span-2">
          Sample trace only. This is not a login, and it is not a live bag.
        </p>
        {lookup === "loading" ? (
          <p role="status" className="text-sm font-semibold sm:col-span-2">
            Checking the sample trace…
          </p>
        ) : null}
        {lookup === "empty" ? (
          <p className="text-sm sm:col-span-2">Enter a sample code to see a bag move.</p>
        ) : null}
        {lookup === "error" ? (
          <p role="alert" className="text-sm font-semibold sm:col-span-2">
            {message}
          </p>
        ) : null}
      </form>

      <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <div className="mx-auto w-full max-w-xs rounded-[2rem] bg-navy p-3 text-paper" aria-hidden="true">
          <div className="rounded-[1.4rem] bg-brand-deep p-4">
            <p className="text-xs font-semibold tracking-wide uppercase">Driver app · sample</p>
            <p className="mt-4 font-display text-2xl font-bold">{lookup === "ready" ? SAMPLE : "No bag"}</p>
            {lookup === "loading" ? <p className="mt-3 text-sm">Checking the sample trace…</p> : null}
            {lookup === "empty" ? <p className="mt-3 text-sm">Waiting for a code.</p> : null}
            {lookup === "error" ? <p className="mt-3 text-sm">Code not on the sample trace.</p> : null}
            {lookup === "ready" ? (
              <div className="mt-4 grid gap-1">
                <p className="text-lg font-bold">{current.title}</p>
                <p className="text-sm">
                  {current.time} · {current.place}
                </p>
                <p className="text-sm">{current.detail}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="bg-paper p-4 ring-1 ring-line">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Desk log</h2>
            {lookup === "ready" ? (
              <Button type="button" tone="line" onClick={() => setPlaying((value) => !value)} aria-pressed={playing}>
                {playing ? "Pause" : "Play"}
              </Button>
            ) : null}
          </div>
          {lookup !== "ready" ? (
            <p className="mt-4 text-sm text-muted">
              {lookup === "loading"
                ? "Checking the sample trace…"
                : lookup === "error"
                  ? "No rows. The code is not on the sample trace."
                  : "No bag on the desk yet."}
            </p>
          ) : (
            <div
              id={listId}
              role="tablist"
              aria-label="Sample bag trace"
              aria-orientation="vertical"
              className="mt-4 grid"
              onKeyDown={(event) => {
                let next = active;
                if (event.key === "ArrowDown" || event.key === "ArrowRight") next = Math.min(steps.length - 1, active + 1);
                else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = Math.max(0, active - 1);
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = steps.length - 1;
                else return;
                event.preventDefault();
                select(next);
              }}
            >
              {steps.map((step, index) => {
                const selected = index === active;
                const seen = index <= active;
                return (
                  <button
                    key={step.title}
                    ref={(node) => {
                      tabs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    tabIndex={selected ? 0 : -1}
                    className={cn(
                      "grid min-h-11 grid-cols-1 gap-1 border-b border-line py-3 text-left sm:grid-cols-[5rem_9rem_minmax(0,1fr)]",
                      selected ? "bg-foam" : "bg-paper",
                      seen ? "text-ink" : "text-muted",
                    )}
                    onClick={() => select(index)}
                  >
                    <span className="font-semibold">{step.time}</span>
                    <span className="font-semibold">{step.title}</span>
                    <span className="text-sm">{step.place}</span>
                  </button>
                );
              })}
            </div>
          )}
          {lookup === "ready" ? (
            <p className="mt-4 text-sm leading-relaxed" role="tabpanel">
              {current.time} {current.title}. {current.detail} {current.place}.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
