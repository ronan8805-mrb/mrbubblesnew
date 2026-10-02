import { useRef } from "react";
import { sectors, type SectorId } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SectorSwitcher({
  value,
  onChange,
  label = "Choose a sector",
}: {
  value: SectorId;
  onChange: (id: SectorId) => void;
  label?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
      {sectors.map((sector, index) => {
        const selected = sector.id === value;
        return (
          <button
            key={sector.id}
            ref={(node) => {
              refs.current[index] = node;
            }}
            id={`sector-tab-${sector.id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`sector-panel-${sector.id}`}
            tabIndex={selected ? 0 : -1}
            className={cn(
              "inline-flex min-h-11 items-center rounded-md px-4 text-sm font-semibold",
              selected ? "bg-navy text-paper" : "border border-line bg-paper text-ink",
            )}
            onClick={() => onChange(sector.id)}
            onKeyDown={(event) => {
              const last = sectors.length - 1;
              let next = index;
              if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index === last ? 0 : index + 1;
              else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index === 0 ? last : index - 1;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = last;
              else return;
              event.preventDefault();
              const id = sectors[next].id;
              onChange(id);
              refs.current[next]?.focus();
            }}
          >
            {sector.label}
          </button>
        );
      })}
    </div>
  );
}
