/**
 * THEME MANAGER
 * Handles accessible theme selection, localStorage persistence, 
 * and live DOM updates across the 3 visual themes:
 * 1. Clean & Classic (default)
 * 2. Fresh & Natural
 * 3. Warm & Welcoming
 */

const STORAGE_KEY = "house_cleaning_theme";
const DEFAULT_THEME = "clean-classic";

export const THEMES = [
  {
    id: "clean-classic",
    name: "Clean & Classic",
    description: "Navy blue, crisp white, and light gray",
    swatches: ["#1e3a8a", "#ffffff", "#0284c7"]
  },
  {
    id: "fresh-natural",
    name: "Fresh & Natural",
    description: "Sage green, warm white, and muted beige",
    swatches: ["#2d5a43", "#faf8f4", "#52796f"]
  },
  {
    id: "warm-welcoming",
    name: "Warm & Welcoming",
    description: "Teal, cream, and soft coral",
    swatches: ["#0f5b66", "#fdfbf7", "#dd5b45"]
  }
];

export function getSavedTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && THEMES.some(t => t.id === saved)) {
      return saved;
    }
  } catch (e) {
    console.warn("localStorage is not accessible, using default theme", e);
  }
  return DEFAULT_THEME;
}

export function applyTheme(themeId) {
  const validTheme = THEMES.some(t => t.id === themeId) ? themeId : DEFAULT_THEME;
  document.documentElement.setAttribute("data-theme", validTheme);
  
  try {
    localStorage.setItem(STORAGE_KEY, validTheme);
  } catch (e) {
    console.warn("Unable to save theme to localStorage", e);
  }

  // Update theme UI controls
  updateThemeUI(validTheme);
  
  // Dispatch custom event for any listeners
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: validTheme } }));
}

function updateThemeUI(activeThemeId) {
  const currentTheme = THEMES.find(t => t.id === activeThemeId) || THEMES[0];
  
  // Update toggle button text and swatches
  document.querySelectorAll("[data-theme-active-label]").forEach(el => {
    el.textContent = currentTheme.name;
  });

  const swatchContainer = document.querySelector("[data-theme-active-swatch]");
  if (swatchContainer) {
    swatchContainer.innerHTML = currentTheme.swatches
      .map(c => `<span class="theme-dot" style="background-color: ${c}"></span>`)
      .join("");
  }

  // Update options list
  document.querySelectorAll(".theme-option").forEach(btn => {
    const isSelected = btn.getAttribute("data-theme-value") === activeThemeId;
    btn.classList.toggle("active", isSelected);
    btn.setAttribute("aria-selected", isSelected ? "true" : "false");
    
    // Update checkmark visibility
    const checkmark = btn.querySelector(".theme-check");
    if (checkmark) {
      checkmark.style.opacity = isSelected ? "1" : "0";
    }
  });
}

export function initThemeSelector() {
  // Apply initial theme immediately
  const initialTheme = getSavedTheme();
  applyTheme(initialTheme);

  const container = document.querySelector(".theme-selector-container");
  if (!container) return;

  const toggleBtn = container.querySelector(".theme-toggle-btn");
  const dropdown = container.querySelector(".theme-dropdown");
  const options = container.querySelectorAll(".theme-option");

  if (!toggleBtn || !dropdown) return;

  function openDropdown() {
    dropdown.classList.add("open");
    toggleBtn.setAttribute("aria-expanded", "true");
    const activeOption = dropdown.querySelector('.theme-option.active');
    if (activeOption) {
      activeOption.focus();
    }
  }

  function closeDropdown() {
    dropdown.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
  }

  // Toggle dropdown on button click
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains("open");
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  // Handle option selection
  options.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const themeId = btn.getAttribute("data-theme-value");
      applyTheme(themeId);
      closeDropdown();
      toggleBtn.focus();
    });

    // Keyboard navigation within the dropdown
    btn.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = options[(index + 1) % options.length];
        next.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = options[(index - 1 + options.length) % options.length];
        prev.focus();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeDropdown();
        toggleBtn.focus();
      } else if (e.key === "Tab") {
        closeDropdown();
      }
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
      closeDropdown();
    }
  });

  // Close on Escape from toggle button
  toggleBtn.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDropdown();
    }
  });
}
