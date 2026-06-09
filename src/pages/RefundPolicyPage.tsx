import { SmartHeader } from "@/components/SmartHeader";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { FloatingCart } from "@/components/FloatingCart";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RefundPolicyPage() {
  const navigate = useNavigate();
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SmartHeader />
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          {lang === "es" ? "Volver" : "Go Back"}
        </button>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          {lang === "es" ? "Política de Reembolso" : "Refund Policy"} — <span className="text-cyan">La 12</span> FC
        </h1>

        {lang === "es" ? (
          <div className="space-y-6 text-sm md:text-base text-muted-foreground leading-relaxed">
            <div><span className="font-semibold text-foreground">• Plazo de 30 Días:</span> Reembolso completo dentro de los 30 días posteriores a la entrega por cualquier problema de calidad.</div>
            <div><span className="font-semibold text-foreground">• Pedidos Personalizados:</span> Las camisetas personalizadas (nombre/número/parches) no pueden devolverse a menos que sean defectuosas.</div>
            <div><span className="font-semibold text-foreground">• Contacto:</span> Contáctenos por WhatsApp para una resolución rápida.</div>
          </div>
        ) : (
          <div className="space-y-6 text-sm md:text-base text-muted-foreground leading-relaxed">
            <div><span className="font-semibold text-foreground">• 30-Day Window:</span> Full refund within 30 days of delivery for any quality issue.</div>
            <div><span className="font-semibold text-foreground">• Custom Orders:</span> Custom jerseys (name/number/patches) cannot be returned unless defective.</div>
            <div><span className="font-semibold text-foreground">• Contact:</span> Reach us via WhatsApp for fast resolution.</div>
          </div>
        )}
      </div>
      <Footer />
      <FloatingCart />
    </div>
  );
}
