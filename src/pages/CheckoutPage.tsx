import { SmartHeader } from "@/components/SmartHeader";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { PAYMENT_METHODS } from "@/data/products";

const WHATSAPP_NUMBER = "584129058418";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, removeItem, clearCart, total } = useCart();
  const { lang, t } = useLanguage();
  const [selectedPayment, setSelectedPayment] = useState("");

  const buildWhatsAppMessage = () => {
    let msg = `Hello La 12 FC! I'd like to place an order:\n\n`;
    items.forEach((item, i) => {
      msg += `${i + 1}. ${item.productName}\n`;
      msg += `   📏 Size: ${item.size}\n`;
      if (item.customName) msg += `   👤 Name: ${item.customName}\n`;
      if (item.customNumber) msg += `   🔢 Number: ${item.customNumber}\n`;
      if (item.patch) msg += `   🏷 Patch: ${item.patch}\n`;
      msg += `   💰 $${item.price.toFixed(2)}\n\n`;
    });
    msg += `💳 Payment: ${selectedPayment || "Not selected"}\n`;
    msg += `💰 Total: $${total.toFixed(2)}`;
    return encodeURIComponent(msg);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SmartHeader />
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          {lang === "es" ? "Volver" : "Go Back"}
        </button>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          {lang === "es" ? "Tu Carrito" : "Your Cart"}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">{lang === "es" ? "Tu carrito está vacío" : "Your cart is empty"}</p>
            <button onClick={() => navigate("/")} className="text-primary hover:underline">
              {lang === "es" ? "Volver a la tienda" : "Back to store"}
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item, i) => (
                <div key={i} className="flex items-start justify-between bg-card border border-border rounded-lg p-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm md:text-base">{item.productName}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
                      <span>{lang === "es" ? "Talla" : "Size"}: {item.size}</span>
                      {item.customName && <span>{lang === "es" ? "Nombre" : "Name"}: {item.customName}</span>}
                      {item.customNumber && <span>#{item.customNumber}</span>}
                      {item.patch && <span>{lang === "es" ? "Parche" : "Patch"}: {item.patch}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-cyan font-bold">${item.price.toFixed(2)}</span>
                    <button onClick={() => removeItem(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <label className="text-sm font-semibold uppercase tracking-wide block mb-2">{t("detail.payment")}</label>
              <select
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="w-full bg-secondary border border-border rounded px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none cursor-pointer"
              >
                <option value="">{lang === "es" ? "Seleccionar método" : "Select method"}</option>
                {PAYMENT_METHODS.map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between border-t border-border pt-4 mb-6">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-black text-cyan">${total.toFixed(2)}</span>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-primary text-primary-foreground font-bold text-center uppercase tracking-wider py-4 rounded transition-all duration-200 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] active:scale-[0.97] block mb-3"
            >
              {lang === "es" ? "Hacer Pedido por WhatsApp" : "Place Order via WhatsApp"} — ${total.toFixed(2)}
            </a>

            <button onClick={clearCart} className="w-full text-center text-sm text-muted-foreground hover:text-destructive transition-colors py-2">
              {lang === "es" ? "Vaciar carrito" : "Clear cart"}
            </button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
