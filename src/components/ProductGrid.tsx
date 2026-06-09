import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { products, type ProductCategory, type TeamType } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";

const TOP_PICKS_LIMIT = 16;

interface ProductGridProps {
  forceTeamType?: TeamType;
  forceCategory?: ProductCategory;
  hideCategoryFilter?: boolean;
  hideHeading?: boolean;
  limit?: number;
  showViewAll?: boolean;
  headingOverride?: string;
}

export function ProductGrid({
  forceTeamType,
  forceCategory,
  hideHeading,
  limit,
  showViewAll,
  headingOverride,
}: ProductGridProps = {}) {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const searchQuery = params.get("q")?.trim() ?? "";

  const filtered = useMemo(() => {
    return products
      .filter((p) => (forceTeamType ? p.teamType === forceTeamType : true))
      .filter((p) => {
        // Strict rule: exclude shorts everywhere unless explicitly the shorts view
        if (forceCategory === "shorts") return p.category === "shorts";
        if (forceCategory) return p.category === forceCategory;
        return p.category !== "shorts";
      })
      .filter((p) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        const name = (lang === "es" ? p.nameEs : p.name).toLowerCase();
        return name.includes(q);
      })
      .sort((a, b) => {
        const nameA = (lang === "es" ? a.nameEs : a.name).toLowerCase();
        const nameB = (lang === "es" ? b.nameEs : b.name).toLowerCase();
        return nameA.localeCompare(nameB);
      });
  }, [searchQuery, lang, forceTeamType, forceCategory]);

  const items = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section id="products" className="py-12 md:py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        {!hideHeading && (
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight uppercase">
              {headingOverride ?? t("topPicks.title")}
            </h2>
          </div>
        )}

        {searchQuery && (
          <p className="text-center text-sm text-muted-foreground mb-6">
            {lang === "es" ? "Resultados para" : "Results for"}{" "}
            <span className="text-foreground font-semibold">"{searchQuery}"</span>
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => navigate(`/product/${product.id}`)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            {lang === "es" ? "No se encontraron resultados" : "No results found"}
          </p>
        )}

        {showViewAll && filtered.length > items.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => navigate("/shop")}
              className="border border-cyan/50 text-cyan font-bold uppercase tracking-wider text-sm px-8 py-3.5 rounded transition-all duration-200 hover:bg-cyan/10 hover:shadow-[0_0_20px_hsl(192_99%_61%/0.3)] active:scale-95"
            >
              {t("topPicks.viewAll")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export { TOP_PICKS_LIMIT };
