const standards = [
  ["01", "Arrive prepared", "Respect the customer’s time and property."],
  ["02", "Diagnose first", "Solve the actual problem instead of guessing."],
  ["03", "Explain clearly", "Make the recommendation understandable."],
  ["04", "Work cleanly", "Professional service should look professional."],
  ["05", "Verify results", "Test the system before the job is closed."],
];

export default function Standards() {
  return (
    <section className="standards-section" id="standards">
      <div className="standards-top">
        <div className="section-kicker" data-reveal>
          <span>05</span>
          <span>The AQM Standard</span>
        </div>

        <h2 data-reveal>Trust is built in the details.</h2>
      </div>

      <div className="standards-list">
        {standards.map(([number, title, copy]) => (
          <article key={number} data-reveal>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
