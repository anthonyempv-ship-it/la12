import { SmartHeader } from "@/components/SmartHeader";
import { Footer } from "@/components/Footer";
import { FloatingCart } from "@/components/FloatingCart";
import { PoliciesSection } from "@/components/PoliciesSection";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PoliciesPage() {
  const { lang } = useLanguage();
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SmartHeader />
      <main className="flex-1">
        <PoliciesSection />
        <div className="container max-w-3xl mx-auto px-4 pb-16 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/shipping-policy" className="text-center px-6 py-3 rounded bg-secondary text-secondary-foreground text-sm font-semibold uppercase tracking-wider hover:bg-secondary/80">
            {lang === "es" ? "Política de Envío" : "Shipping Policy"}
          </Link>
          <Link to="/refund-policy" className="text-center px-6 py-3 rounded bg-secondary text-secondary-foreground text-sm font-semibold uppercase tracking-wider hover:bg-secondary/80">
            {lang === "es" ? "Política de Reembolso" : "Refund Policy"}
          </Link>
        </div>
      </main>
      <Footer />
      <FloatingCart />
    </div>
  );
}
