export default function Marquee() {
  const items = [
    "Residential",
    "Commercial",
    "24/7 Support",
    "Repair",
    "Installation",
    "Air Quality",
    "Maintenance"
  ];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
