const steps = [
  ["01", "Diagnose", "We identify the source of the issue before recommending a fix."],
  ["02", "Explain", "You get a clear plan, transparent next steps and no unnecessary mystery."],
  ["03", "Execute", "Repair or installation is completed with care for the equipment and property."],
  ["04", "Verify", "We test performance and leave the system ready for reliable operation."]
];

export default function Process() {
  return (
    <section className="section process-section">
      <div className="section-label">
        <span>02</span>
        <span>Our approach</span>
      </div>

      <div className="process-heading">
        <h2>Technical service.<br />Human experience.</h2>
      </div>

      <div className="process-grid">
        {steps.map(([number, title, copy]) => (
          <article className="process-card" key={number}>
            <span>{number}</span>
            <div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
