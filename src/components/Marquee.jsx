export default function Marquee() {
  const items = [
    "Air Conditioning Repair",
    "Commercial HVAC",
    "Preventative Maintenance",
    "Indoor Air Quality",
    "Installation",
    "Ventilation",
    "24/7 Support"
  ];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            <i>•</i>
          </span>
        ))}
      </div>
    </div>
  );
}
