const steps = [
  ["01", "Listen", "Start with what the customer is experiencing and what changed."],
  ["02", "Inspect", "Evaluate system condition, airflow and operating behavior."],
  ["03", "Explain", "Make the findings and available options understandable."],
  ["04", "Resolve", "Complete the appropriate repair, service or installation."],
  ["05", "Verify", "Confirm system operation before the work is considered finished."]
];

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="process-visual" aria-hidden="true">
        <div className="process-image" />
        <div className="process-shade" />
      </div>

      <div className="section-shell process-shell">
        <div className="section-index light" data-reveal>
          <span>03</span>
          <span>How we work</span>
        </div>

        <div className="process-title">
          <h2 data-reveal>
            From the first symptom<br />
            <em>to a working system.</em>
          </h2>
        </div>

        <div className="process-steps">
          {steps.map(([n, title, copy]) => (
            <article key={n} data-reveal>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
