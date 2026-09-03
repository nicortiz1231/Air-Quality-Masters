import Marquee from "./Marquee.jsx";
import { counties } from "../data/serviceAreas.js";

/**
 * The announcement marquee above the header.
 *
 * Matched to the Value Vault bar: 28px between messages, 25px tall, 30px from
 * 1024 up, 12px text, 70px/sec. The bar is pure black on purpose and is the one
 * place on the site that is — everything else reads dark through `--ink`, the
 * cold near-black in the theme, deliberately never #000.
 *
 * Every message here has to be a claim the business can back, same as the rest
 * of the site: coverage and the pricing sequence are stated elsewhere already,
 * and nothing about hours, licensing or response time belongs in a band that
 * cannot be qualified.
 */
export default function AnnounceBar() {
  const messages = [
    "Diagnosis first, then you approve the cost",
    "Residential and commercial HVAC",
    `Serving ${counties.map((c) => c.replace(" County", "")).join(", ")}`,
  ];

  return (
    <Marquee gap={28} speed={70} className="announce">
      {messages.map((message) => (
        <span key={message}>{message}</span>
      ))}
    </Marquee>
  );
}
