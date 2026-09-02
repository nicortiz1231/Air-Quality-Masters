import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-noise" />

      <div className="contact-meta">
        <span>Ready when you are.</span>
        <span>Oakland Park, Florida</span>
      </div>

      <h2>
        Let’s make your
        <br />
        space feel right.
      </h2>

      <div className="contact-actions">
        <a className="contact-link" href="tel:+17863079286">
          <span>Call 786 307 9286</span>
          <ArrowUpRight />
        </a>

        <a className="contact-link" href="tel:+17863079286">
          <span>Request a quote</span>
          <ArrowUpRight />
        </a>
      </div>

      <footer className="footer">
        <div className="brand footer-brand">
          <span className="brand-mark">AQM</span>
          <span className="brand-copy">
            <strong>Air Quality</strong>
            <span>Masters</span>
          </span>
        </div>

        <div className="footer-address">
          3405 NW 44 ST Suite #106<br />
          Oakland Park, FL 33309
        </div>

        <div className="footer-small">
          © {new Date().getFullYear()} Air Quality Masters
        </div>
      </footer>
    </section>
  );
}
