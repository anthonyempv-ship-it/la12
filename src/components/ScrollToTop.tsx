import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Forces scroll to (0,0) on every route change so that
 * entering a product, collection or section always starts at the top.
 */
export function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Use 'auto' to avoid distracting animation between pages
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search]);

  return null;
}
