import fs from 'fs';

console.log("=== COMPREHENSIVE VERIFICATION SUITE ===");

const html = fs.readFileSync('dist/index.html', 'utf8');
const distFiles = fs.readdirSync('dist/assets');
const cssFile = distFiles.find(f => f.endsWith('.css'));
const jsFile = distFiles.find(f => f.endsWith('.js'));

const css = fs.readFileSync(`dist/assets/${cssFile}`, 'utf8');
const js = fs.readFileSync(`dist/assets/${jsFile}`, 'utf8');

let errors = [];

// 1. Check semantic sections
const requiredSections = [
  'id="hero"',
  'id="services"',
  'id="how-it-works"',
  'id="trust"',
  'id="reviews"',
  'id="quote"',
  'id="faq"'
];

requiredSections.forEach(sec => {
  if (!html.includes(sec)) {
    errors.push(`Missing section: ${sec}`);
  } else {
    console.log(`[PASS] Section ${sec} present`);
  }
});

// 2. Check 3 Themes in CSS
const requiredThemes = [
  'cyber-dark',
  'clean-classic',
  'fresh-natural',
  'warm-welcoming'
];

requiredThemes.forEach(theme => {
  if (!css.includes(`[data-theme=${theme}]`) && !css.includes(`[data-theme="${theme}"]`)) {
    errors.push(`Missing CSS definitions for theme: ${theme}`);
  } else {
    console.log(`[PASS] Theme ${theme} CSS rules present`);
  }
  if (!html.includes(`data-theme-value="${theme}"`)) {
    errors.push(`Missing theme option button for: ${theme}`);
  } else {
    console.log(`[PASS] Theme option button for ${theme} present in HTML`);
  }
});

// 3. Check Form Elements
const requiredFormElements = [
  'id="quote-name"',
  'id="quote-email"',
  'id="quote-phone"',
  'id="quote-service"',
  'id="quote-bedrooms"',
  'id="quote-bathrooms"',
  'id="quote-frequency"',
  'id="quote-message"',
  'id="quote-success-state"',
  'id="preview-total-price"'
];

requiredFormElements.forEach(elem => {
  if (!html.includes(elem)) {
    errors.push(`Missing form element: ${elem}`);
  } else {
    console.log(`[PASS] Form element ${elem} present`);
  }
});

// 4. Check Navigation & Accessibility
if (!html.includes('class="skip-link"')) errors.push("Missing skip to content link");
if (!html.includes('aria-label="Select website visual theme"')) errors.push("Missing accessible theme button label");
if (!html.includes('class="mobile-nav-toggle"')) errors.push("Missing mobile nav toggle");
if (!html.includes('role="dialog"') && !html.includes('class="mobile-drawer"')) errors.push("Missing mobile drawer");

// 5. Check SVG assets & Fallbacks
if (!fs.existsSync('public/favicon.svg')) errors.push("Missing public/favicon.svg");
if (!fs.existsSync('public/cleaner-hero.svg')) errors.push("Missing public/cleaner-hero.svg");
if (!fs.existsSync('public/robots.txt')) errors.push("Missing public/robots.txt");

// 6. Check JS logic
if (!js.includes("house_cleaning_theme")) errors.push("Missing theme persistence logic in JS");
if (!js.includes("calculateEstimate") && !js.includes("BASE_RATES")) {
  // Vite might mangle variable names, check math or strings
  if (!js.includes("Standard Cleaning") && !js.includes("Deep Cleaning")) {
    errors.push("Missing service data in bundled JS");
  }
}

if (errors.length > 0) {
  console.error("FAILURES DETECTED:", errors);
  process.exit(1);
} else {
  console.log("\nALL VERIFICATION CHECKS PASSED SUCCESSFULLY!");
  console.log("HTML bundle size:", (html.length / 1024).toFixed(2), "KB");
  console.log("CSS bundle size:", (css.length / 1024).toFixed(2), "KB");
  console.log("JS bundle size:", (js.length / 1024).toFixed(2), "KB");
}
