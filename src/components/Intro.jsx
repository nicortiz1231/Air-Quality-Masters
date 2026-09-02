export default function Intro() {
  return (
    <section className="intro section-shell" id="about">
      <div className="section-index" data-reveal>
        <span>01</span>
        <span>Air Quality Masters</span>
      </div>

      <div className="intro-headline">
        <h2 data-reveal>
          HVAC service should feel<br />
          <em>clear, capable and dependable.</em>
        </h2>
      </div>

      <div className="intro-grid">
        <div className="intro-copy" data-reveal>
          <p className="lead">
            Air Quality Masters provides residential and commercial HVAC service
            across South Florida, supporting the systems people rely on every day
            for comfort, airflow and indoor climate control.
          </p>
          <p>
            From repairs and maintenance to equipment installation and ventilation,
            the work begins by understanding what the system actually needs.
          </p>
        </div>

        <div className="intro-facts" data-reveal>
          <div>
            <span>Service Area</span>
            <strong>South Florida</strong>
          </div>
          <div>
            <span>Availability</span>
            <strong>24 / 7 Support</strong>
          </div>
          <div>
            <span>Property Types</span>
            <strong>Residential + Commercial</strong>
          </div>
        </div>
      </div>

      <div className="intro-transition" data-reveal>
        <div className="intro-transition-copy">
          <span>Airflow / Temperature / Humidity / Filtration</span>
          <strong>Comfort is the result of a system working as one.</strong>
        </div>
      </div>
    </section>
  );
}
