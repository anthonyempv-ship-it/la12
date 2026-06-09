import { useRef, useState, useEffect } from "react";
import { Instagram, MessageCircle } from "lucide-react";
import aboutImg from "@/assets/about-neymar.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* About / Story */}
      <section ref={ref} id="about" className="relative py-20 md:py-28 px-4 border-t border-border overflow-hidden">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <img
            src={aboutImg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[hsl(220_35%_7%/0.82)]" />
        </div>

        <div className="relative z-10 container max-w-3xl mx-auto text-center">
          <div
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ filter: visible ? "blur(0)" : "blur(4px)" }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-10">
              <span className="text-cyan">La 12</span> FC
            </h2>
          </div>

          <div
            className={`space-y-6 text-sm md:text-base leading-loose text-muted-foreground transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ filter: visible ? "blur(0)" : "blur(4px)" }}
          >
            <p>{t("about.en1")}</p>
            <p>{t("about.en2")}</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-16 md:py-20 px-4 border-t border-border bg-[hsl(var(--navy-deep))]">
        <div className="container max-w-2xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 uppercase tracking-wider">
            <span className="text-cyan">{t("contact.title")}</span>
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mb-8 md:mb-10">
            {t("contact.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center">
            <a
              href="https://www.instagram.com/la12.official?igsh=MXRlY3VmMm1majZjZw%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-cyan/10 border border-cyan/40 text-cyan font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded transition-all hover:bg-cyan/20 hover:shadow-[0_0_20px_hsl(192_99%_61%/0.3)] active:scale-95"
            >
              <Instagram className="w-4 h-4" />
              {t("contact.instagram")}
            </a>
            <a
              href="https://wa.me/584129058418"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded transition-all hover:shadow-[0_0_20px_hsl(192_99%_61%/0.3)] active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
