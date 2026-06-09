import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SmartHeader } from "@/components/SmartHeader";
import { Footer } from "@/components/Footer";
import { FloatingCart } from "@/components/FloatingCart";
import { ProductGrid, type CollectionFilterKey } from "@/components/ProductGrid";
import { useLanguage } from "@/contexts/LanguageContext";
import type { TeamType, ProductCategory } from "@/data/products";

interface ShopPageProps {
  forceTeamType?: TeamType;
  forceCategory?: ProductCategory;
  filterKey?: CollectionFilterKey;
  titleKey: { en: string; es: string };
  subtitleKey?: { en: string; es: string };
  showBackToHome?: boolean;
}

export default function ShopPage({
  forceTeamType,
  forceCategory,
  filterKey,
  titleKey,
  subtitleKey,
  showBackToHome,
}: ShopPageProps) {
  const { lang, t } = useLanguage();
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SmartHeader />
      <main className="flex-1">
        <div className="container max-w-6xl mx-auto px-4 pt-6 md:pt-8">
          {showBackToHome && (
            <div className="mb-4">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold uppercase tracking-wider text-cyan/80 hover:text-cyan transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("nav.backHome")}
              </Link>
            </div>
          )}
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
              {titleKey[lang]}
            </h1>
            {subtitleKey && (
              <p className="text-muted-foreground text-sm md:text-base">{subtitleKey[lang]}</p>
            )}
          </div>
        </div>
        <ProductGrid
          forceTeamType={forceTeamType}
          forceCategory={forceCategory}
          filterKey={filterKey}
          hideCategoryFilter={!!forceCategory}
          hideHeading
        />
      </main>
      <Footer />
      <FloatingCart />
    </div>
  );
}
