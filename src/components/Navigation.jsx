import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import AnnounceBar from "./AnnounceBar.jsx";
import { company } from "../data/company.js";
import { services } from "../data/services.js";
import { featuredAreas } from "../data/serviceAreas.js";

const links = [
  { to: "/services", label: "Services", children: services.map((s) => ({ to: `/services/${s.slug}`, label: s.title })) },
  { to: "/service-areas", label: "Service Areas", children: featuredAreas.map((a) => ({ to: `/service-areas/${a.slug}`, label: a.name })) },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export default function Navigation() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const panelRef = useRef(null);

  // Close the drawer on navigation.
  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Lock body scroll and wire Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector("a, button")?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <div className="masthead">
        <AnnounceBar />

        <header className="nav">
        <Link to="/" className="brand" aria-label={`${company.name} — home`}>
          {/* alt="" — the link already carries the accessible name, so the
              image would otherwise be announced twice. */}
          <img src="/aqm-logo.png" alt="" width="394" height="152" />
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {links.map((link) =>
            link.children ? (
              <div className="nav-group" key={link.to}>
                <NavLink to={link.to} className={({ isActive }) => (isActive ? "is-active" : "")}>
                  {link.label}
                  <ChevronDown size={13} aria-hidden="true" />
                </NavLink>
                <div className="nav-dropdown" role="menu">
                  {link.children.map((child) => (
                    <Link key={child.to} to={child.to} role="menuitem">{child.label}</Link>
                  ))}
                  <Link to={link.to} className="nav-dropdown-all" role="menuitem">
                    View all {link.label.toLowerCase()} →
                  </Link>
                </div>
              </div>
            ) : (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? "is-active" : "")}>
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="nav-actions">
          <a className="nav-phone" href={company.phone.href}>
            <Phone size={15} aria-hidden="true" />
            <span>{company.phone.display}</span>
          </a>
          <Link className="nav-request" to="/contact">Request Service</Link>
          <button
            type="button"
            className="menu-button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
        </header>
      </div>

      {/* Mobile drawer */}
      <div className={`drawer${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="drawer-scrim" onClick={() => setOpen(false)} />
        <div className="drawer-panel" id="mobile-menu" ref={panelRef} role="dialog" aria-modal="true" aria-label="Menu">
          <div className="drawer-head">
            <span>Menu</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <nav className="drawer-links" aria-label="Mobile">
            <Link to="/">Home</Link>
            {links.map((link) =>
              link.children ? (
                <div className="drawer-group" key={link.to}>
                  <button
                    type="button"
                    onClick={() => setOpenGroup(openGroup === link.to ? null : link.to)}
                    aria-expanded={openGroup === link.to}
                  >
                    {link.label}
                    <ChevronDown size={16} className={openGroup === link.to ? "rot" : ""} aria-hidden="true" />
                  </button>
                  {openGroup === link.to && (
                    <div className="drawer-sub">
                      <Link to={link.to}>All {link.label.toLowerCase()}</Link>
                      {link.children.map((c) => (
                        <Link key={c.to} to={c.to}>{c.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.to} to={link.to}>{link.label}</Link>
              )
            )}
          </nav>

          <div className="drawer-foot">
            <a className="drawer-call" href={company.phone.href}>
              <Phone size={17} aria-hidden="true" />
              {company.phone.display}
            </a>
            <Link className="drawer-cta" to="/contact">Request Service</Link>
          </div>
        </div>
      </div>
    </>
  );
}
