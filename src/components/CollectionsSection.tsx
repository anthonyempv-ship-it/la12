import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import imgNewSeason from "@/assets/jersey-psg-2627-home-front.jpg";
import imgClubTeams from "@/assets/jersey-barcelona-front.jpg";
import imgRetro from "@/assets/jersey-river-retro-away-front.jpg";
import imgNational from "@/assets/jersey-argentina-2026-home-front.jpg";
import imgShorts from "@/assets/shorts-arsenal-home-2526-front.jpg";
import imgLongSleeve from "@/assets/jersey-arsenal-ls-home-front.jpg";
import imgSpecial from "@/assets/jersey-bayern-serpent-front.jpg";

export function CollectionsSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const cards = [
    { label: t("collections.newSeason"), img: imgNewSeason, to: "/collection/new-season" },
    { label: t("collections.clubTeams"), img: imgClubTeams, to: "/collection/club-teams" },
    { label: t("collections.retro"), img: imgRetro, to: "/retro" },
    { label: t("collections.nationalTeams"), img: imgNational, to: "/national-teams" },
    { label: t("collections.shorts"), img: imgShorts, to: "/shorts" },
    { label: t("collections.longSleeve"), img: imgLongSleeve, to: "/collection/long-sleeve" },
    { label: t("collections.specialEditions"), img: imgSpecial, to: "/collection/special-editions" },
  ];

  return (
    <section className="py-10 md:py-14 px-4 border-t border-border">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 md:mb-8 uppercase">
          {t("collections.title")}
        </h2>

        <div className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-2 scrollbar-hide">
          {cards.map((c) => (
            <button
              key={c.label}
              onClick={() => navigate(c.to)}
              className="group relative shrink-0 w-[160px] md:w-[200px] aspect-[4/5] rounded-md overflow-hidden snap-start bg-secondary transition-transform duration-300 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan"
            >
              <img
                src={c.img}
                alt={c.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                <p className="text-white text-xs md:text-sm font-bold uppercase tracking-wider text-center">
                  {c.label}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
