export default function Precision() {
  return (
    <section className="precision-section">
      <div className="precision-bg" />
      <div className="precision-overlay" />
      <div className="airflow-streak" aria-hidden="true" />

      <div className="precision-shell">
        <div className="section-kicker light" data-reveal>
          <span>03</span>
          <span>Performance</span>
        </div>

        <div className="precision-copy">
          <h2 data-reveal>Comfort is the result of a system working as one.</h2>

          <p data-reveal>
            Airflow, temperature, filtration, drainage and equipment performance
            all affect the experience inside a property. AQM approaches HVAC as
            a complete system—not a collection of disconnected parts.
          </p>
        </div>

        <div className="precision-points">
          <div data-reveal>
            <span>01</span>
            <strong>Diagnose</strong>
            <p>Identify the cause before recommending the solution.</p>
          </div>
          <div data-reveal>
            <span>02</span>
            <strong>Resolve</strong>
            <p>Complete the work with care for equipment and property.</p>
          </div>
          <div data-reveal>
            <span>03</span>
            <strong>Verify</strong>
            <p>Confirm system operation before the job is considered finished.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
