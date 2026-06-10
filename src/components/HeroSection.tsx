import { useState, useEffect } from "react";
import { Globe, HeartHandshake, Award } from "lucide-react";
import heroImg from "@/assets/hero-tunnel.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4">
      {/* Background image with dark duotone overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[hsl(220_35%_7%/0.75)]" />
        <div className="absolute inset-0 mix-blend-color" style={{ backgroundColor: "hsl(192 99% 61% / 0.08)" }} />
      </div>

      {/* Carbon fiber texture overlay */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: `repeating-linear-gradient(
          0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px
        ),
        repeating-linear-gradient(
          90deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px
        ),
        repeating-linear-gradient(
          0deg, rgba(255,255,255,0.02) 0px, transparent 1px, transparent 3px, rgba(255,255,255,0.02) 4px
        )`,
        backgroundSize: "4px 4px, 4px 4px, 4px 4px",
      }} />

      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-15 blur-[120px]" style={{ backgroundColor: "hsl(var(--cyan))" }} />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ filter: visible ? "blur(0)" : "blur(6px)" }}>
          <p className="text-primary font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-6">
            {t("hero.tagline")}
          </p>
        </div>

        <h1
          className={`text-5xl sm:text-6xl md:text-8xl font-black uppercase leading-[0.9] mb-4 transition-all duration-1000 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ filter: visible ? "blur(0)" : "blur(6px)", lineHeight: "0.9" }}
        >
          <span className="block">{t("hero.line1")}</span>
          <span className="text-gradient-cyan block">{t("hero.line2")}</span>
          <span className="block">{t("hero.line3")}</span>
        </h1>

        <p
          className={`text-muted-foreground font-mono text-xs md:text-sm tracking-wider mb-8 transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ filter: visible ? "blur(0)" : "blur(6px)" }}
        >
          {t("hero.subtitle")}
        </p>

        <div className={`flex justify-center transition-all duration-1000 delay-[450ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ filter: visible ? "blur(0)" : "blur(6px)" }}>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("products");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm px-8 py-4 rounded transition-all duration-200 hover:shadow-[0_0_30px_hsl(192_99%_61%/0.4)] active:scale-95"
          >
            {t("hero.shopNow")}
          </button>
        </div>

        <div className={`mt-8 md:mt-10 flex flex-wrap items-start justify-center gap-x-4 gap-y-3 md:gap-x-8 transition-all duration-1000 delay-[600ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-1.5 text-cyan flex-1 md:flex-none min-w-[90px] max-w-[120px] md:max-w-none text-center">
            <Globe className="w-4 h-4 md:w-4 md:h-4" strokeWidth={1.75} />
            <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider leading-tight">{t("trust.shipping")}</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-1.5 text-cyan flex-1 md:flex-none min-w-[90px] max-w-[120px] md:max-w-none text-center">
            <HeartHandshake className="w-4 h-4 md:w-4 md:h-4" strokeWidth={1.75} />
            <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider leading-tight">{t("trust.trusted")}</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-1.5 text-cyan flex-1 md:flex-none min-w-[90px] max-w-[120px] md:max-w-none text-center">
            <Award className="w-4 h-4 md:w-4 md:h-4" strokeWidth={1.75} />
            <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider leading-tight">{t("trust.quality")}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
