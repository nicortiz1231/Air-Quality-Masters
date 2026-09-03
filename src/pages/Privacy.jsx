import LegalDocument from "../components/LegalDocument.jsx";
import { privacyPolicy } from "../data/legal.js";

export default function Privacy() {
  return <LegalDocument doc={privacyPolicy} />;
}
