import { SmartHeader } from "@/components/SmartHeader";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Info, Check } from "lucide-react";
import { products, getPatchesForProduct } from "@/data/products";
import { SizeGuideModal } from "@/components/SizeGuideModal";
import { Footer } from "@/components/Footer";
import { FloatingCart } from "@/components/FloatingCart";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const { addItem } = useCart();

  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPatch, setSelectedPatch] = useState("");
  const [customName, setCustomName] = useState("");
  const [customNumber, setCustomNumber] = useState("");
  
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground">
      <SmartHeader />
        <div className="flex flex-col items-center justify-center py-32 px-4">
          <h1 className="text-2xl font-bold mb-4">{lang === "es" ? "Producto no encontrado" : "Product not found"}</h1>
          <button onClick={() => navigate("/")} className="text-primary hover:underline">
            {lang === "es" ? "Volver a la tienda" : "Back to store"}
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const displayName = lang === "es" ? product.nameEs : product.name;
  const displayDesc = lang === "es" ? product.descriptionEs : product.description;
  const patches = getPatchesForProduct(product);
  const hasMultipleImages = product.images.length > 1;
  const isShorts = product.category === "shorts";
  const hasCustomization = !isShorts && (customName.trim().length > 0 || customNumber.trim().length > 0);
  const customizationFee = hasCustomization ? 3.0 : 0;
  const patchFee = selectedPatch ? 2.0 : 0;
  const shortsNumberFee = isShorts && customNumber.trim().length > 0 ? 3.0 : 0;
  const finalPrice = product.price + customizationFee + patchFee + shortsNumberFee;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error(lang === "es" ? "Selecciona una talla" : "Please select a size");
      return;
    }
    addItem({
      productId: product.id,
      productName: product.name,
      size: selectedSize,
      patch: isShorts ? "" : selectedPatch,
      customName: isShorts ? "" : customName,
      customNumber: customNumber,
      price: finalPrice,
    });
    setAdded(true);
    toast.success(lang === "es" ? "Agregado al carrito" : "Added to cart");
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SmartHeader />
      <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          {lang === "es" ? "Volver a la tienda" : "Back to store"}
        </button>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Gallery */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-card">
              <img src={product.images[activeImage]} alt={`${displayName} - ${activeImage + 1}`} className="w-full h-full object-cover" />
              {hasMultipleImages && (
                <>
                  <button onClick={() => setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))} className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/70 text-foreground backdrop-blur-sm hover:bg-background/90 transition-colors active:scale-95">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={() => setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/70 text-foreground backdrop-blur-sm hover:bg-background/90 transition-colors active:scale-95">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            {hasMultipleImages && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={`w-16 h-20 rounded overflow-hidden border-2 transition-all duration-200 ${activeImage === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}>
                    <img src={img} alt={`${displayName} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="text-primary font-mono text-xs uppercase tracking-[0.2em] mb-2">
              {product.category === "player" ? t("detail.playerVersion") : product.category === "longsleeve" ? t("detail.longSleeve") : product.category === "special" ? t("detail.specialEdition") : product.category === "shorts" ? t("detail.shorts") : t("detail.retroClassic")}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{displayName}</h1>
            <p className="text-muted-foreground text-sm mb-4">{displayDesc}</p>
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-3xl font-black text-cyan">${product.price.toFixed(2)}</span>
            </div>

            {/* Size */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold uppercase tracking-wide">{t("detail.size")}</label>
                <button onClick={() => setShowSizeGuide(true)} className="flex items-center gap-1 text-xs text-primary hover:underline">
                  <Info className="w-3 h-3" /> {t("detail.sizeGuide")}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 text-sm font-semibold rounded border transition-all duration-200 active:scale-95 ${selectedSize === size ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/50"}`}>
                    {size}
                  </button>
                ))}
              </div>
              {product.category === "player" && <p className="text-xs text-primary/80 mt-2">{t("detail.slimFit")}</p>}
            </div>

            {/* Name & Number (jerseys) */}
            {!isShorts && (
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold uppercase tracking-wide">{t("detail.customizeNameNumber")}</span>
                <span className="text-sm font-semibold text-primary">{t("detail.customizeNameNumberPrice")}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold uppercase tracking-wide block mb-1.5">{t("detail.name")}</label>
                  <input type="text" placeholder="e.g. MESSI" value={customName} onChange={(e) => setCustomName(e.target.value.toUpperCase())} maxLength={15} className="w-full bg-secondary border border-border rounded px-3 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow" />
                </div>
                <div>
                  <label className="text-sm font-semibold uppercase tracking-wide block mb-1.5">{t("detail.number")}</label>
                  <input type="text" placeholder="e.g. 10" value={customNumber} onChange={(e) => setCustomNumber(e.target.value.replace(/\D/g, "").slice(0, 2))} maxLength={2} className="w-full bg-secondary border border-border rounded px-3 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow" />
                </div>
              </div>
            </div>
            )}

            {/* Add Number (shorts) - always visible, optional */}
            {isShorts && (
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold uppercase tracking-wide">
                  {lang === "es" ? "Agregar Número (+$3) - Opcional" : "Add Number (+$3) - Optional"}
                </span>
                <span className="text-sm font-semibold text-primary">+ $3.00 USD</span>
              </div>
              <input
                type="text"
                placeholder={lang === "es" ? "Ej. 10 (opcional)" : "e.g. 10 (optional)"}
                value={customNumber}
                onChange={(e) => setCustomNumber(e.target.value.replace(/\D/g, "").slice(0, 2))}
                maxLength={2}
                className="w-full bg-secondary border border-border rounded px-3 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
            </div>
            )}

            {/* Patches */}
            {!product.disablePatches && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold uppercase tracking-wide">{t("detail.addPatches")}</span>
                <span className="text-sm font-semibold text-primary">{t("detail.addPatchesPrice")}</span>
              </div>
              <select value={selectedPatch} onChange={(e) => setSelectedPatch(e.target.value)} className="w-full bg-secondary border border-border rounded px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none cursor-pointer">
                <option value="">{lang === "es" ? "Sin parche" : "No patch"}</option>
                {patches.map((patch) => (
                  <option key={patch} value={patch}>{patch}</option>
                ))}
              </select>
            </div>
            )}

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={`w-full font-bold text-center uppercase tracking-wider py-4 rounded transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2 ${added ? "bg-green-600 text-white" : "bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"}`}
            >
              {added ? (
                <><Check className="w-5 h-5" /> {lang === "es" ? "Agregado ✓" : "Added ✓"}</>
              ) : (
                lang === "es" ? "Agregar al Carrito" : "Add to Cart"
              )}
            </button>
          </div>
        </div>
      </div>

      {showSizeGuide && <SizeGuideModal category={product.category} onClose={() => setShowSizeGuide(false)} />}
      <Footer />
      <FloatingCart />
    </div>
  );
}
