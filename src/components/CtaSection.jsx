import { Link } from "react-router-dom";
import { ArrowUpRight, Phone } from "lucide-react";
import { company } from "../data/company.js";

/** Closing call-to-action used at the foot of every content page. */
export default function CtaSection({
  title = "Need someone out?",
  copy = "Tell us what the system is doing and we'll get you scheduled. If it's an outage, calling is the fastest route.",
  service,
}) {
  return (
    <section className="cta-band">
      <div className="section-shell cta-band-inner">
        <div data-reveal>
          <h2>{title}</h2>
          <p>{copy}</p>
        </div>
        <div className="cta-band-actions" data-reveal>
          <a className="button button-primary" href={company.phone.href}>
            <Phone size={16} aria-hidden="true" />
            <span>{company.phone.display}</span>
          </a>
          <Link
            className="button button-ghost-light"
            to={service ? `/contact?service=${encodeURIComponent(service)}` : "/contact"}
          >
            <span>Request service online</span>
            <i aria-hidden="true"><ArrowUpRight size={16} /></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
