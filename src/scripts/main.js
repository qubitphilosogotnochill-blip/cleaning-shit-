/**
 * MAIN CLIENT ENTRY POINT
 * Initializes themes, navigation, quote estimator, and robust image fallbacks.
 */

import { initThemeSelector } from "./theme.js";
import { initNavigation } from "./navigation.js";
import { initQuoteCalculator } from "./quote-calculator.js";
import { SITE_CONFIG } from "./config.js";

// Make site config available globally for convenience
window.SITE_CONFIG = SITE_CONFIG;

function initApp() {
  // Initialize theme selector and load saved preference
  initThemeSelector();

  // Initialize navigation and mobile menu
  initNavigation();

  // Initialize interactive quote calculator and client-side form validation
  initQuoteCalculator();

  // Setup robust image fallback handlers
  document.querySelectorAll("img[data-fallback]").forEach(img => {
    img.addEventListener("error", function handleImgError() {
      const fallbackSrc = this.getAttribute("data-fallback");
      if (fallbackSrc && this.src !== fallbackSrc) {
        this.src = fallbackSrc;
      }
    }, { once: true });
  });

  console.log(`[${SITE_CONFIG.businessName}] Website Initialized Successfully.`);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
