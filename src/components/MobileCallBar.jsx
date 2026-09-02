import { Link } from "react-router-dom";
import { CalendarCheck, Phone } from "lucide-react";
import { company } from "../data/company.js";

/**
 * Fixed bottom bar on small screens.
 *
 * For emergency HVAC service this is the single highest-value element on the
 * site: someone whose AC has failed in August wants to press one button.
 */
export default function MobileCallBar() {
  return (
    <div className="call-bar" role="region" aria-label="Contact shortcuts">
      <a href={company.phone.href} className="call-bar-primary">
        <Phone size={17} aria-hidden="true" />
        <span>Call {company.phone.display}</span>
      </a>
      <Link to="/contact" className="call-bar-secondary" aria-label="Request service online">
        <CalendarCheck size={17} aria-hidden="true" />
        <span>Book</span>
      </Link>
    </div>
  );
}
