import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type Lang = "en" | "es";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  "nav.home": { en: "Home", es: "Inicio" },
  "nav.shop": { en: "Shop All", es: "Toda la Tienda" },
  "nav.clubs": { en: "Clubs", es: "Clubes" },
  "nav.national": { en: "National Teams", es: "Selecciones" },
  "nav.shorts": { en: "Shorts", es: "Shorts" },
  "nav.players": { en: "Players", es: "Jugador" },
  "nav.retro": { en: "Retro", es: "Retro" },
  "nav.about": { en: "About Us", es: "Nosotros" },
  "nav.policies": { en: "Policies", es: "Políticas" },
  "nav.whatsapp": { en: "WhatsApp", es: "WhatsApp" },
  "nav.orderWhatsapp": { en: "Order via WhatsApp", es: "Pedí por WhatsApp" },
  "tag.freeShipping": { en: "Free Worldwide Shipping", es: "Envío Gratis a Todo el Mundo" },
  "footer.shippingTag": { en: "Worldwide Shipping", es: "Envío Mundial" },
  "footer.qualityTag": { en: "Elite Quality", es: "Calidad de Élite" },
  "footer.paymentsTag": { en: "Secure Payments", es: "Pagos Seguros" },
  "footer.shippingSubtitle": {
    en: "Receive your order at your doorstep.",
    es: "Te llega la camiseta hasta la puerta de tu casa.",
  },
  "footer.qualitySubtitle": {
    en: "Dress like a pro. High-tech versions.",
    es: "Vestite como un crack. Versiones high-tech.",
  },
  "footer.paymentsSubtitle": {
    en: "We accept PayPal, Zelle, and Binance.",
    es: "Aceptamos PayPal, Zelle y Binance.",
  },
  "pagination.prev": { en: "Prev", es: "Anterior" },
  "pagination.next": { en: "Next", es: "Siguiente" },

  // Hero
  "hero.tagline": { en: "Premium Football Jerseys", es: "Camisetas de Fútbol Premium" },
  "hero.line1": { en: "From the", es: "Del" },
  "hero.line2": { en: "Potrero", es: "Potrero" },
  "hero.line3": { en: "to the Pitch", es: "a la Cancha" },
  "hero.subtitle": { en: "Del Potrero a la Cancha", es: "From the Potrero to the Pitch" },
  "hero.shopNow": { en: "Shop Now", es: "Ver Camisetas" },
  "hero.ourStory": { en: "Our Story", es: "Nuestra Historia" },
  "hero.includes": {
    en: "Name • Number • Patches • FREE Worldwide Shipping — All Included",
    es: "Nombre • Dorsal • Parches • Envío GRATIS a Todo el Mundo — Todo Incluido",
  },
  "trust.shipping": { en: "Worldwide Shipping", es: "Envío Mundial" },
  "trust.trusted": { en: "Trusted by Football Fans", es: "Confiado por Hinchas" },
  "trust.quality": { en: "Premium Quality", es: "Calidad Premium" },
  "collections.title": { en: "Shop by Collection", es: "Comprá por Colección" },
  "collections.newSeason": { en: "New Season", es: "Nueva Temporada" },
  "collections.playerVersion": { en: "Player Version", es: "Versión Jugador" },
  "collections.retro": { en: "Retro Collection", es: "Colección Retro" },
  "collections.shorts": { en: "Shorts", es: "Shorts" },
  "topPicks.title": { en: "Top Picks", es: "Más Elegidos" },
  "topPicks.viewAll": { en: "View All", es: "Ver Todo" },

  // Shop
  "shop.title": { en: "Collection", es: "Colección" },
  "shop.subtitle": {
    en: "Player Versions & Retro Classics — All customizable",
    es: "Versiones Jugador y Clásicos Retro — Todas personalizables",
  },
  "shop.all": { en: "All", es: "Todas" },
  "shop.newSeason": { en: "New Season", es: "Nueva Temporada" },
  "shop.retroClassics": { en: "Retro Classics", es: "Clásicos Retro" },
  "shop.longSleeve": { en: "Long Sleeve", es: "Manga Larga" },
  "shop.specialEditions": { en: "Special Editions", es: "Ediciones Especiales" },
  "shop.shorts": { en: "Shorts", es: "Shorts" },
  "detail.shorts": { en: "Pro Shorts", es: "Shorts Pro" },
  "detail.addNumber": { en: "ADD NUMBER", es: "AGREGAR DORSAL" },
  "detail.addNumberPrice": { en: "+ $3.00 USD", es: "+ $3.00 USD" },
  "detail.addNumberHint": { en: "Toggle on to print a number on the shorts", es: "Activá para imprimir un dorsal en el short" },

  // Product Detail
  "detail.playerVersion": { en: "Player Version", es: "Versión Jugador" },
  "detail.retroClassic": { en: "Retro Classic", es: "Retro Clásica" },
  "detail.longSleeve": { en: "Long Sleeve", es: "Manga Larga" },
  "detail.specialEdition": { en: "Special Edition", es: "Edición Especial" },
  "detail.upgradeLongSleeve": { en: "Upgrade to Long Sleeve (+$5)", es: "Pasar a Manga Larga (+$5)" },
  "detail.longSleeveNote": {
    en: "If Long Sleeve is unavailable for your selection, we will contact you immediately",
    es: "Si la Manga Larga no está disponible para tu modelo, te avisamos al toque",
  },
  "detail.includes": {
    en: "✦ Name, Number, Patches & FREE WORLDWIDE SHIPPING Included",
    es: "✦ Nombre, Dorsal, Parches y ENVÍO GRATIS A TODO EL MUNDO Incluido",
  },
  "detail.size": { en: "Size", es: "Talla" },
  "detail.sizeGuide": { en: "Size Guide", es: "Guía de Tallas" },
  "detail.slimFit": {
    en: "⚡ Player fit is slim. We recommend ordering ONE SIZE UP.",
    es: "⚡ La Versión Jugador es entallada. Te recomendamos pedir UNA TALLA MÁS.",
  },
  "detail.name": { en: "Name", es: "Nombre" },
  "detail.number": { en: "Number", es: "Dorsal" },
  "detail.patches": { en: "Patches", es: "Parches" },
  "detail.customizeNameNumber": { en: "CUSTOMIZE NAME/NUMBER", es: "PERSONALIZAR NOMBRE/DORSAL" },
  "detail.customizeNameNumberPrice": { en: "+ $3.00 USD", es: "+ $3.00 USD" },
  "detail.addPatches": { en: "ADD PATCHES", es: "AGREGAR PARCHES" },
  "detail.addPatchesPrice": { en: "+ $2.00 USD", es: "+ $2.00 USD" },
  "detail.payment": { en: "Payment Method", es: "Método de Pago" },
  "detail.addToCart": { en: "Add to Cart", es: "Agregar al Carrito" },

  // Size Guide
  "sizeGuide.playerTitle": { en: "Player Version — Size Guide", es: "Versión Jugador — Guía de Tallas" },
  "sizeGuide.retroTitle": { en: "Retro / Fan Version — Size Guide", es: "Versión Retro / Hincha — Guía de Tallas" },
  "sizeGuide.playerTip": {
    en: "⚡ Player Editions have a Slim Fit. We recommend ordering ONE SIZE UP.",
    es: "⚡ Las Versiones Jugador son entalladas. Te recomendamos pedir UNA TALLA MÁS.",
  },
  "sizeGuide.retroTip": {
    en: "👕 Retro Editions have a standard, looser fit. Order your usual size.",
    es: "👕 Las Versiones Retro tienen un calce más holgado. Pedí tu talla habitual.",
  },
  "sizeGuide.measureNote": {
    en: "All measurements in cm. 1-2 cm error is acceptable due to elasticity.",
    es: "Medidas en cm. 1-2 cm de diferencia es normal por la elasticidad de la tela.",
  },
  "sizeGuide.height": { en: "Height", es: "Altura" },
  "sizeGuide.weight": { en: "Weight", es: "Peso" },
  "sizeGuide.chest": { en: "Chest", es: "Pecho" },
  "sizeGuide.shoulder": { en: "Shoulder", es: "Hombro" },
  "sizeGuide.sleeve": { en: "Sleeve", es: "Manga" },
  "sizeGuide.length": { en: "Length", es: "Largo" },

  // About
  "about.en1": {
    en: "We grew up playing barefoot on broken fields — the potrero, where talent is forged without academies or sponsors. From Venezuela to the world, we carry that raw passion for the beautiful game.",
    es: "Crecimos jugando descalzos en canchas rotas — el potrero, donde el talento se forja sin academias ni patrocinadores. Desde Venezuela para el mundo, llevamos esa pasión cruda por el fútbol.",
  },
  "about.en2": {
    en: "La 12 FC is for those who feel the game before they see it. Every jersey we curate tells a story — from the latest player editions engineered for performance, to retro classics that carry the weight of history.",
    es: "La 12 FC es para los que sienten el partido antes de verlo. Cada camiseta que elegimos cuenta una historia — desde las últimas Versiones Jugador diseñadas para rendir, hasta los clásicos retro que cargan el peso de la historia.",
  },

  // Policies
  "policies.title": { en: "Trust", es: "Confianza" },
  "policies.titleSuffix": { en: "& Policies", es: "& Políticas" },
  "policies.shipping": { en: "Worldwide Shipping", es: "Envío a Todo el Mundo" },
  "policies.shippingDesc": {
    en: "Receive your order at your doorstep, wherever you are.",
    es: "Te llega la camiseta hasta la puerta de tu casa, estés donde estés.",
  },
  "policies.quality": { en: "Elite Quality", es: "Calidad de Élite" },
  "policies.qualityDesc": {
    en: "Dress like a pro. High-tech versions with maximum detail.",
    es: "Vestite como un crack. Versiones de alta tecnología y máximo detalle.",
  },
  "policies.paymentsTitle": { en: "Secure Global Payments", es: "Pagos Globales Seguros" },
  "policies.paymentsText": {
    en: "We accept PayPal, Zelle, and Binance (USDT). Fast and reliable transactions.",
    es: "Aceptamos PayPal, Zelle y Binance (USDT). Transacciones rápidas y confiables.",
  },

  // Footer
  "footer.rights": { en: "All rights reserved.", es: "Todos los derechos reservados." },
  "footer.shippingPolicy": { en: "Shipping Policy", es: "Política de Envíos" },
  "footer.refundPolicy": { en: "Refund Policy", es: "Política de Reembolsos" },
  "footer.contact": { en: "Contact", es: "Contacto" },
  "contact.title": { en: "Contact Us", es: "Contactanos" },
  "contact.subtitle": {
    en: "Have a question? DM us on Instagram for fast support, or message us on WhatsApp.",
    es: "¿Tenés una duda? Mandanos un DM por Instagram para atención rápida, o escribinos por WhatsApp.",
  },
  "contact.instagram": { en: "DM @la12.official", es: "DM @la12.official" },
};

const fallbackLanguageContext: LanguageContextType = {
  lang: "en",
  setLang: () => {},
  t: (key: string) => translations[key]?.en ?? key,
};

const LanguageContext = createContext<LanguageContextType>(fallbackLanguageContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = sessionStorage.getItem("la12-lang");
      return (stored === "es" ? "es" : "en") as Lang;
    } catch {
      return "en";
    }
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { sessionStorage.setItem("la12-lang", l); } catch {}
  }, []);

  const t = useCallback((key: string) => {
    return translations[key]?.[lang] ?? key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
