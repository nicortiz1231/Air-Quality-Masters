import { Building2, Clock3, MapPin, Wrench } from "lucide-react";

const items = [
  [Wrench, "Residential & Commercial", "Complete HVAC service"],
  [Clock3, "24/7 Team Support", "Help when you need it"],
  [MapPin, "South Florida", "Local service coverage"],
  [Building2, "Established Operation", "Oakland Park headquarters"]
];

export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Company highlights">
      {items.map(([Icon, title, copy]) => (
        <div className="trust-item" key={title}>
          <span className="trust-icon"><Icon size={20} /></span>
          <div>
            <strong>{title}</strong>
            <span>{copy}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
