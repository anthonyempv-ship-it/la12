import { SmartHeader } from "@/components/SmartHeader";
import { HeroSection } from "@/components/HeroSection";
import { CollectionsSection } from "@/components/CollectionsSection";
import { ProductGrid, TOP_PICKS_LIMIT } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { FloatingCart } from "@/components/FloatingCart";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SmartHeader />
      <HeroSection />
      <CollectionsSection />
      <ProductGrid limit={TOP_PICKS_LIMIT} showViewAll />
      <Footer />
      <FloatingCart />
    </div>
  );
};

export default Index;
