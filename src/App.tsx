import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import ShippingPolicyPage from "./pages/ShippingPolicyPage.tsx";
import RefundPolicyPage from "./pages/RefundPolicyPage.tsx";
import ShopPage from "./pages/ShopPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import PoliciesPage from "./pages/PoliciesPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route
                path="/shop"
                element={<ShopPage titleKey={{ en: "Shop All", es: "Tienda" }} subtitleKey={{ en: "All jerseys, A–Z", es: "Todas las camisetas, A–Z" }} />}
              />
              <Route
                path="/clubs"
                element={<ShopPage forceTeamType="club" titleKey={{ en: "Clubs", es: "Clubes" }} subtitleKey={{ en: "Club kits — Player, Retro & Long Sleeve", es: "Camisetas de clubes — Jugador, Retro y Manga Larga" }} />}
              />
              <Route
                path="/players"
                element={<ShopPage forceCategory="player" titleKey={{ en: "Players", es: "Jugador" }} subtitleKey={{ en: "Player versions — pro fit, pro feel", es: "Versiones Jugador — corte y sensación pro" }} />}
              />
              <Route
                path="/retro"
                element={<ShopPage forceCategory="retro" titleKey={{ en: "Retro", es: "Retro" }} subtitleKey={{ en: "Classic kits from legendary eras", es: "Camisetas clásicas de eras legendarias" }} showBackToHome />}
              />
              <Route
                path="/national-teams"
                element={<ShopPage forceTeamType="national" titleKey={{ en: "National Teams", es: "Selecciones" }} subtitleKey={{ en: "International kits — Player & Special Editions", es: "Camisetas de selecciones — Jugador y Ediciones Especiales" }} showBackToHome />}
              />
              <Route
                path="/shorts"
                element={<ShopPage forceCategory="shorts" titleKey={{ en: "Shorts", es: "Shorts" }} subtitleKey={{ en: "Pro match shorts — lightweight & breathable", es: "Shorts de partido — livianos y transpirables" }} showBackToHome />}
              />

              {/* Collection routes (homepage carousel) */}
              <Route
                path="/collection/new-season"
                element={
                  <ShopPage
                    filterKey="new-season"
                    titleKey={{ en: "New Season 26/27", es: "Nueva Temporada 26/27" }}
                    subtitleKey={{ en: "Latest kits, fresh off the pitch", es: "Las últimas equipaciones recién salidas de la cancha" }}
                    showBackToHome
                  />
                }
              />
              <Route
                path="/collection/club-teams"
                element={
                  <ShopPage
                    filterKey="club-teams"
                    titleKey={{ en: "Club Teams", es: "Clubes" }}
                    subtitleKey={{ en: "Short sleeve club jerseys", es: "Camisetas de clubes manga corta" }}
                    showBackToHome
                  />
                }
              />
              <Route
                path="/collection/long-sleeve"
                element={
                  <ShopPage
                    forceCategory="longsleeve"
                    titleKey={{ en: "Long Sleeve", es: "Manga Larga" }}
                    subtitleKey={{ en: "Long sleeve kits for cold matchdays", es: "Camisetas manga larga para los días fríos" }}
                    showBackToHome
                  />
                }
              />
              <Route
                path="/collection/special-editions"
                element={
                  <ShopPage
                    forceCategory="special"
                    titleKey={{ en: "Special Editions", es: "Ediciones Especiales" }}
                    subtitleKey={{ en: "Limited drops, designer & commemorative kits", es: "Lanzamientos limitados, de diseñador y conmemorativos" }}
                    showBackToHome
                  />
                }
              />

              <Route path="/about" element={<AboutPage />} />
              <Route path="/policies" element={<PoliciesPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
              <Route path="/refund-policy" element={<RefundPolicyPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
