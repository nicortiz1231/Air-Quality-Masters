import { BadgeCheck, Building2, Clock3, MapPin, Receipt, ShieldCheck } from "lucide-react";
import { company, yearsInBusiness } from "../data/company.js";

/**
 * Credential strip.
 *
 * Three badges are always true and always render. The rest appear only once
 * the underlying fact is verified in company.js — a badge we cannot back up
 * is worse than no badge, and an unverified claim is exactly what this site
 * exists not to make.
 */
export default function TrustBadges({ variant = "light" }) {
  const badges = [];

  if (company.license.number) {
    badges.push({
      Icon: BadgeCheck,
      title: `License ${company.license.number}`,
      copy: company.license.type || "Florida licensed contractor",
      href: company.license.verifyUrl,
      linkLabel: "Verify",
    });
  }

  if (company.insured) {
    badges.push({
      Icon: ShieldCheck,
      title: company.bonded ? "Licensed, bonded & insured" : "Licensed & insured",
      copy: "Certificate available on request",
    });
  }

  if (yearsInBusiness) {
    badges.push({
      Icon: Clock3,
      title: `${yearsInBusiness} years in business`,
      copy: `Serving South Florida since ${company.foundedYear}`,
    });
  }

  badges.push(
    {
      Icon: MapPin,
      title: `${company.address.city}, Florida`,
      copy: "Broward, Miami-Dade & Palm Beach",
    },
    {
      Icon: Building2,
      title: "Residential & commercial",
      copy: "Homes, offices, retail and light industrial",
    },
    {
      Icon: Receipt,
      title: "Priced before the work",
      copy: "Diagnosis first, then you approve the cost",
    }
  );

  return (
    <div className={`trust-badges trust-badges-${variant}`} data-count={badges.length}>
      {badges.map(({ Icon, title, copy, href, linkLabel }) => (
        <div className="trust-badge" key={title}>
          <span className="trust-badge-icon"><Icon size={19} aria-hidden="true" /></span>
          <div>
            <strong>{title}</strong>
            <span>{copy}</span>
            {href && <a href={href} target="_blank" rel="noreferrer">{linkLabel} →</a>}
          </div>
        </div>
      ))}
    </div>
  );
}
