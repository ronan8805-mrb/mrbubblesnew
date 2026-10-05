import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";
import { Button, ButtonAnchor } from "@/components/ui/button";
import {
  briefLines,
  briefText,
  frequencies,
  isBriefComplete,
  mailtoHref,
  modes,
  stepProblem,
  validateBrief,
  volumeLabel,
  type Frequency,
  type LinenMode,
  type VolumeBand,
} from "@/lib/brief";
import { CONTACT_EMAIL, COUNTIES, PHONE_DISPLAY, PHONE_TEL, sectorById, sectors, type SectorId } from "@/lib/content";
import { useQuoteStore } from "@/lib/quote-store";
import { cn } from "@/lib/utils";

const steps = [
  { id: "sector", label: "Sector" },
  { id: "linen", label: "Linen" },
  { id: "volume", label: "Volume" },
  { id: "frequency", label: "Frequency" },
  { id: "county", label: "County" },
  { id: "contact", label: "Contact" },
] as const;

const bands: VolumeBand[] = ["s", "m", "l", "xl"];

function Choice<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T | null;
  options: { value: T; label: string; detail?: string }[];
  onChange: (value: T) => void;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div role="radiogroup" aria-label={label} className="grid gap-2">
      {options.map((option, index) => {
        const selected = value === option.value;
        const tabbable = selected || (value == null && index === 0);
        return (
          <button
            key={option.value}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={tabbable ? 0 : -1}
            className={cn(
              "min-h-11 w-full rounded-md border px-4 py-3 text-left",
              selected ? "border-navy bg-foam" : "border-line bg-paper",
            )}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => {
              const last = options.length - 1;
              let next = index;
              if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index === last ? 0 : index + 1;
              else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = last;
              else return;
              event.preventDefault();
              onChange(options[next].value);
              refs.current[next]?.focus();
            }}
          >
            <span className="flex items-center justify-between gap-3 font-semibold">
              {option.label}
              {selected ? <Check className="size-4 shrink-0" aria-hidden="true" /> : null}
            </span>
            {option.detail ? <span className="mt-1 block text-sm font-normal text-muted">{option.detail}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

function BriefPanel() {
  const draft = useQuoteStore();
  const lines = briefLines(draft);
  const complete = isBriefComplete(draft);
  return (
    <aside className="on-navy bg-navy p-5 text-paper" aria-live="polite">
      <h2 className="text-xl font-bold">Collection brief</h2>
      {draft.status === "loading" ? (
        <p className="mt-3 text-sm">Sending the brief…</p>
      ) : complete ? (
        <p className="mt-3 text-sm">Ready to send. We’ll confirm the run and the rate.</p>
      ) : (
        <p className="mt-3 text-sm">Nothing to send yet. Add the linen, a volume, a county, and a contact.</p>
      )}
      <dl className="mt-4 grid gap-3">
        {lines.map((line) => (
          <div key={line.label}>
            <dt className="text-xs font-semibold tracking-wide uppercase">{line.label}</dt>
            <dd className="text-sm break-words">{line.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

function SuccessState() {
  const draft = useQuoteStore();
  const setStatus = useQuoteStore((state) => state.setStatus);
  const reset = useQuoteStore((state) => state.reset);
  const [copyState, setCopyState] = useState<"idle" | "done" | "error">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(briefText(draft));
      setCopyState("done");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <div className="bg-paper p-5 ring-1 ring-line" role="status">
      <h2 className="text-2xl font-bold">Brief saved on this device</h2>
      <p className="mt-3 leading-relaxed">
        We’ll confirm the run and the rate. If your email app did not open, send it from the button below, or call the
        depot.
      </p>
      <p className="mt-4">
        <a className="text-lg font-bold underline-offset-2 hover:underline" href={`tel:${PHONE_TEL}`}>
          {PHONE_DISPLAY}
        </a>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <ButtonAnchor href={mailtoHref(draft)}>Email this brief</ButtonAnchor>
        <Button type="button" tone="line" onClick={() => void copy()}>
          <Copy className="size-4" aria-hidden="true" />
          {copyState === "done" ? "Copied" : "Copy brief"}
        </Button>
        <Button type="button" tone="line" onClick={() => setStatus("editing")}>
          Edit the brief
        </Button>
        <Button type="button" tone="line" onClick={reset}>
          Start again
        </Button>
      </div>
      {copyState === "error" ? (
        <p className="mt-3 text-sm" role="alert">
          Copy did not work. Select the brief and copy it yourself.
        </p>
      ) : null}
      <pre className="mt-4 overflow-x-auto bg-foam p-4 text-sm leading-relaxed whitespace-pre-wrap">{briefText(draft)}</pre>
    </div>
  );
}

export function QuoteForm({ layout }: { layout: "steps" | "stack" }) {
  const draft = useQuoteStore();
  const hydrated = draft.hydrated;
  const request = useRef(0);

  if (!hydrated) {
    return (
      <p role="status" className="bg-paper p-5 text-muted ring-1 ring-line">
        Loading your brief…
      </p>
    );
  }

  if (draft.status === "success") {
    return (
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <SuccessState />
        <BriefPanel />
      </div>
    );
  }

  const fields = draft;
  const problem = draft.error;

  function patchEditing() {
    if (draft.status === "error") draft.setStatus("editing", "");
  }

  async function submit() {
    const issue = validateBrief(fields);
    if (issue) {
      draft.setStatus("error", issue);
      return;
    }
    const id = ++request.current;
    draft.setStatus("loading", "");
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    if (request.current !== id) return;
    try {
      const anchor = document.createElement("a");
      anchor.href = mailtoHref(useQuoteStore.getState());
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      useQuoteStore.getState().setStatus("success", "");
    } catch {
      useQuoteStore.getState().setStatus("error", "The brief stayed on this device. Use the email button to send it.");
    }
  }

  function next() {
    const issue = stepProblem(draft.step, fields);
    if (issue) {
      draft.setStatus("error", issue);
      return;
    }
    draft.setStatus("editing", "");
    draft.setStep(Math.min(steps.length - 1, draft.step + 1));
  }

  function go(index: number) {
    if (index <= draft.step) {
      draft.setStep(index);
      return;
    }
    for (let cursor = draft.step; cursor < index; cursor += 1) {
      const issue = stepProblem(cursor, fields);
      if (issue) {
        draft.setStatus("error", issue);
        draft.setStep(cursor);
        return;
      }
    }
    draft.setStatus("editing", "");
    draft.setStep(index);
  }

  const show = (index: number) => layout === "stack" || draft.step === index;

  return (
    <form
      className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]"
      noValidate
      aria-busy={draft.status === "loading"}
      onSubmit={(event) => {
        event.preventDefault();
        if (layout === "steps" && draft.step < steps.length - 1) {
          next();
          return;
        }
        void submit();
      }}
    >
      <div className="grid gap-6">
        {layout === "steps" ? (
          <ol aria-label="Quote steps" className="flex flex-wrap gap-2">
            {steps.map((step, index) => {
              const current = index === draft.step;
              return (
                <li key={step.id}>
                  <button
                    type="button"
                    aria-current={current ? "step" : undefined}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold",
                      current ? "bg-navy text-paper" : "bg-paper text-ink ring-1 ring-line",
                    )}
                    onClick={() => go(index)}
                  >
                    {index + 1}. {step.label}
                  </button>
                </li>
              );
            })}
          </ol>
        ) : null}

        {problem ? (
          <p role="alert" className="bg-paper p-4 text-sm font-semibold ring-1 ring-navy">
            {problem}
          </p>
        ) : null}

        {draft.status === "loading" ? (
          <p role="status" className="text-sm font-semibold text-muted">
            Sending the brief…
          </p>
        ) : null}

        {show(0) ? (
          <fieldset className="grid gap-3">
            <legend className="text-2xl font-bold">Which sector is the linen for?</legend>
            <Choice<SectorId>
              label="Sector"
              value={draft.sector}
              options={sectors.map((sector) => ({
                value: sector.id,
                label: sector.label,
                detail: sector.items.join(", "),
              }))}
              onChange={(sector) => {
                patchEditing();
                draft.setSector(sector);
              }}
            />
          </fieldset>
        ) : null}

        {show(1) ? (
          <fieldset className="grid gap-3">
            <legend className="text-2xl font-bold">Own linen or rental?</legend>
            <Choice<LinenMode> label="Linen" value={draft.mode} options={modes} onChange={draft.setMode} />
          </fieldset>
        ) : null}

        {show(2) ? (
          <fieldset className="grid gap-3">
            <legend className="text-2xl font-bold">Rough weekly volume</legend>
            <p className="text-sm text-muted">Bands only. We confirm the rate. No price is shown here.</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Volume unit">
              {(["kg", "items"] as const).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  aria-pressed={draft.unit === unit}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-md px-4 text-sm font-semibold",
                    draft.unit === unit ? "bg-navy text-paper" : "bg-paper text-ink ring-1 ring-line",
                  )}
                  onClick={() => draft.setUnit(unit)}
                >
                  {unit === "kg" ? "Kilograms" : "Items"}
                </button>
              ))}
            </div>
            <Choice<VolumeBand>
              label="Weekly volume"
              value={draft.volume}
              options={bands.map((band) => ({
                value: band,
                label: volumeLabel(draft.unit, band),
              }))}
              onChange={draft.setVolume}
            />
          </fieldset>
        ) : null}

        {show(3) ? (
          <fieldset className="grid gap-3">
            <legend className="text-2xl font-bold">How often should we collect?</legend>
            <Choice<Frequency>
              label="Collection frequency"
              value={draft.frequency}
              options={frequencies}
              onChange={draft.setFrequency}
            />
          </fieldset>
        ) : null}

        {show(4) ? (
          <fieldset className="grid gap-3">
            <legend className="text-2xl font-bold">Which county is the site in?</legend>
            <label className="grid gap-2 text-sm font-semibold" htmlFor="brief-county">
              County
              <select
                id="brief-county"
                className="h-11 w-full rounded-md border border-line bg-paper px-3 font-normal text-ink"
                value={draft.county}
                autoComplete="address-level1"
                onChange={(event) => draft.setCounty(event.target.value)}
              >
                <option value="">Choose a county</option>
                {COUNTIES.map((county) => (
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>
        ) : null}

        {show(5) ? (
          <fieldset className="grid gap-4">
            <legend className="text-2xl font-bold">Who should we call?</legend>
            <p className="text-sm text-muted">
              The brief is emailed to {CONTACT_EMAIL}. It also stays on this device if you refresh the page.
            </p>
            <label className="grid gap-2 text-sm font-semibold" htmlFor="brief-name">
              Name
              <input
                id="brief-name"
                className="h-11 rounded-md border border-line bg-paper px-3 font-normal"
                autoComplete="name"
                value={draft.name}
                onChange={(event) => draft.setField("name", event.target.value)}
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold" htmlFor="brief-phone">
              Phone
              <input
                id="brief-phone"
                className="h-11 rounded-md border border-line bg-paper px-3 font-normal"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={draft.phone}
                onChange={(event) => draft.setField("phone", event.target.value)}
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold" htmlFor="brief-email">
              Email
              <input
                id="brief-email"
                className="h-11 rounded-md border border-line bg-paper px-3 font-normal"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={draft.email}
                onChange={(event) => draft.setField("email", event.target.value)}
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold" htmlFor="brief-note">
              Note
              <textarea
                id="brief-note"
                className="min-h-28 rounded-md border border-line bg-paper px-3 py-3 font-normal"
                value={draft.note}
                onChange={(event) => draft.setField("note", event.target.value)}
              />
            </label>
          </fieldset>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {layout === "steps" && draft.step > 0 ? (
            <Button type="button" tone="line" onClick={() => draft.setStep(draft.step - 1)}>
              Back
            </Button>
          ) : null}
          {layout === "steps" && draft.step < steps.length - 1 ? (
            <Button type="button" onClick={next}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={draft.status === "loading"}>
              {draft.status === "loading" ? "Sending…" : "Send the brief"}
            </Button>
          )}
        </div>
        <p className="text-sm text-muted">
          Current pack: {sectorById(draft.sector).label}. {sectorById(draft.sector).turnaround}
        </p>
      </div>
      <BriefPanel />
    </form>
  );
}
