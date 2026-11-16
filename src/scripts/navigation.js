/**
 * NAVIGATION & SCROLL MANAGEMENT
 * Handles responsive mobile navigation drawer, keyboard traps,
 * smooth scrolling, active section spy, and header scroll styling.
 */

export function initNavigation() {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".mobile-nav-toggle");
  const mobileDrawer = document.querySelector(".mobile-drawer");
  const navLinks = document.querySelectorAll(".nav-link");

  // Sticky Header Scroll Effect
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.classList.add("site-header-scrolled");
      } else {
        header.classList.remove("site-header-scrolled");
      }
    }, { passive: true });
  }

  // Mobile Drawer Toggle
  if (navToggle && mobileDrawer) {
    function openDrawer() {
      navToggle.classList.add("open");
      mobileDrawer.classList.add("open");
      navToggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      
      const firstFocusable = mobileDrawer.querySelector("a, button");
      if (firstFocusable) firstFocusable.focus();
    }

    function closeDrawer() {
      navToggle.classList.remove("open");
      mobileDrawer.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.classList.contains("open");
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // Close on navigation link click
    mobileDrawer.querySelectorAll(".nav-link, .btn").forEach(link => {
      link.addEventListener("click", () => {
        closeDrawer();
      });
    });

    // Close on Escape
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileDrawer.classList.contains("open")) {
        closeDrawer();
        navToggle.focus();
      }
    });
  }

  // Active Navigation Link Spy via IntersectionObserver
  const sections = document.querySelectorAll("section[id]");
  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");
          navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (href === `#${currentId}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    }, {
      rootMargin: "-20% 0px -70% 0px"
    });

    sections.forEach(sec => observer.observe(sec));
  }

  // Set current year in footer
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
