import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

/**
 * Standard header for every page other than Home: eyebrow, title, lede and
 * breadcrumbs. Keeping inner pages on one shape is what makes a multi-page
 * site read as a site rather than a stack of landing pages.
 */
export default function PageHero({ eyebrow, title, lede, crumbs = [], image, children }) {
  return (
    <header className={`page-hero${image ? " page-hero-image" : ""}`}>
      {image && (
        <div className="page-hero-media" aria-hidden="true">
          <img src={image} alt="" loading="eager" />
          <div className="page-hero-shade" />
        </div>
      )}

      <div className="section-shell page-hero-inner">
        {crumbs.length > 0 && (
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {crumbs.map((c) => (
              <span key={c.to || c.label}>
                <ChevronRight size={12} aria-hidden="true" />
                {c.to ? <Link to={c.to}>{c.label}</Link> : <b aria-current="page">{c.label}</b>}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && <span className="page-hero-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {lede && <p className="page-hero-lede">{lede}</p>}
        {children}
      </div>
    </header>
  );
}
