import { SmartHeader } from "@/components/SmartHeader";
import { Footer } from "@/components/Footer";
import { FloatingCart } from "@/components/FloatingCart";
import { ProductGrid } from "@/components/ProductGrid";
import { useLanguage } from "@/contexts/LanguageContext";
import type { TeamType, ProductCategory } from "@/data/products";

interface ShopPageProps {
  forceTeamType?: TeamType;
  forceCategory?: ProductCategory;
  titleKey: { en: string; es: string };
  subtitleKey?: { en: string; es: string };
}

export default function ShopPage({ forceTeamType, forceCategory, titleKey, subtitleKey }: ShopPageProps) {
  const { lang } = useLanguage();
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SmartHeader />
      <main className="flex-1">
        <div className="container max-w-6xl mx-auto px-4 pt-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
            {titleKey[lang]}
          </h1>
          {subtitleKey && (
            <p className="text-muted-foreground text-sm md:text-base">{subtitleKey[lang]}</p>
          )}
        </div>
        <ProductGrid forceTeamType={forceTeamType} forceCategory={forceCategory} hideCategoryFilter={!!forceCategory} hideHeading />
      </main>
      <Footer />
      <FloatingCart />
    </div>
  );
}
