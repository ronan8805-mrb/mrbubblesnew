const certificates = [
  {
    standard: "I.S. EN ISO 9001:2015",
    system: "Quality management system",
    nsai: "19.7625",
    iqnet: "IE-19,7625",
    nsaiPdf: "/certificates/nsai-iso-9001.pdf",
    iqnetPdf: "/certificates/iqnet-iso-9001.pdf",
  },
  {
    standard: "I.S. ISO 45001:2018",
    system: "Occupational health and safety management system",
    nsai: "45.1101",
    iqnet: "IE-45.1101",
    nsaiPdf: "/certificates/nsai-iso-45001.pdf",
    iqnetPdf: "/certificates/iqnet-iso-45001.pdf",
  },
] as const;

export function Certifications() {
  return (
    <section className="bg-paper p-6 ring-1 ring-line" aria-labelledby="certs-heading">
      <h2 id="certs-heading" className="text-3xl font-bold">
        Certifications
      </h2>
      <p className="mt-3 max-w-3xl leading-relaxed">
        NSAI has certified Mr Bubbles Express Ltd, trading as Mr Bubbles, at Unit 5C Aston Village, Drogheda, Co. Louth.
        The scope on both certificates is the provision of laundry services to residential and commercial sectors.
      </p>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {certificates.map((item) => (
          <li key={item.nsai} className="border border-line p-5">
            <p className="text-sm font-bold tracking-wide text-brand uppercase">NSAI certified</p>
            <h3 className="mt-2 text-2xl font-bold">{item.standard}</h3>
            <p className="mt-2 leading-relaxed">{item.system}</p>
            <dl className="mt-4 grid gap-2 text-sm">
              <div className="flex justify-between gap-4 border-b border-line py-2">
                <dt>NSAI registration</dt>
                <dd className="font-semibold">{item.nsai}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-line py-2">
                <dt>IQNet registration</dt>
                <dd className="font-semibold">{item.iqnet}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-line py-2">
                <dt>Issued</dt>
                <dd className="font-semibold">18 December 2025</dd>
              </div>
              <div className="flex justify-between gap-4 py-2">
                <dt>Valid to</dt>
                <dd className="font-semibold">17 December 2028</dd>
              </div>
            </dl>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
              <a className="inline-flex min-h-11 items-center underline-offset-2 hover:underline" href={item.nsaiPdf}>
                NSAI certificate (PDF)
              </a>
              <a className="inline-flex min-h-11 items-center underline-offset-2 hover:underline" href={item.iqnetPdf}>
                IQNet attestation (PDF)
              </a>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        The IQNet attestation is linked to the NSAI certificate. It is not a stand-alone document. First issued 18
        December 2025.
      </p>
    </section>
  );
}
