
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Custom hook that scrolls to top of the page when the route changes
 */
export function useScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant" // Use "instant" instead of "smooth" to avoid visual issues during navigation
    });
  }, [pathname]);
}
