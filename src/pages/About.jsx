import { Link } from "react-router-dom";
import { BadgeCheck, ExternalLink } from "lucide-react";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import CtaSection from "../components/CtaSection.jsx";
import TrustBadges from "../components/TrustBadges.jsx";
import { company, fullAddress, yearsInBusiness } from "../data/company.js";

const standards = [
  ["01", "Arrive prepared", "On time, with the parts and instruments the call is likely to need. Your time is part of the cost of the job."],
  ["02", "Diagnose first", "Measure the system before proposing anything. A recommendation made without readings is a guess being sold as expertise."],
  ["03", "Explain clearly", "You should be able to repeat back what's wrong and why the fix makes sense. If you can't, we haven't explained it properly."],
  ["04", "Quote before working", "The price is agreed before the work starts. No open-ended jobs, no numbers that move once the panel is off."],
  ["05", "Work cleanly", "Drop cloths, shoe covers, debris removed. The property should look untouched apart from the thing that now works."],
  ["06", "Verify results", "Test under load, record the readings, and only then call it finished."],
];

export default function About() {
  const hasCredentials = company.license.number || company.insured || company.warranty;

  return (
    <>
      <Seo
        title="About"
        description={`${company.name} is an HVAC contractor based in ${company.address.city}, Florida, serving residential and commercial properties across Broward, Miami-Dade and Palm Beach counties.`}
        path="/about"
      />

      <PageHero
        eyebrow="About"
        title={<>A contractor you can<br /><em>actually check on.</em></>}
        lede={`${company.name} is an HVAC contractor based in ${company.address.city}, Florida. We service, repair and install cooling systems for homes and commercial properties across South Florida.`}
        crumbs={[{ label: "About" }]}
      />

      <section className="section-shell about-statement">
        <div className="about-statement-grid">
          <div className="section-index" data-reveal>
            <span>01</span>
            <span>Who we are</span>
          </div>
          <div className="about-statement-copy" data-reveal>
            <p className="lead">
              Hiring an HVAC contractor means giving a stranger access to your property and
              then trusting their account of what's wrong with a system you can't inspect
              yourself. That asymmetry is the entire reason this trade has a reputation
              problem.
            </p>
            <p>
              Our answer to it is simple and slightly boring: measure everything, show the
              readings, explain the cause in language that doesn't require a trade
              background, and put the price in front of you before anyone picks up a tool.
              You should never be in a position where the only reason to believe a
              recommendation is that we made it.
            </p>
            <p>
              Everything factual on this site — our address, our licensing, the areas we
              cover — is meant to be verifiable. If a claim can't be checked, it doesn't
              belong on a page that's asking for your trust.
            </p>
          </div>
        </div>
      </section>

      {/* ── Credentials ──────────────────────────────────────────────── */}
      <section className="credentials">
        <div className="section-shell">
          <div className="section-index light" data-reveal>
            <span>02</span>
            <span>Credentials</span>
          </div>

          <h2 data-reveal>Licensing, insurance and coverage.</h2>

          <div className="credentials-grid">
            <div className="credential-block" data-reveal>
              <span className="footer-label">Business address</span>
              <p>{fullAddress}</p>
              <a href={company.address.mapsUrl} target="_blank" rel="noreferrer">
                View on Google Maps <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>

            {company.license.number ? (
              <div className="credential-block" data-reveal>
                <span className="footer-label">State licence</span>
                <p className="credential-strong">
                  <BadgeCheck size={17} aria-hidden="true" /> {company.license.number}
                </p>
                {company.license.type && <p className="credential-sub">{company.license.type}</p>}
                <a href={company.license.verifyUrl} target="_blank" rel="noreferrer">
                  Verify with the State of Florida <ExternalLink size={13} aria-hidden="true" />
                </a>
              </div>
            ) : (
              <div className="credential-block" data-reveal>
                <span className="footer-label">State licence</span>
                <p>
                  Ask for our licence number when you call, and verify it yourself — Florida
                  contractor licences are public record.
                </p>
                <a href={company.license.verifyUrl} target="_blank" rel="noreferrer">
                  Search the Florida licence database <ExternalLink size={13} aria-hidden="true" />
                </a>
              </div>
            )}

            {company.insured && (
              <div className="credential-block" data-reveal>
                <span className="footer-label">Insurance</span>
                <p className="credential-strong">
                  {company.bonded ? "Licensed, bonded and insured" : "Licensed and insured"}
                </p>
                <p className="credential-sub">
                  A certificate of insurance is available on request, and can be sent
                  directly to a property manager or association where required.
                </p>
              </div>
            )}

            {company.warranty && (
              <div className="credential-block" data-reveal>
                <span className="footer-label">Warranty</span>
                <p className="credential-strong">{company.warranty.labor} on labour</p>
                <p className="credential-sub">{company.warranty.parts}</p>
              </div>
            )}

            {yearsInBusiness && (
              <div className="credential-block" data-reveal>
                <span className="footer-label">Operating since</span>
                <p className="credential-strong">{company.foundedYear}</p>
                <p className="credential-sub">{yearsInBusiness} years serving South Florida.</p>
              </div>
            )}

            <div className="credential-block" data-reveal>
              <span className="footer-label">Coverage</span>
              <p>Broward, Miami-Dade and Palm Beach counties.</p>
              <Link to="/service-areas">See the full area list →</Link>
            </div>
          </div>

          {!hasCredentials && (
            <p className="credentials-note" data-reveal>
              We publish credentials rather than badges. Anything listed here can be checked
              against a public record — call the office for anything you don't see.
            </p>
          )}
        </div>
      </section>

      {/* ── Standards ────────────────────────────────────────────────── */}
      <section className="section-shell standards-section">
        <div className="section-index" data-reveal>
          <span>03</span>
          <span>The {company.shortName} standard</span>
        </div>

        <div className="standards-top">
          <h2 data-reveal>Trust is built in the details.</h2>
          <p data-reveal>
            Six things that apply to every call, residential or commercial, whether it's a
            twenty-minute capacitor swap or a full system replacement.
          </p>
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

      <div className="section-shell badges-strip badges-strip-spaced">
        <TrustBadges />
      </div>

      <CtaSection
        title="Have a question before you book?"
        copy="Call the office. You'll get someone who can answer it rather than a script."
      />
    </>
  );
}
