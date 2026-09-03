import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Seo from "./Seo.jsx";
import PageHero from "./PageHero.jsx";
import { formatUpdated, legalDocuments } from "../data/legal.js";
import { company } from "../data/company.js";
import { scrollToEl } from "../lib/scroll.js";

/**
 * Renders one legal document from src/data/legal.js.
 *
 * The contents rail is a real <nav> of same-page anchors rather than a
 * scroll-spy widget. A policy is a document people arrive at looking for one
 * specific clause, and a plain list of links they can Cmd-F against beats
 * anything clever.
 *
 * Every section heading carries an id so a clause can be linked to directly —
 * "see the retention section" is useless without /privacy#retention.
 */
export default function LegalDocument({ doc }) {
  const { hash } = useLocation();
  const others = legalDocuments.filter((d) => d.slug !== doc.slug);

  // Deep link into a clause: /privacy#retention has to land on the clause even
  // though ScrollToTop has just sent the route to the top.
  useEffect(() => {
    if (!hash) return;
    const id = requestAnimationFrame(() =>
      scrollToEl(document.getElementById(hash.slice(1)), { immediate: true })
    );
    return () => cancelAnimationFrame(id);
  }, [hash, doc.slug]);

  const jump = (event, id) => {
    event.preventDefault();
    scrollToEl(document.getElementById(id));
    window.history.replaceState(null, "", `${doc.path}#${id}`);
  };

  return (
    <>
      <Seo
        title={doc.title}
        description={doc.description}
        path={doc.path}
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${doc.title} | ${company.name}`,
          url: `${company.url}${doc.path}`,
          dateModified: doc.updated,
          publisher: { "@id": `${company.url}/#business` },
        }}
      />

      <PageHero
        eyebrow="Legal"
        title={doc.title}
        lede={doc.lede}
        crumbs={[{ label: doc.title }]}
      />

      <div className="section-shell legal-layout">
        <nav className="legal-toc" aria-label={`${doc.title} contents`}>
          <span className="footer-label">Contents</span>
          <ol>
            {doc.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} onClick={(e) => jump(e, s.id)}>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>

          <div className="legal-toc-meta">
            <span className="footer-label">Last updated</span>
            <time dateTime={doc.updated}>{formatUpdated(doc.updated)}</time>
          </div>

          <div className="legal-toc-other">
            {others.map((d) => (
              <Link key={d.slug} to={d.path}>
                {d.title} →
              </Link>
            ))}
          </div>
        </nav>

        <article className="legal-body">
          {doc.sections.map((section) => (
            <section key={section.id} id={section.id} className="legal-section">
              <h2>{section.heading}</h2>
              {section.body.map((node, i) => (
                <Node key={i} node={node} />
              ))}
            </section>
          ))}

          <p className="legal-footnote">
            Nothing on this page is legal advice. If you have a question about how it applies
            to you, ask us directly — {" "}
            <a href={company.phone.href}>{company.phone.display}</a> or{" "}
            <a href={`mailto:${company.email}`}>{company.email}</a>.
          </p>
        </article>
      </div>
    </>
  );
}

function Node({ node }) {
  if (typeof node === "string") return <p>{node}</p>;

  if (node.list) {
    return (
      <ul className="legal-list">
        {node.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (node.defs) {
    return (
      <dl className="legal-defs">
        {node.defs.map(([term, def]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{def}</dd>
          </div>
        ))}
      </dl>
    );
  }

  if (node.note) {
    return <p className="legal-note">{node.note}</p>;
  }

  return null;
}
