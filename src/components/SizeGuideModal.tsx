import { X } from "lucide-react";
import type { ProductCategory } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";

interface SizeGuideModalProps {
  category: ProductCategory;
  onClose: () => void;
}

const playerSizes = [
  { size: "S", height: "160-165", weight: "55-60", chest: "46", shoulder: "40.5", sleeve: "24" },
  { size: "M", height: "165-170", weight: "60-70", chest: "48", shoulder: "41.9", sleeve: "24.8" },
  { size: "L", height: "170-175", weight: "70-80", chest: "50", shoulder: "43.3", sleeve: "25.6" },
  { size: "XL", height: "175-185", weight: "80-92.5", chest: "52", shoulder: "44.7", sleeve: "26.4" },
  { size: "2XL", height: "185-190", weight: "90-95", chest: "54", shoulder: "46.1", sleeve: "27.2" },
];

const retroSizes = [
  { size: "S", height: "160-170", weight: "60-65", length: "71", chest: "50", sleeve: "36.5" },
  { size: "M", height: "170-175", weight: "66-70", length: "73", chest: "52", sleeve: "38" },
  { size: "L", height: "175-180", weight: "71-75", length: "75", chest: "54", sleeve: "39.5" },
  { size: "XL", height: "180-185", weight: "76-80", length: "77", chest: "56", sleeve: "41" },
  { size: "2XL", height: "185-190", weight: "81-87", length: "81", chest: "59", sleeve: "42" },
  { size: "3XL", height: "190-195", weight: "88-95", length: "83", chest: "61", sleeve: "43" },
  { size: "4XL", height: "190-199", weight: "96-105", length: "85", chest: "63", sleeve: "44" },
];

const shortsSizes = [
  { size: "S", waist: "33", length: "45", height: "155-165", weight: "55-64" },
  { size: "M", waist: "34", length: "46", height: "163-170", weight: "62-70" },
  { size: "L", waist: "35", length: "49", height: "168-175", weight: "68-75" },
  { size: "XL", waist: "36", length: "51", height: "173-180", weight: "73-80" },
  { size: "2XL", waist: "37", length: "53", height: "178-195", weight: "78-110" },
];

export function SizeGuideModal({ category, onClose }: SizeGuideModalProps) {
  const isPlayer = category === "player";
  const isShorts = category === "shorts";
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="bg-card border border-border rounded-lg max-w-lg w-full max-h-[85vh] overflow-y-auto p-5 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">
            {isShorts ? "Shorts — Size guide" : isPlayer ? t("sizeGuide.playerTitle") : t("sizeGuide.retroTitle")}
          </h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-secondary transition-colors active:scale-95">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning */}
        <div className={`text-xs px-3 py-2 rounded mb-4 ${isPlayer ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"}`}>
          {isShorts ? "Measurements are approximate. Fit may vary slightly depending on the model and material elasticity." : isPlayer ? t("sizeGuide.playerTip") : t("sizeGuide.retroTip")}
        </div>

        <p className="text-[11px] text-muted-foreground mb-3">{t("sizeGuide.measureNote")}</p>

        {/* Table */}
        <div className="overflow-x-auto">
          {isShorts ? (
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-3 font-semibold text-primary">{t("detail.size")}</th>
                  <th className="text-left py-2 pr-3 font-semibold">Waist (cm)</th>
                  <th className="text-left py-2 pr-3 font-semibold">{t("sizeGuide.length")} (cm)</th>
                  <th className="text-left py-2 pr-3 font-semibold">{t("sizeGuide.height")}</th>
                  <th className="text-left py-2 font-semibold">{t("sizeGuide.weight")}</th>
                </tr>
              </thead>
              <tbody>
                {shortsSizes.map((row) => (
                  <tr key={row.size} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                    <td className="py-2 pr-3 font-bold text-primary">{row.size}</td>
                    <td className="py-2 pr-3">{row.waist}</td>
                    <td className="py-2 pr-3">{row.length}</td>
                    <td className="py-2 pr-3">{row.height}</td>
                    <td className="py-2">{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-3 font-semibold text-primary">{t("detail.size")}</th>
                  <th className="text-left py-2 pr-3 font-semibold">{t("sizeGuide.height")}</th>
                  <th className="text-left py-2 pr-3 font-semibold">{t("sizeGuide.weight")}</th>
                  <th className="text-left py-2 pr-3 font-semibold">{t("sizeGuide.chest")}</th>
                  {isPlayer ? (
                    <>
                      <th className="text-left py-2 pr-3 font-semibold">{t("sizeGuide.shoulder")}</th>
                      <th className="text-left py-2 font-semibold">{t("sizeGuide.sleeve")}</th>
                    </>
                  ) : (
                    <>
                      <th className="text-left py-2 pr-3 font-semibold">{t("sizeGuide.length")}</th>
                      <th className="text-left py-2 font-semibold">{t("sizeGuide.sleeve")}</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {(isPlayer ? playerSizes : retroSizes).map((row) => (
                  <tr key={row.size} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                    <td className="py-2 pr-3 font-bold text-primary">{row.size}</td>
                    <td className="py-2 pr-3">{row.height}</td>
                    <td className="py-2 pr-3">{row.weight}</td>
                    <td className="py-2 pr-3">{row.chest}</td>
                    {isPlayer ? (
                      <>
                        <td className="py-2 pr-3">{(row as typeof playerSizes[0]).shoulder}</td>
                        <td className="py-2">{row.sleeve}</td>
                      </>
                    ) : (
                      <>
                        <td className="py-2 pr-3">{(row as typeof retroSizes[0]).length}</td>
                        <td className="py-2">{row.sleeve}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
