export function PageIntro({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-16">
        <p className="text-sm font-semibold">{eyebrow}</p>
        <h1 className="mt-2 max-w-3xl text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed">{lede}</p>
      </div>
    </header>
  );
}
