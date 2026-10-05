const items = [
  "Hilton",
  "HSE & Tusla approved centres",
  "Hotels & guesthouses",
  "Hair salons & beauty studios",
  "Restaurants & catering chains",
  "Construction & maintenance uniforms",
  "Private healthcare facilities",
  "ISO 9001 · NSAI 19.7625",
  "ISO 45001 · NSAI 45.1101",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="ticker-copy" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span key={item} className="inline-flex items-center gap-6">
          <span>{item}</span>
          <span aria-hidden="true">●</span>
        </span>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="ticker border-y border-white/30 bg-navy text-paper" role="region" aria-label="Who the work is for">
      <div className="ticker-track py-3 text-sm font-semibold tracking-wide">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
