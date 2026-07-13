import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products, type ProductCategory, type TeamType, type Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";

const TOP_PICKS_LIMIT = 16;
const PAGE_SIZE = 16;

export type CollectionFilterKey = "new-season" | "club-teams";

const collectionPredicates: Record<CollectionFilterKey, (p: Product) => boolean> = {
  "new-season": (p) =>
    /2627/i.test(p.id) || /26\s*\/\s*27/.test(p.name) || /26\s*\/\s*27/.test(p.nameEs),
  "club-teams": (p) => p.teamType === "club" && p.category === "player",
};

// Priority products (in order) featured at the top of Top Picks on the homepage.
const TOP_PICKS_PRIORITY_IDS: string[] = [
  "argentina-2026-home",
  "france-2026-home",
  "england-2026-home",
  "spain-2026-home",
  "barcelona-2627-home",
  "real-madrid-ls-home-0607",
];

// All store categories that must be represented in Top Picks.
const REQUIRED_CATEGORIES: ProductCategory[] = [
  "player",
  "retro",
  "longsleeve",
  "special",
  "shorts",
];
const REQUIRED_TEAM_TYPES: TeamType[] = ["club", "national"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildTopPicks(all: Product[]): Product[] {
  const byId = new Map(all.map((p) => [p.id, p]));
  const picked: Product[] = [];
  const pickedIds = new Set<string>();

  const add = (p?: Product) => {
    if (!p || pickedIds.has(p.id)) return;
    picked.push(p);
    pickedIds.add(p.id);
  };

  // 1. Priority products first, in order.
  for (const id of TOP_PICKS_PRIORITY_IDS) add(byId.get(id));

  // 2. Guarantee at least one of each required category.
  for (const cat of REQUIRED_CATEGORIES) {
    if (picked.some((p) => p.category === cat)) continue;
    const candidate = shuffle(all.filter((p) => p.category === cat && !pickedIds.has(p.id)))[0];
    add(candidate);
  }

  // 3. Guarantee at least one of each team type.
  for (const tt of REQUIRED_TEAM_TYPES) {
    if (picked.some((p) => p.teamType === tt)) continue;
    const candidate = shuffle(all.filter((p) => p.teamType === tt && !pickedIds.has(p.id)))[0];
    add(candidate);
  }

  // 4. Append the rest of the catalog in random order (no duplicates).
  for (const p of shuffle(all.filter((p) => !pickedIds.has(p.id)))) add(p);

  return picked;
}

interface ProductGridProps {
  forceTeamType?: TeamType;
  forceCategory?: ProductCategory;
  filterKey?: CollectionFilterKey;
  hideCategoryFilter?: boolean;
  hideHeading?: boolean;
  limit?: number;
  showViewAll?: boolean;
  headingOverride?: string;
}

export function ProductGrid({
  forceTeamType,
  forceCategory,
  filterKey,
  hideHeading,
  limit,
  showViewAll,
  headingOverride,
}: ProductGridProps = {}) {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const searchQuery = params.get("q")?.trim() ?? "";
  const sectionRef = useRef<HTMLElement | null>(null);
  const [page, setPage] = useState(1);

  // Detect homepage Top Picks mode: limited list, no filters/search/force
  const isTopPicks =
    !!limit &&
    !searchQuery &&
    !forceTeamType &&
    !forceCategory &&
    !filterKey;

  const filtered = useMemo(() => {
    if (isTopPicks) {
      return buildTopPicks(products);
    }
    const collectionPredicate = filterKey ? collectionPredicates[filterKey] : null;
    return products
      .filter((p) => (forceTeamType ? p.teamType === forceTeamType : true))
      .filter((p) => {
        if (forceCategory === "shorts") return p.category === "shorts";
        if (forceCategory) return p.category === forceCategory;
        if (collectionPredicate) return collectionPredicate(p);
        return p.category !== "shorts";
      })
      .filter((p) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        const name = (lang === "es" ? p.nameEs : p.name).toLowerCase();
        return name.includes(q);
      })
      .sort((a, b) => {
        const nameA = (lang === "es" ? a.nameEs : a.name).toLowerCase();
        const nameB = (lang === "es" ? b.nameEs : b.name).toLowerCase();
        return nameA.localeCompare(nameB);
      });
  }, [searchQuery, lang, forceTeamType, forceCategory, filterKey, isTopPicks, limit]);

  // Reset page on filter/search change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, forceTeamType, forceCategory, filterKey]);

  const paginate = !limit;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const items = paginate
    ? filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
    : filtered.slice(0, limit);

  const goToPage = (n: number) => {
    const next = Math.min(Math.max(1, n), totalPages);
    setPage(next);
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  // Build compact page list with ellipsis
  const pageList = useMemo<(number | "…")[]>(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const set = new Set<number>([1, totalPages, safePage, safePage - 1, safePage + 1]);
    const sorted = [...set].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);
    const out: (number | "…")[] = [];
    sorted.forEach((n, i) => {
      if (i > 0 && n - (sorted[i - 1] as number) > 1) out.push("…");
      out.push(n);
    });
    return out;
  }, [totalPages, safePage]);

  return (
    <section id="products" ref={sectionRef} className="py-12 md:py-16 px-4 scroll-mt-24">
      <div className="container max-w-6xl mx-auto">
        {!hideHeading && (
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight uppercase">
              {headingOverride ?? t("topPicks.title")}
            </h2>
          </div>
        )}

        {searchQuery && (
          <p className="text-center text-sm text-muted-foreground mb-6">
            {lang === "es" ? "Resultados para" : "Results for"}{" "}
            <span className="text-foreground font-semibold">"{searchQuery}"</span>
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => navigate(`/product/${product.id}`)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            {lang === "es" ? "No se encontraron resultados" : "No results found"}
          </p>
        )}

        {paginate && totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
          >
            <button
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
              className="inline-flex items-center gap-1 px-3 md:px-4 h-10 rounded border border-cyan/40 text-cyan text-xs md:text-sm font-bold uppercase tracking-wider transition-all hover:bg-cyan/10 hover:shadow-[0_0_15px_hsl(192_99%_61%/0.3)] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t("pagination.prev")}</span>
            </button>

            {pageList.map((p, i) =>
              p === "…" ? (
                <span key={`e-${i}`} className="px-1 text-muted-foreground select-none">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  aria-current={p === safePage ? "page" : undefined}
                  className={
                    p === safePage
                      ? "min-w-10 h-10 px-3 rounded bg-cyan text-primary-foreground font-bold text-sm shadow-[0_0_20px_hsl(192_99%_61%/0.5)]"
                      : "min-w-10 h-10 px-3 rounded border border-border text-foreground/80 font-bold text-sm hover:border-cyan/60 hover:text-cyan transition-colors"
                  }
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
              className="inline-flex items-center gap-1 px-3 md:px-4 h-10 rounded border border-cyan/40 text-cyan text-xs md:text-sm font-bold uppercase tracking-wider transition-all hover:bg-cyan/10 hover:shadow-[0_0_15px_hsl(192_99%_61%/0.3)] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">{t("pagination.next")}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>
        )}

        {showViewAll && !paginate && filtered.length > items.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => navigate("/shop")}
              className="border border-cyan/50 text-cyan font-bold uppercase tracking-wider text-sm px-8 py-3.5 rounded transition-all duration-200 hover:bg-cyan/10 hover:shadow-[0_0_20px_hsl(192_99%_61%/0.3)] active:scale-95"
            >
              {t("topPicks.viewAll")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export { TOP_PICKS_LIMIT, PAGE_SIZE };
