import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Menu, X, Search, ShoppingBag, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.86a8.16 8.16 0 0 0 4.77 1.52V6.93a4.85 4.85 0 0 1-1.84-.24z" />
  </svg>
);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { lang, setLang, t } = useLanguage();
  const { itemCount } = useCart();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setQuery(params.get("q") ?? "");
  }, [params]);

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 60);
  }, [searchOpen]);

  const links = [
    { to: "/players", label: t("nav.players") },
    { to: "/retro", label: t("nav.retro") },
    { to: "/shorts", label: t("nav.shorts") },
    { to: "/national-teams", label: t("nav.national") },
    { to: "/about", label: t("nav.about") },
    { to: "/policies", label: t("nav.policies") },
  ];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setSearchOpen(false);
    setOpen(false);
  };

  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container max-w-6xl mx-auto grid grid-cols-3 items-center h-14 px-4">
        <div className="flex items-center">
          <button
            onClick={() => setOpen(true)}
            className="p-2 -ml-2 active:scale-95 transition-transform"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <Link
          to="/"
          className="justify-self-center font-black text-base md:text-lg uppercase tracking-[0.18em] whitespace-nowrap"
          aria-label="La 12 Store home"
        >
          <span className="text-cyan">LA 12</span> STORE
        </Link>

        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            aria-label="Search"
            className={`p-2 rounded-full transition-all duration-300 active:scale-90 hover:text-primary ${
              searchOpen ? "text-primary rotate-12 scale-110" : ""
            }`}
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("/checkout")}
            aria-label="Cart"
            className="relative p-2 rounded-full transition-transform active:scale-90 hover:text-primary"
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-border/40 transition-[max-height,opacity] duration-300 ease-out ${
          searchOpen ? "max-h-44 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <form onSubmit={onSubmit} className="container max-w-6xl mx-auto px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              placeholder={lang === "es" ? "Buscar camisetas..." : "Search jerseys..."}
              className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="mt-2.5 flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
              {t("search.trending")}:
            </span>
            {[
              { en: "Barcelona", es: "Barcelona", q: "Barcelona" },
              { en: "Retro", es: "Retro", q: "Retro" },
              { en: "New Season", es: "Nueva Temporada", q: "26/27" },
              { en: "Real Madrid", es: "Real Madrid", q: "Real Madrid" },
              { en: "Argentina", es: "Argentina", q: "Argentina" },
            ].map((tag) => (
              <button
                key={tag.q}
                type="button"
                onClick={() => {
                  setQuery(tag.q);
                  navigate(`/shop?q=${encodeURIComponent(tag.q)}`);
                  setSearchOpen(false);
                  setOpen(false);
                }}
                className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-cyan/40 text-cyan/90 hover:bg-cyan/10 hover:text-cyan transition-colors active:scale-95"
              >
                {lang === "es" ? tag.es : tag.en}
              </button>
            ))}
          </div>
        </form>
      </div>


      {open && createPortal(
        <>
          <div
            className="fixed inset-0 z-[99998] bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setOpen(false)}
          />
          <aside className="fixed top-0 left-0 z-[99999] h-full w-[82%] max-w-sm bg-background border-r border-border shadow-2xl flex flex-col animate-slide-in-from-left">
            <div className="flex items-center justify-between px-5 h-14 border-b border-border/50">
              <span className="font-black text-base uppercase tracking-[0.18em]">
                <span className="text-cyan">LA 12</span> STORE
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -mr-2 active:scale-95">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={`block py-3 text-base font-semibold tracking-wide uppercase border-b border-border/30 transition-colors ${
                        pathname === l.to ? "text-primary" : "hover:text-primary"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/584129058418"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-8 bg-primary text-primary-foreground font-bold text-xs text-center uppercase tracking-wider px-4 py-3 rounded"
              >
                {t("nav.orderWhatsapp")}
              </a>

              <div className="flex items-center justify-center gap-2 mt-6 text-xs font-mono tracking-wider text-muted-foreground">
                <button onClick={() => setLang("en")} className={lang === "en" ? "text-primary font-bold" : "hover:text-foreground"}>EN</button>
                <span className="opacity-40">|</span>
                <button onClick={() => setLang("es")} className={lang === "es" ? "text-primary font-bold" : "hover:text-foreground"}>ES</button>
              </div>

              <div className="flex items-center justify-center gap-5 mt-6 pt-4 border-t border-border/30">
                <a href="https://www.instagram.com/la12.official?igsh=MXRlY3VmMm1majZjZw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.tiktok.com/@official.la12team" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-primary transition-colors">
                  <TikTokIcon className="w-5 h-5" />
                </a>
              </div>
            </nav>
          </aside>
        </>,
        document.body
      )}
    </nav>
  );
}
