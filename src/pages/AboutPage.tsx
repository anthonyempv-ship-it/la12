import { SmartHeader } from "@/components/SmartHeader";
import { Footer } from "@/components/Footer";
import { FloatingCart } from "@/components/FloatingCart";
import { AboutSection } from "@/components/AboutSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SmartHeader />
      <main className="flex-1">
        <AboutSection />
      </main>
      <Footer />
      <FloatingCart />
    </div>
  );
}
