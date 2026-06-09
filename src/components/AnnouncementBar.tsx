import { useLanguage } from "@/contexts/LanguageContext";

export function AnnouncementBar() {
  const { lang } = useLanguage();
  const text =
    lang === "es"
      ? "Entrega Estimada: 8 - 20 Días Hábiles"
      : "Estimated Delivery: 8 - 20 Business Days";

  return (
    <div className="bg-[hsl(220_35%_5%)] text-white text-[11px] md:text-xs font-medium tracking-wider uppercase text-center py-2 px-4">
      {text}
    </div>
  );
}
