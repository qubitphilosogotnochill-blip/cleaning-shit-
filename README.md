# [Business Name] — House Cleaning Services Website

A modern, fast, responsive website for a professional house-cleaning service. Built with semantic HTML5, modern CSS3 variables for live theme switching, and vanilla JavaScript for client-side instant quote estimation and validation. Zero runtime dependencies, high accessibility (WCAG AA), and ready for immediate deployment to Vercel or GitHub Pages.

---

## Features

- **3 Visual Themes with Persistent Selector:**
  - **Clean & Classic (Default):** Navy blue, crisp white, and light gray.
  - **Fresh & Natural:** Sage green, warm white, and muted beige.
  - **Warm & Welcoming:** Teal, cream, and soft coral.
  - Remembers user choice across visits via `localStorage`. Accessible via keyboard and screen readers with live palette swatches.
- **Instant Quote & Live Cost Estimator:**
  - Real-time calculation based on service type (Standard, Deep, Move-In/Out), bedrooms, bathrooms, and cleaning frequency (Weekly 15% off, Bi-weekly 10% off, Monthly 5% off).
  - Client-side validation with accessible inline error feedback.
  - Polished success state with submitted order summary (clearly noted as client-side demo ready for backend integration).
- **Core Business Sections:**
  - Responsive navigation with sticky blur header and mobile drawer.
  - Hero section with high-contrast copy, dual CTAs, trust badges, and resilient image fallback.
  - Services section detailing Standard, Deep, and Move-In/Move-Out cleans with quick-booking actions.
  - 3-step "How It Works" booking process overview.
  - Trust section with satisfaction guarantees, insurance badges, and editable customer review placeholders.
  - Accessible FAQ accordion (`<details>` / `<summary>`).
  - Comprehensive footer with business hours, contact placeholders, and service area list.

---

## File Structure

```text
├── index.html                   # Main semantic webpage markup
├── package.json                 # Project configuration and build scripts
├── test-verification.js         # Automated verification test suite
├── .gitignore                   # Git ignore rules for node_modules and dist
├── public/
│   ├── favicon.svg              # SVG brand mark favicon
│   ├── cleaner-hero.svg         # Resilient offline/fallback hero graphic
│   └── robots.txt               # Search engine crawler directives
└── src/
    ├── scripts/
    │   ├── config.js            # Centralized business info, phone, email & services
    │   ├── theme.js             # Theme manager & accessible selector
    │   ├── quote-calculator.js  # Live estimate math & form validation
    │   ├── navigation.js        # Mobile drawer, active section spy & scroll logic
    │   └── main.js              # Application bootstrapper
    └── styles/
        ├── variables.css        # CSS custom properties for all 3 color themes
        ├── main.css             # Base reset, typography, and utility classes
        └── components.css       # Section and component styles
```

---

## Customizing Your Business Details

All business copy, contact numbers, and service parameters are organized for quick editing:

1. **Business Name & Contact Details:**
   - Open `src/scripts/config.js` to change:
     - `businessName`: Set from `[Business Name]` to your actual company name.
     - `phone`: Your contact phone number.
     - `email`: Your quotes or support email.
     - `serviceArea`: List of neighborhoods and regions you serve.
     - `hours`: Your operating schedule.
   - In `index.html`, replace occurrences of `[Business Name]` in the `<title>`, `<header>`, and `<footer>`.

2. **Services & Pricing:**
   - In `src/scripts/config.js` and `src/scripts/quote-calculator.js`, adjust `BASE_RATES` to match your local market rates for Standard, Deep, and Move-In/Move-Out cleanings.

3. **Customer Reviews & Testimonials:**
   - In `index.html` (under section `#reviews`) and `src/scripts/config.js`, replace the placeholder testimonial cards with your actual verified customer reviews.

---

## Local Development

### Prerequisites
- Node.js (v18 or newer recommended)
- npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Local Dev Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser. Changes will hot-reload automatically.

### 3. Run the Verification Tests
```bash
npm test
```
Verifies that all sections, CSS themes, form fields, and required assets are correctly integrated.

### 4. Build for Production
```bash
npm run build
```
Creates optimized static HTML, CSS, and JS files in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## Deploying to Vercel

This repository is optimized for zero-config Vercel deployment:

### Option A: Via GitHub (Recommended)
1. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: house cleaning service website"
   ```
2. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
4. Import your GitHub repository.
5. Vercel automatically detects **Vite**:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Click **Deploy**. Your site will be live on a `*.vercel.app` domain with free SSL.

### Option B: Via Vercel CLI
```bash
npx vercel
```
Follow the interactive prompts to link and deploy your project directly.

---

## Connecting Form Submissions to a Backend

The quote form currently runs in **client-side demo mode**:
- To forward submissions to your email without a server, connect a service like Formspree, Formkeep, or Web3Forms by setting the `<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`.
- Or connect an API route / serverless function in `src/scripts/quote-calculator.js` to dispatch webhooks to your CRM or scheduling tool (e.g., Jobber, Housecall Pro, Zapier).

---

## License

MIT License. Free to use and customize for residential and commercial cleaning services.

