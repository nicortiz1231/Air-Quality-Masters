export default function Statement() {
  return (
    <section className="statement-section" id="about">
      <div className="statement-grid">
        <div className="statement-kicker">
          <span>Built for South Florida</span>
        </div>

        <p className="statement-copy">
          Your HVAC system should disappear into the background of your life —
          quiet, dependable and always doing its job. We bring the technical
          discipline needed to make that happen.
        </p>
      </div>

      <div className="proof-grid">
        <div className="proof-card proof-card-large">
          <span className="proof-index">A</span>
          <div>
            <strong>24/7</strong>
            <p>Emergency support when comfort cannot wait.</p>
          </div>
        </div>

        <div className="proof-card">
          <span className="proof-index">B</span>
          <div>
            <strong>25+</strong>
            <p>Years of company experience shown on the current brand site.</p>
          </div>
        </div>

        <div className="proof-card">
          <span className="proof-index">C</span>
          <div>
            <strong>FL</strong>
            <p>Local service centered on South Florida properties.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
