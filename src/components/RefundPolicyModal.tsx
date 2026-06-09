import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";

interface RefundPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RefundPolicyModal({ open, onOpenChange }: RefundPolicyModalProps) {
  const { lang } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0">
        <ScrollArea className="max-h-[85vh] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {lang === "es" ? "Política de Reembolso" : "Refund Policy"} – <span className="text-cyan">La 12</span> Team
            </DialogTitle>
          </DialogHeader>

          {lang === "es" ? (
            <div className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
              <div>
                <span className="font-semibold text-foreground">• Plazo de 30 Días:</span> Reembolso completo dentro de los 30 días posteriores a la entrega por cualquier problema de calidad.
              </div>
              <div>
                <span className="font-semibold text-foreground">• Pedidos Personalizados:</span> Las camisetas personalizadas (nombre/número/parches) no pueden devolverse a menos que sean defectuosas.
              </div>
              <div>
                <span className="font-semibold text-foreground">• Contacto:</span> Contáctenos por WhatsApp para una resolución rápida.
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
              <div>
                <span className="font-semibold text-foreground">• 30-Day Window:</span> Full refund within 30 days of delivery for any quality issue.
              </div>
              <div>
                <span className="font-semibold text-foreground">• Custom Orders:</span> Custom jerseys (name/number/patches) cannot be returned unless defective.
              </div>
              <div>
                <span className="font-semibold text-foreground">• Contact:</span> Reach us via WhatsApp for fast resolution.
              </div>
            </div>
          )}
          <div className="h-6" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
