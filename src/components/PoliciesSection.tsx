import { useRef, useState, useEffect } from "react";
import { Truck, Award, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function PaymentLogos() {
  return (
    <div className="flex items-center justify-center gap-4 mt-3">
      <svg className="w-7 h-7 text-cyan" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.23A.774.774 0 0 1 5.708 1.6h6.174c2.05 0 3.592.502 4.582 1.49.926.926 1.323 2.28 1.178 4.025-.018.216-.05.436-.094.66a6.928 6.928 0 0 1-.106.472c-.78 2.8-3.2 4.25-6.612 4.25H9.196a.96.96 0 0 0-.948.812l-.848 5.378a.643.643 0 0 1-.634.54l.31.11z"/>
        <path d="M19.253 7.746c-.803 3.6-3.494 5.158-7.27 5.158h-1.14a.96.96 0 0 0-.948.813l-.927 5.876a.534.534 0 0 0 .527.617h3.073a.774.774 0 0 0 .764-.652l.032-.164.605-3.832.039-.212a.774.774 0 0 1 .764-.652h.48c3.117 0 5.556-1.266 6.27-4.928.298-1.53.143-2.808-.645-3.706a3.083 3.083 0 0 0-.884-.681 7.963 7.963 0 0 1-.54 2.363z" opacity="0.7"/>
      </svg>
      <svg className="w-6 h-6 text-cyan" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.559 24h-3.118c-.678 0-1.227-.55-1.227-1.227v-2.136L2.605 21.8a1.227 1.227 0 0 1-1.069-.625 1.227 1.227 0 0 1 .027-1.238l8.17-13.02H3.354a1.227 1.227 0 0 1-1.227-1.228V2.554h-.002C2.125 1.876 2.675 1.327 3.353 1.327h3.119c.677 0 1.227.55 1.227 1.227v2.134l6.607-1.164a1.226 1.226 0 0 1 1.042 2.064L7.178 18.608h6.38c.678 0 1.228.55 1.228 1.227v2.937c0 .678-.55 1.228-1.227 1.228z"/>
      </svg>
      <svg className="w-6 h-6 text-cyan" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L6.5 7.5 8.38 9.38 12 5.76 15.62 9.38 17.5 7.5zM2 12l1.88-1.88L5.76 12l-1.88 1.88zm4.5 4.5L8.38 14.62 12 18.24l3.62-3.62L17.5 16.5 12 22zM18.24 12l1.88-1.88L22 12l-1.88 1.88zM12 9.53L9.53 12 12 14.47 14.47 12z"/>
      </svg>
    </div>
  );
}

export function PoliciesSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  const policies = [
    { icon: Truck, title: t("policies.shipping"), description: t("policies.shippingDesc") },
    { icon: Award, title: t("policies.quality"), description: t("policies.qualityDesc") },
    { icon: Shield, title: t("policies.paymentsTitle"), description: t("policies.paymentsText"), showLogos: true },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="policies" className="py-16 md:py-24 px-4 border-t border-border">
      <div className="container max-w-5xl mx-auto">
        <h2 className={`text-2xl md:text-4xl font-bold text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <span className="text-cyan">{t("policies.title")}</span> {t("policies.titleSuffix")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {policies.map((policy, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center p-6 transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: visible ? `${100 + i * 100}ms` : "0ms" }}
            >
              <policy.icon className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-bold text-sm md:text-base">{policy.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-2 leading-relaxed">{policy.description}</p>
              {policy.showLogos && <PaymentLogos />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
