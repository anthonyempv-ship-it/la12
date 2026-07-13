import type { Product } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { lang } = useLanguage();

  return (
    <button
      onClick={onClick}
      className="group text-left w-full rounded-lg overflow-hidden bg-card transition-all duration-300 hover:shadow-[0_4px_24px_hsl(192_99%_61%/0.12)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={lang === "es" ? product.nameEs : product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          width={400}
          height={500}
        />
      </div>
      <div className="p-3 md:p-4">
        <h3 className="text-sm md:text-base font-semibold leading-tight mb-1.5 line-clamp-2 min-h-[2.5rem]">
          {lang === "es" ? product.nameEs : product.name}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <span className="text-cyan font-bold text-base">${product.price.toFixed(2)} USD</span>
        </div>
      </div>
    </button>
  );
}
