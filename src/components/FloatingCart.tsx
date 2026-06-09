import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

export function FloatingCart() {
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/checkout")}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all active:scale-95"
      aria-label="Cart"
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}
