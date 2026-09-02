import { ArrowUpRight, Phone } from "lucide-react";

export default function ServiceRequest() {
  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = "https://aqmasters.com/contact-us";
  };

  return (
    <section className="request" id="request">
      <div className="section-shell request-shell">
        <div className="section-index light" data-reveal>
          <span>05</span>
          <span>Request Service</span>
        </div>

        <div className="request-grid">
          <div className="request-intro">
            <h2 data-reveal>
              Tell us what<br />
              <em>you need.</em>
            </h2>
            <p data-reveal>
              Start a residential or commercial service request. Until the new
              site is connected directly to AQM’s production CRM, submitting here
              continues to the company’s current appointment page.
            </p>

            <a className="request-phone" href="tel:+17863079286">
              <Phone size={17} />
              786-307-9286
            </a>
          </div>

          <form className="request-form" onSubmit={handleSubmit} data-reveal>
            <label>
              <span>Full name *</span>
              <input name="name" type="text" required placeholder="Your name" />
            </label>

            <div className="form-two">
              <label>
                <span>Phone *</span>
                <input name="phone" type="tel" required placeholder="(000) 000-0000" />
              </label>
              <label>
                <span>Email *</span>
                <input name="email" type="email" required placeholder="name@email.com" />
              </label>
            </div>

            <label>
              <span>Service needed</span>
              <select name="service" defaultValue="">
                <option value="" disabled>Select a service</option>
                <option>Residential HVAC Services</option>
                <option>Commercial HVAC Solutions</option>
                <option>Air Duct Cleaning & Ventilation</option>
                <option>Heating & Cooling Installation</option>
                <option>Not sure / Other</option>
              </select>
            </label>

            <label>
              <span>Tell us what’s happening</span>
              <textarea name="message" rows="4" placeholder="Describe the issue or service you need..." />
            </label>

            <button className="submit-button" type="submit">
              <span>Continue to appointment</span>
              <i><ArrowUpRight size={17} /></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
