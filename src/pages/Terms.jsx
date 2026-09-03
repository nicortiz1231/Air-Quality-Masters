import LegalDocument from "../components/LegalDocument.jsx";
import { termsOfService } from "../data/legal.js";

export default function Terms() {
  return <LegalDocument doc={termsOfService} />;
}
