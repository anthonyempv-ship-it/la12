import { Link } from "react-router-dom";
import { Truck, Award, Shield, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.86a8.16 8.16 0 0 0 4.77 1.52V6.93a4.85 4.85 0 0 1-1.84-.24z"/>
  </svg>
);

export function Footer() {
  const { t } = useLanguage();

  const trust = [
    {
      icon: Truck,
      title: t("footer.shippingTag"),
      subtitle: t("footer.shippingSubtitle"),
      to: "/shipping-policy",
    },
    {
      icon: Award,
      title: t("footer.qualityTag"),
      subtitle: t("footer.qualitySubtitle"),
      to: "/policies",
    },
    {
      icon: Shield,
      title: t("footer.paymentsTag"),
      subtitle: t("footer.paymentsSubtitle"),
      to: "/policies",
    },
  ];

  return (
    <footer className="border-t border-border py-10 px-4 mt-8">
      <div className="container max-w-6xl mx-auto flex flex-col gap-8">
        {/* Trust row */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto w-full">
          {trust.map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className="flex flex-col items-center gap-2 text-center group"
            >
              <item.icon className="w-8 h-8 md:w-9 md:h-9 text-cyan transition-transform group-hover:scale-110" />
              <span className="font-bold text-sm md:text-base text-foreground uppercase tracking-wider">
                {item.title}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground leading-snug">
                {item.subtitle}
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground border-t border-border/40 pt-6">
          <p className="font-bold text-foreground">
            <span className="text-cyan">La 12</span> FC
          </p>
          <p>© {new Date().getFullYear()} La 12 FC. {t("footer.rights")}</p>
          <div className="flex items-center gap-4">
            <Link to="/shipping-policy" className="hover:text-primary transition-colors">{t("footer.shippingPolicy")}</Link>
            <Link to="/refund-policy" className="hover:text-primary transition-colors">{t("footer.refundPolicy")}</Link>
            <a href="https://www.instagram.com/la12.official?igsh=MXRlY3VmMm1majZjZw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.tiktok.com/@official.la12team" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-primary transition-colors">
              <TikTokIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
