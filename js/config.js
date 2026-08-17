/**
 * ============================================================================
 *  SITE CONTENT CONFIG
 *  Everything on the site — text, sections, order, portfolio categories,
 *  pricing, testimonials — is edited here. You should not need to touch
 *  index.html or main.js to update copy, add a section, or reorder things.
 *
 *  To add photos: drop files into /Portfolio-images/<category>/ and run
 *  `node scripts/generate-manifest.js`. To add a whole new category, create
 *  the folder, add it to `portfolio.categories` below, run the script.
 * ============================================================================
 */

window.SITE_CONFIG = {
  meta: {
    title: "Gayatri Narayanan — Commercial & Lifestyle Photographer",
    description:
      "Gayatri Narayanan is a Dubai-based commercial and lifestyle photographer specializing in brand campaigns, fashion, food, product, automotive, and hospitality photography.",
    favicon: "Portfolio-images/hero/hero-01.jpg",
  },

  brand: {
    name: "Gayatri Narayanan",
    shortName: "GN",
    tagline: "Photography",
    location: "Dubai, UAE",
    email: "hello@gayatrinarayanan.com",
    phone: "+971 50 000 0000",
    instagram: "https://instagram.com/",
    behance: "https://www.behance.net/Gayatri_Narayanan",
    linkedin: "https://linkedin.com/",
  },

  // Controls which sections render, and in what order.
  // Flip `enabled: false` to hide a section without deleting its content.
  sections: [
    { id: "hero", enabled: true },
    { id: "marquee", enabled: true },
    { id: "about", enabled: true },
    { id: "services", enabled: true },
    { id: "portfolio", enabled: true },
    { id: "process", enabled: true },
    { id: "clients", enabled: true },
    { id: "testimonials", enabled: true },
    { id: "pricing", enabled: true },
    { id: "journal", enabled: false },
    { id: "contact", enabled: true },
  ],

  nav: {
    links: [
      { label: "Work", href: "#portfolio" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
      { label: "Journal", href: "#journal" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Book a shoot", href: "#contact" },
  },

  hero: {
    eyebrow: "Commercial & Lifestyle Photographer · Dubai",
    heading: "Images that turn\nideas into results.",
    subheading:
      "I help brands, hospitality groups, and campaigns move people — through art-directed, story-led photography, from concept on set to final retouch.",
    primaryCta: { label: "View the work", href: "#portfolio" },
    secondaryCta: { label: "Start a project", href: "#contact" },
    image: "Portfolio-images/hero/hero-01.jpg",
    stats: [
      { value: "5+", label: "Years shooting commercially" },
      { value: "40+", label: "Brand campaigns delivered" },
      { value: "1,000+", label: "Portfolio views on Behance" },
    ],
  },

  marquee: {
    // Scrolling strip of category names — purely decorative/branding.
    items: [
      "Brand Campaigns",
      "Fashion",
      "Food",
      "Product",
      "Automotive",
      "Hospitality",
      "Sports",
      "Portraiture",
    ],
  },

  about: {
    eyebrow: "About",
    heading: "Art direction and a camera,\npointed at the same goal.",
    body: [
      "I'm Gayatri, a commercial and lifestyle photographer based in Dubai with over five years of experience turning briefs into imagery that performs — on shelves, in campaigns, and across feeds.",
      "My work spans art direction, on-set production, and high-end retouching. I've shot brand campaigns, fashion and corporate portraiture, food and product stories, automotive and hospitality interiors, and sports coverage — always starting from the same question: what does this image need to do?",
      "Previously a Creative Content Creator at Cosette (Qatar) and Photographer & Videographer at The Third Studio (Qatar), I now work directly with brands and agencies from concept through final delivery.",
    ],
    image: "Portfolio-images/about/about-portrait.jpg",
    signatureLine: "Gayatri Narayanan",
    resumeHighlights: [
      { label: "Based in", value: "Dubai, UAE" },
      { label: "Available for", value: "Freelance & full-time" },
      { label: "Specialty", value: "Art direction, on-set production, retouching" },
    ],
  },

  services: {
    eyebrow: "Services",
    heading: "How I can help your brand",
    subheading:
      "Every project is scoped around the outcome — a campaign, a catalogue, a launch — not just a shot list.",
    items: [
      {
        title: "Brand Campaigns",
        description:
          "Concept-to-delivery campaign photography — art direction, casting support, and production for launches and seasonal pushes.",
        image: "Portfolio-images/campaigns/campaign-01.jpg",
      },
      {
        title: "Fashion & Portraiture",
        description:
          "Editorial and commercial fashion imagery, corporate headshots, and portraiture with a clean, modern retouch.",
        image: "Portfolio-images/fashion/fashion-01.jpg",
      },
      {
        title: "Food & Product",
        description:
          "Appetite-driving food photography and clean product/lifestyle imagery for menus, packaging, and e-commerce.",
        image: "Portfolio-images/food/food-01.jpg",
      },
      {
        title: "Automotive & Hospitality",
        description:
          "Showroom, interiors, and automotive photography that sells space and design — for dealerships, hotels, and real estate.",
        image: "Portfolio-images/automobile/auto-01.jpg",
      },
    ],
  },

  portfolio: {
    eyebrow: "Selected Work",
    heading: "A body of work built\non brand results.",
    subheading:
      "Filter by category or browse everything. Click any image to view it full-frame.",
    // Each category maps to a folder name in /Portfolio-images and a key in js/manifest.json
    categories: [
      { key: "campaigns", label: "Campaigns" },
      { key: "fashion", label: "Fashion" },
      { key: "food", label: "Food" },
      { key: "product", label: "Product" },
      { key: "automobile", label: "Automotive" },
      { key: "hospitality", label: "Hospitality" },
      { key: "sports", label: "Sports" },
      { key: "portraits", label: "Portraits" },
    ],
  },

  process: {
    eyebrow: "Process",
    heading: "From brief to final delivery",
    steps: [
      {
        number: "01",
        title: "Discovery call",
        description:
          "We talk through the brand, the goal for the imagery, and where it'll live — campaign, catalogue, social, or print.",
      },
      {
        number: "02",
        title: "Art direction & mood board",
        description:
          "I put together references, shot lists, and a production plan — locations, styling, casting, and timing.",
      },
      {
        number: "03",
        title: "Production day",
        description:
          "On-set direction, lighting, and styling, shot digitally with real-time review so nothing's a surprise in post.",
      },
      {
        number: "04",
        title: "Retouch & delivery",
        description:
          "High-end retouching and colour grading, delivered in the formats and crops your channels need.",
      },
    ],
  },

  clients: {
    eyebrow: "Trusted by",
    heading: "Brands & studios I've worked with",
    logos: [
      { name: "Punjab Garden" },
      { name: "Meryal Waterpark" },
      { name: "Zouk" },
      { name: "FENDI CASA" },
      { name: "Némah" },
      { name: "Cosette" },
      { name: "The Third Studio" },
    ],
  },

  testimonials: {
    eyebrow: "Kind words",
    heading: "What clients say",
    items: [
      {
        quote:
          "Gayatri turned a loose brief into a campaign that outperformed everything we'd run before. She thinks like a brand strategist, not just a photographer.",
        name: "Marketing Lead",
        role: "Hospitality Brand",
      },
      {
        quote:
          "On-set, she's calm, fast, and precise — and the retouching is genuinely gallery-quality. Our product shots have never looked better.",
        name: "Founder",
        role: "F&B Brand",
      },
      {
        quote:
          "She got the shot list done early, adapted on the fly when the location changed, and delivered a week ahead of schedule. Rare combination.",
        name: "Creative Director",
        role: "Agency Partner",
      },
    ],
  },

  pricing: {
    eyebrow: "Packages",
    heading: "Simple starting points",
    subheading:
      "Every project is custom-quoted based on scope, usage rights, and production needs — these are starting points for a conversation.",
    packages: [
      {
        name: "Product / Catalogue",
        price: "From AED 3,500",
        description: "Studio product or food photography for e-commerce, menus, or catalogues.",
        features: ["Up to 20 final images", "Styling consultation", "2 rounds of retouching", "Web + print delivery"],
        featured: false,
      },
      {
        name: "Brand Campaign",
        price: "From AED 12,000",
        description: "Full campaign production — concept, art direction, and multi-location shooting.",
        features: [
          "Full-day production",
          "Art direction & mood boards",
          "Up to 40 final images",
          "High-end retouching",
          "Usage rights negotiated per project",
        ],
        featured: true,
      },
      {
        name: "Editorial / Portrait",
        price: "From AED 2,200",
        description: "Fashion editorial, corporate headshots, or personal branding portraits.",
        features: ["Half-day session", "Up to 15 final images", "1 round of retouching", "Digital delivery"],
        featured: false,
      },
    ],
    note: "Prices are indicative starting points — reach out for a quote tailored to your project.",
  },

  contact: {
    eyebrow: "Get in touch",
    heading: "Have a project in mind?",
    subheading:
      "Tell me a bit about the brief — brand, timeline, and location — and I'll follow up within 1–2 business days.",
    formFields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "projectType", label: "Project type", type: "select", required: false,
        options: ["Brand campaign", "Fashion / Portrait", "Food / Product", "Automotive / Hospitality", "Other"] },
      { name: "message", label: "Tell me about your project", type: "textarea", required: true },
    ],
    // Where the form submits. Swap for a real endpoint (Formspree, Basin, your
    // own backend, etc). Until then it falls back to a mailto: link.
    formEndpoint: "",
    submitLabel: "Send inquiry",
  },

  footer: {
    tagline: "Commercial & lifestyle photography, based in Dubai — available worldwide.",
    copyright: `© ${new Date().getFullYear()} Gayatri Narayanan. All rights reserved.`,
  },
};
