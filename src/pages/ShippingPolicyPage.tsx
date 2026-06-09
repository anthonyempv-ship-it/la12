import { SmartHeader } from "@/components/SmartHeader";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { FloatingCart } from "@/components/FloatingCart";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ShippingPolicyPage() {
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
          {lang === "es" ? "Política de Envío" : "Shipping Policy"} — <span className="text-cyan">La 12</span> FC
        </h1>

        {lang === "es" ? (
          <div className="space-y-6 text-sm md:text-base text-muted-foreground leading-relaxed">
            <div><span className="font-semibold text-foreground">• Procesamiento de Pedidos:</span> 1–5 días hábiles.</div>
            <div><span className="font-semibold text-foreground">• Confirmación y Seguimiento:</span> Recibirá su número de seguimiento una vez enviado el pedido.</div>
            <div><span className="font-semibold text-foreground">• Entrega y Responsabilidad:</span> No nos hacemos responsables por pérdida o robo tras la confirmación de entrega por la transportadora. En casilleros (Freight Forwarders), nuestra responsabilidad termina al entregar en dicha dirección.</div>
            <div><span className="font-semibold text-foreground">• Errores en la Dirección:</span> Es responsabilidad del comprador introducir la dirección correcta.</div>
          </div>
        ) : (
          <div className="space-y-6 text-sm md:text-base text-muted-foreground leading-relaxed">
            <div><span className="font-semibold text-foreground">• Order Processing:</span> All orders are processed within 1–5 business days. Orders are not shipped or delivered on weekends or holidays.</div>
            <div><span className="font-semibold text-foreground">• Tracking:</span> Once shipped, you will receive a tracking number that becomes active within 24 hours.</div>
            <div><span className="font-semibold text-foreground">• Responsibility:</span> La 12 FC is not responsible for lost or stolen products once the carrier confirms delivery to the provided address.</div>
            <div><span className="font-semibold text-foreground">• Freight Forwarders:</span> For customers using reforwarding services (like Miami, FL lockers), our responsibility ends when the carrier delivers to that specific address.</div>
            <div><span className="font-semibold text-foreground">• Address Accuracy:</span> It is the buyer's responsibility to ensure the shipping address is correct.</div>
          </div>
        )}
      </div>
      <Footer />
      <FloatingCart />
    </div>
  );
}
