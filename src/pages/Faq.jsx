import { Link } from "react-router-dom";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import CtaSection from "../components/CtaSection.jsx";
import { allFaqs, faqCategories } from "../data/faqs.js";
import { company } from "../data/company.js";

export default function Faq() {
  const [open, setOpen] = useState(() => new Set([allFaqs[0].q]));

  const toggle = (q) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(q) ? next.delete(q) : next.add(q);
      return next;
    });

  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Straight answers on diagnostic fees, repair versus replacement, R-22 refrigerant, humidity problems, duct cleaning and how our service calls work."
        path="/faq"
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: allFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <PageHero
        eyebrow="FAQ"
        title={<>Questions worth<br /><em>asking any contractor.</em></>}
        lede="Including the ones that are awkward to ask. If something you need isn't here, call the office — you'll get an answer rather than a callback form."
        crumbs={[{ label: "FAQ" }]}
      />

      <section className="section-shell faq-page">
        {faqCategories.map((group) => (
          <div className="faq-group" key={group.category} data-reveal>
            <h2>{group.category}</h2>
            <div className="faq-items">
              {group.items.map((item) => {
                const isOpen = open.has(item.q);
                return (
                  <div className={`faq-item${isOpen ? " is-open" : ""}`} key={item.q}>
                    <button
                      type="button"
                      onClick={() => toggle(item.q)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <i aria-hidden="true">{isOpen ? <Minus size={17} /> : <Plus size={17} />}</i>
                    </button>
                    {isOpen && <div className="faq-answer"><p>{item.a}</p></div>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <p className="faq-footnote" data-reveal>
          Still unsure about something? <a href={company.phone.href}>Call {company.phone.display}</a>{" "}
          or <Link to="/contact">send it through in writing</Link>.
        </p>
      </section>

      <CtaSection />
    </>
  );
}
