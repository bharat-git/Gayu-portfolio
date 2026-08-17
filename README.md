# Gayatri Narayanan — Photography Website

A sleek, dark, editorial-style portfolio + business site, built as plain
HTML/CSS/JS (no build step, no framework) so it's easy to edit, host
anywhere, and hand off. Structure and business features are inspired by
manongalama.com (hero → services → work → about → social proof → booking),
adapted around Gayatri's actual body of work from her Behance profile
(brand campaigns, fashion/corporate portraiture, food, product, automotive,
hospitality, and sports photography).

## Quick start

Just open `index.html` in a browser — that's it, no install required. For
local development with correct relative paths, serve the folder instead of
double-clicking the file:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Adding / replacing photos — the part you'll use most

1. Drop image files (`.jpg`, `.jpeg`, `.png`, `.webp`) into the matching
   folder inside `/Portfolio-images/`:

   ```
   Portfolio-images/
     hero/          → the big homepage background image (use 1 file)
     about/         → your portrait for the About section (use 1 file)
     campaigns/     → brand campaign work
     fashion/       → fashion & portraiture
     food/          → food photography
     product/       → product / lifestyle
     automobile/    → automotive
     hospitality/   → hospitality / interiors
     sports/        → sports
     portraits/     → general portraits
   ```

2. Run the manifest script so the site picks up the new files:

   ```bash
   node scripts/generate-manifest.js
   ```

   This scans every folder and writes `js/manifest.js`, which the site reads
   on load. You never hand-type file paths — just drop images in and re-run
   this one command.

3. Refresh the browser.

**To add a whole new portfolio category** (e.g. `travel`): create
`Portfolio-images/travel/`, drop images in, add
`{ key: "travel", label: "Travel" }` to `portfolio.categories` in
`js/config.js`, then re-run the manifest script.

The placeholder images currently in `/Portfolio-images` are generated
gradients labeled with their filename — swap them for real photos whenever
you're ready. They exist only so the site isn't empty out of the box.

## Editing content — everything lives in `js/config.js`

Text, section order, pricing, testimonials, services, nav links, contact
details — all of it is one JS object in `js/config.js`, with comments
explaining each field. You should not need to touch `index.html` or
`js/main.js` for normal content updates.

- **Reorder or hide a section**: edit the `sections` array at the top of
  `config.js` — flip `enabled: false` to hide something without deleting its
  content (e.g. the Journal/blog section is off by default).
- **Change copy**: edit the relevant block (`hero`, `about`, `services`,
  `pricing`, etc).
- **Change pricing packages**: edit `pricing.packages` — add, remove, or mark
  one `featured: true`.
- **Hook up the contact form**: set `contact.formEndpoint` to a real form
  backend (Formspree, Basin, your own API). Until you do, the form falls back
  to opening the visitor's email client with a pre-filled message.
- **Swap fonts/colors**: the design tokens (`--color-accent`, fonts, easing
  curves) are declared once at the top of `css/styles.css`.

## Adding a brand-new section

1. Add a data block for it to `js/config.js` and add its id to `sections`.
2. Add `<section id="yourSection" class="section"></section>` to
   `index.html` inside `<main>`.
3. Write a `renderYourSection()` function in `js/main.js` (copy the shape of
   an existing one, e.g. `renderProcess`), and call it from `init()`.
4. Style it in `css/styles.css` — reuse the existing `.eyebrow`, `.btn`,
   `[data-reveal]` utility classes for consistent animation/typography.

## What's built in

- Fully responsive (mobile nav drawer, fluid type, masonry portfolio grid
  that reflows to 2 columns on small screens).
- Filterable portfolio grid by category, with a full-screen lightbox
  (keyboard arrows + Escape supported).
- Scroll-triggered reveal animations throughout (fade/blur-up for text,
  clip-path image wipes for the About photo and portfolio thumbnails).
- Auto-generated image dimensions (`scripts/generate-manifest.js` reads each
  file's real width/height with a zero-dependency parser) so the masonry
  grid never collapses while images lazy-load.
- A scroll progress bar, sticky header that condenses on scroll, and a
  decorative marquee strip.
- No external JS dependencies — nothing to `npm install` to run the site.
  (`node` is only needed to run the manifest script when you add photos.)

## Deploying

This is a fully static site — drag the whole folder onto Netlify/Vercel/GitHub
Pages, or upload it via FTP to any host. No server, database, or build step
required.
