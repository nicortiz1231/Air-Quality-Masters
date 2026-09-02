import { useEffect } from "react";
import { applySeo, localBusinessSchema } from "../lib/seo.js";

/**
 * Applies page <head> metadata and, optionally, extra JSON-LD.
 *
 * The LocalBusiness graph is emitted once from index.html at build time; this
 * component adds page-specific structured data (Service, FAQPage, BreadcrumbList)
 * and cleans it up on unmount so stale schema never leaks between routes.
 */
export default function Seo({ title, description, path, image, noindex, schema }) {
  useEffect(() => {
    applySeo({ title, description, path, image, noindex });
  }, [title, description, path, image, noindex]);

  useEffect(() => {
    if (!schema) return;
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.dataset.pageSchema = "true";
    el.textContent = JSON.stringify(schema);
    document.head.appendChild(el);
    return () => el.remove();
  }, [schema]);

  return null;
}

export { localBusinessSchema };
