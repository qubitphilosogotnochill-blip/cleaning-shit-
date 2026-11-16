/**
 * SITE CONFIGURATION
 * 
 * Customize your business name, contact info, service areas, 
 * pricing estimate baselines, and placeholders here.
 */

export const SITE_CONFIG = {
  // Business Identity (replace "[Business Name]" with your registered trade name)
  businessName: "[Business Name]",
  brandBadge: "Professional Residential & Commercial Cleaning",
  tagline: "Spotless Homes. Honest Pricing. Guaranteed Peace of Mind.",
  heroSubtitle: "Experience a meticulously clean home without lifting a finger. Vetted cleaners, eco-friendly supplies, and a 100% satisfaction guarantee on every visit.",
  
  // Contact & Location Details (Placeholders)
  contact: {
    phone: "(555) 382-7900",
    phoneRaw: "+15553827900",
    email: "quotes@yourcleaningservice.com",
    address: "100 Clean Living Way, Suite 250",
    hours: "Monday – Saturday: 8:00 AM – 6:30 PM",
    emergencyNote: "Weekend emergency cleanings available upon advance request."
  },

  // Service Area Coverage (Placeholder)
  serviceArea: {
    regionName: "Greater Metro Region & Suburbs",
    coverageList: [
      "Downtown & Central District",
      "Northside & Highland Park",
      "West End & Meadowbrook",
      "South Valley & Oakridge",
      "East River & Sunnydale"
    ],
    note: "Don't see your neighborhood? Contact us to verify coverage for your postal code."
  },

  // Services Catalog
  services: [
    {
      id: "standard",
      title: "Standard Cleaning",
      badge: "Most Popular",
      shortDesc: "Routine, thorough maintenance to keep your kitchen, bathrooms, and living spaces fresh and sparkling clean.",
      recommendedFor: "Weekly, bi-weekly, or monthly home maintenance.",
      estDuration: "2 – 3.5 hours",
      startingPrice: 129,
      features: [
        "Dusting all reachable surfaces, fans, & frames",
        "Vacuuming carpets & mopping hard floors",
        "Disinfecting kitchen countertops & stovetop",
        "Wiping exterior of appliances & cabinets",
        "Deep scrub of toilets, sinks, mirrors, & tubs",
        "Emptying all trash bins & replacing liners"
      ]
    },
    {
      id: "deep",
      title: "Deep Cleaning",
      badge: "Intensive Scrub",
      shortDesc: "An all-inclusive, heavy-duty reset for homes that haven't been professionally cleaned in 3+ months.",
      recommendedFor: "Seasonal resets, spring cleaning, or first-time service.",
      estDuration: "4 – 6 hours",
      startingPrice: 219,
      features: [
        "Everything included in the Standard Cleaning",
        "Detailed scrubbing of tile grout & bathroom buildup",
        "Hand-wiping baseboards, door frames, & light switches",
        "Deep dusting of window sills, blinds, & louvers",
        "Interior microwave cleaning & vent hood degreasing",
        "Scale removal on faucets, showers, & sinks"
      ]
    },
    {
      id: "move",
      title: "Move-In / Move-Out",
      badge: "Turnover Ready",
      shortDesc: "Complete top-to-bottom turnover cleaning designed to secure rental deposit returns and prep homes for new owners.",
      recommendedFor: "Tenants moving out, landlords, and new homebuyers.",
      estDuration: "5 – 7.5 hours",
      startingPrice: 289,
      features: [
        "Everything in Deep Cleaning package",
        "Interior & exterior cleaning of all empty cabinets & drawers",
        "Detailed wipe down of closets, shelves, & organizers",
        "Thorough floor edging and wall spot-checks",
        "Appliance deep wipe & utility closet dusting",
        "Deposit-return inspection guarantee checklist"
      ]
    }
  ],

  // Popular Optional Add-ons
  addOns: [
    { id: "oven", name: "Interior Oven Scrub", price: 35 },
    { id: "fridge", name: "Interior Fridge Clean", price: 35 },
    { id: "windows", name: "Interior Window Panes", price: 40 },
    { id: "laundry", name: "Wash & Fold Load", price: 25 }
  ],

  // How It Works Steps
  howItWorks: [
    {
      step: "01",
      title: "Request Your Free Quote",
      description: "Select your home size, preferred service level, and ideal date using our 60-second instant quote form."
    },
    {
      step: "02",
      title: "Confirm & Customize",
      description: "We verify your details, match you with a vetted, background-checked cleaning specialist, and bring all supplies."
    },
    {
      step: "03",
      title: "Relax in a Pristine Home",
      description: "Return to a sparkling clean living space backed by our 100% Satisfaction Re-clean Guarantee."
    }
  ],

  // Trust Pillars
  trustPillars: [
    {
      title: "100% Satisfaction Guarantee",
      description: "If any corner is missed or not up to standard, let us know within 24 hours and we'll re-clean it free of charge."
    },
    {
      title: "Licensed, Vetted & Insured",
      description: "Every cleaner undergoes identity verification, multi-state background checks, and hands-on skill training."
    },
    {
      title: "Eco-Friendly & Pet Safe",
      description: "We use non-toxic, plant-based cleaning solutions that protect children, pets, and indoor air quality."
    },
    {
      title: "Upfront & Transparent Rates",
      description: "Zero hidden charges, fuel surcharges, or surprise contracts. What you're quoted is what you pay."
    }
  ],

  // Trust Testimonials (Explicitly labeled as editable placeholders as required)
  testimonials: [
    {
      quote: "“Outstanding attention to detail. Coming home after a long workday to a spotless kitchen and immaculate floors has genuinely reduced my weekly stress.”",
      author: "[Client Name Placeholder]",
      location: "[Downtown Neighborhood Placeholder]",
      service: "Bi-Weekly Standard Cleaning",
      rating: 5
    },
    {
      quote: "“We booked a deep clean before hosting our annual family reunion. The team went above and beyond on our baseboards and bathrooms. Truly exceptional work!”",
      author: "[Client Name Placeholder]",
      location: "[Westside Community Placeholder]",
      service: "Deep Spring Cleaning",
      rating: 5
    },
    {
      quote: "“The move-out cleaning team ensured our landlord refunded 100% of our security deposit. Prompt, polite, and completely thorough from start to finish.”",
      author: "[Client Name Placeholder]",
      location: "[Suburbs Area Placeholder]",
      service: "Move-Out Turnover Cleaning",
      rating: 5
    }
  ],

  // Frequently Asked Questions
  faqs: [
    {
      q: "Do I need to supply cleaning equipment or products?",
      a: "No! Our cleaning professionals arrive equipped with commercial-grade vacuums, fresh microfiber cloths, and safe, eco-friendly supplies. If you prefer us to use a specialized product on specific surfaces (e.g., custom marble or hardwood oils), just leave it on the counter with instructions."
    },
    {
      q: "Do I have to be at home during the cleaning?",
      a: "That is entirely up to you. Many clients provide a secure lockbox code, digital key access, or leave a key with building concierge. All team members are fully background-checked, insured, and bonded for your complete peace of mind."
    },
    {
      q: "What is your 24-hour satisfaction guarantee?",
      a: "Your complete happiness is our priority. If you are dissatisfied with any specific area cleaned, contact us within 24 hours of service completion and we will dispatch a team member to re-clean the area at zero extra cost."
    },
    {
      q: "Can I reschedule or cancel my cleaning booking?",
      a: "Yes. You can reschedule or cancel any appointment free of charge up to 24 hours before your scheduled arrival window. Cancellations within 24 hours may incur a modest late fee to compensate our cleaners for reserved time."
    },
    {
      q: "Are you pet-friendly?",
      a: "Absolutely! We love pets and only utilize pet-safe, non-hazardous detergents. For the safety and comfort of both your furry family members and our cleaners, we just ask that energetic pets are kept in a safe room while vacuuming."
    }
  ]
};

