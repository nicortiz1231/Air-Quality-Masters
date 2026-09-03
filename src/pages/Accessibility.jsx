import LegalDocument from "../components/LegalDocument.jsx";
import { accessibilityStatement } from "../data/legal.js";

export default function Accessibility() {
  return <LegalDocument doc={accessibilityStatement} />;
}
