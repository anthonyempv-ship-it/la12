import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";

interface ShippingPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShippingPolicyModal({ open, onOpenChange }: ShippingPolicyModalProps) {
  const { lang } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0">
        <ScrollArea className="max-h-[85vh] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {lang === "es" ? "Política de Envío" : "Shipping Policy"} – <span className="text-cyan">La 12</span> Team
            </DialogTitle>
          </DialogHeader>

          {lang === "es" ? (
            <div className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
              <div>
                <span className="font-semibold text-foreground">• Procesamiento de Pedidos:</span> 1–5 días hábiles.
              </div>
              <div>
                <span className="font-semibold text-foreground">• Confirmación y Seguimiento:</span> Recibirá su número de seguimiento una vez enviado el pedido.
              </div>
              <div>
                <span className="font-semibold text-foreground">• Entrega y Responsabilidad:</span> No nos hacemos responsables por pérdida o robo tras la confirmación de entrega por la transportadora. En casilleros (Freight Forwarders), nuestra responsabilidad termina al entregar en dicha dirección.
              </div>
              <div>
                <span className="font-semibold text-foreground">• Errores en la Dirección:</span> Es responsabilidad del comprador introducir la dirección correcta.
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
              <div>
                <span className="font-semibold text-foreground">• Order Processing:</span> All orders are processed within 1–5 business days. Orders are not shipped or delivered on weekends or holidays.
              </div>
              <div>
                <span className="font-semibold text-foreground">• Tracking:</span> Once shipped, you will receive a tracking number that becomes active within 24 hours.
              </div>
              <div>
                <span className="font-semibold text-foreground">• Responsibility:</span> La 12 Team is not responsible for lost or stolen products once the carrier confirms delivery to the provided address.
              </div>
              <div>
                <span className="font-semibold text-foreground">• Freight Forwarders:</span> For customers using reforwarding services (like Miami, FL lockers), our responsibility ends when the carrier delivers to that specific address.
              </div>
              <div>
                <span className="font-semibold text-foreground">• Address Accuracy:</span> It is the buyer's responsibility to ensure the shipping address is correct. Delivery to the exact address provided at checkout constitutes a completed service.
              </div>
            </div>
          )}
          <div className="h-6" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
