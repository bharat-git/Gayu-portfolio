/**
 * ============================================================================
 *  SITE CONTENT CONFIG
 *  Everything on the site — text, sections, portfolio tiles, testimonials —
 *  is edited here. You should not need to touch index.html or main.js to
 *  update copy.
 *
 *  Photography: only the hero panorama and the about portrait are real
 *  photographs (see /assets). Every portfolio grid tile is a placeholder
 *  standing in for a photograph — see `portfolio.items` below. To bring in
 *  a real photograph, give that item an `image` (and `alt`) and main.js
 *  will render it in place of the placeholder stripes.
 * ============================================================================
 */

window.SITE_CONFIG = {
  meta: {
    title: "Gayatri Narayanan — Photography",
    description:
      "Gayatri Narayanan is a Dubai-based commercial and lifestyle photographer specializing in brand campaigns, fashion, food, product, automotive, and hospitality photography.",
    favicon: "assets/portrait-plate.png",
  },

  brand: {
    name: "Gayatri Narayanan",
    location: "Dubai, UAE",
    email: "hello@gayatrinarayanan.com",
    phone: "+971 50 000 0000",
    behance: "https://www.behance.net/Gayatri_Narayanan",
  },

  menu: {
    items: [
      { label: "Work", href: "#portfolio" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Contact", href: "#contact" },
    ],
  },

  hero: {
    eyebrow: "Commercial & lifestyle photographer · Dubai",
    heading: "Light, discipline.",
    standfirst:
      "Photographs for brands that need the frame to do real work — on shelves, in campaigns, across feeds.",
    cta: { label: "Enter the archive", href: "#portfolio" },
    image: "assets/hero-panorama.png",
    imageAlt: "Sunset over the desert, seen past a latticed wall",
  },

  marquee: {
    items: ["Campaigns", "Fashion", "Food", "Product", "Automotive", "Hospitality", "Sports", "Portraiture"],
  },

  about: {
    eyebrow: "About",
    heading: "Five years of briefs, answered in light.",
    body: [
      "Commercial and lifestyle photography from Dubai — campaigns, fashion, food, product, automotive and hospitality. Art direction, on-set production and high-end finishing, handled end to end.",
      "Previously Creative Content Creator at Cosette and photographer at The Third Studio, Doha. Now working directly with brands and agencies, from first reference to final file.",
    ],
    stats: [
      { value: "5+", label: "Years commercial" },
      { value: "40+", label: "Campaigns" },
      { value: "8", label: "Disciplines" },
    ],
    portrait: {
      image: "assets/portrait-plate.png",
      alt: "Gayatri Narayanan",
      captionLines: ["Gayatri Narayanan", "Dubai, 2026"],
    },
  },

  services: {
    eyebrow: "Services",
    heading: "Four ways in",
    items: [
      {
        index: "01",
        title: "Brand campaigns",
        description:
          "Concept to delivery — art direction, casting support and production for launches and seasonal pushes.",
        motif: "campaigns",
      },
      {
        index: "02",
        title: "Fashion & portraiture",
        description:
          "Editorial and commercial fashion, corporate portraits and personal branding with a clean, modern retouch.",
        motif: "fashion",
      },
      {
        index: "03",
        title: "Food & product",
        description:
          "Appetite-led food photography and clean product imagery for menus, packaging and e-commerce.",
        motif: "food",
      },
      {
        index: "04",
        title: "Automotive & hospitality",
        description:
          "Showrooms, interiors and vehicles — imagery that sells space and design for hotels and dealerships.",
        motif: "automotive",
      },
    ],
  },

  portfolio: {
    eyebrow: "Selected work",
    heading: "Selected work",
    moreLink: { label: "More on Behance", href: "https://www.behance.net/Gayatri_Narayanan" },
    categories: [
      { key: "all", label: "All" },
      { key: "campaigns", label: "Campaigns" },
      { key: "fashion", label: "Fashion" },
      { key: "food", label: "Food" },
      { key: "product", label: "Product" },
      { key: "automobile", label: "Automotive" },
      { key: "hospitality", label: "Hospitality" },
      { key: "portraits", label: "Portraits" },
    ],
    // Static work list — a deliberate rhythm of spans and aspect ratios.
    // Give an item `image` + `alt` to swap its placeholder for a photograph.
    items: [
      { category: "campaigns", label: "campaign-01", aspect: "2/1.25", span2: true },
      { category: "fashion", label: "fashion-01", aspect: "1/1.25" },
      { category: "portraits", label: "portrait-01", aspect: "1/1.25" },
      { category: "food", label: "food-01", aspect: "1/1" },
      { category: "product", label: "product-01", aspect: "1/1" },
      { category: "automobile", label: "auto-01", aspect: "2/1", span2: true },
      { category: "hospitality", label: "hospitality-01", aspect: "1/1" },
      { category: "fashion", label: "fashion-02", aspect: "1/1" },
      { category: "campaigns", label: "campaign-02", aspect: "1/1" },
      { category: "food", label: "food-02", aspect: "1/1" },
    ],
  },

  clients: {
    eyebrow: "Trusted by",
    logos: ["Punjab Garden", "Meryal", "Zouk", "Fendi Casa", "Némah", "Cosette", "Third Studio"],
  },

  testimonials: {
    lead: {
      quote: "A loose brief came back as the best-performing campaign we've run.",
      attribution: "Marketing Lead · Hospitality Brand",
    },
    secondary: [
      {
        quote: "Calm, fast and precise on set — and the retouching is gallery quality.",
        attribution: "Founder · F&B Brand",
      },
      {
        quote: "Location changed the morning of the shoot. Delivered a week ahead anyway.",
        attribution: "Creative Director · Agency Partner",
      },
    ],
  },

  contact: {
    eyebrow: "Get in touch",
    heading: "Have a project in mind?",
    lead: "Brand, timeline, and where the images will live. I reply within one to two business days.",
    formFields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      {
        name: "projectType",
        label: "Project type",
        type: "select",
        options: ["Brand campaign", "Fashion / portrait", "Food / product", "Automotive / hospitality", "Other"],
      },
      { name: "message", label: "Tell me about your project", type: "textarea", rows: 4, required: true },
    ],
    // Swap for a real endpoint (Formspree, Basin, your own backend, etc).
    // Until then, submission falls back to a mailto: link.
    formEndpoint: "",
    submitLabel: "Send inquiry",
  },

  footer: {
    line1: "Dubai — available worldwide",
    line2: `© ${new Date().getFullYear()} Gayatri Narayanan`,
  },
};
