import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { company } from "../data/company.js";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="That page doesn't exist." path="/404" noindex />

      <section className="section-shell notfound">
        <span className="page-hero-eyebrow">404</span>
        <h1>That page isn't here.</h1>
        <p>
          The link may be out of date. Everything on the site is reachable from the pages
          below — or call {company.phone.display} and we'll point you in the right direction.
        </p>
        <div className="notfound-links">
          <Link className="button button-primary" to="/">Back to home</Link>
          <Link className="button button-ghost-dark" to="/services">Browse services</Link>
          <Link className="button button-ghost-dark" to="/contact">Request service</Link>
        </div>
      </section>
    </>
  );
}
