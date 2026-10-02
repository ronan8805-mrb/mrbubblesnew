const bubbles = [
  { left: "6%", size: 18, delay: "-2s", duration: "15s" },
  { left: "14%", size: 34, delay: "-8s", duration: "18s" },
  { left: "24%", size: 12, delay: "-5s", duration: "12s" },
  { left: "33%", size: 26, delay: "-11s", duration: "20s" },
  { left: "44%", size: 16, delay: "-3s", duration: "14s" },
  { left: "53%", size: 42, delay: "-9s", duration: "22s" },
  { left: "64%", size: 14, delay: "-6s", duration: "13s" },
  { left: "72%", size: 28, delay: "-1s", duration: "17s" },
  { left: "81%", size: 20, delay: "-7s", duration: "16s" },
  { left: "90%", size: 13, delay: "-4s", duration: "11s" },
  { left: "96%", size: 32, delay: "-10s", duration: "19s" },
  { left: "48%", size: 10, delay: "-12s", duration: "12s" },
];

export function BubbleField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {bubbles.map((bubble) => (
        <span
          key={`${bubble.left}-${bubble.delay}`}
          className="bubble"
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            animationDelay: bubble.delay,
            animationDuration: bubble.duration,
          }}
        />
      ))}
    </div>
  );
}
