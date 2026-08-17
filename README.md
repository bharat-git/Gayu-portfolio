# Gayatri Narayanan — Photography Website

Version 2: "The Colophon" — a dark, cinematic editorial redesign of the
landing page, built as plain HTML/CSS/JS (no build step, no framework) so
it's easy to edit, host anywhere, and hand off. Warm near-white text on a
near-black ground, Cormorant Garamond over Lora, colour applied as stroke
rather than fill, hairline rules, and photographs matted like tipped-in
book plates.

## Quick start

Just open `index.html` in a browser — that's it, no install required. For
local development with correct relative paths, serve the folder instead of
double-clicking the file:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Editing content — everything lives in `js/config.js`

Text, the portfolio grid, testimonials, services, contact details — all of
it is one JS object in `js/config.js`, with comments explaining each field.
You should not need to touch `index.html` or `js/main.js` for normal
content updates.

- **Change copy**: edit the relevant block (`hero`, `about`, `services`,
  `testimonials`, `contact`, etc).
- **Hook up the contact form**: set `contact.formEndpoint` to a real form
  backend (Formspree, Basin, your own API). Until you do, the form falls
  back to opening the visitor's email client with a pre-filled message.
- **Swap fonts/colours**: the design tokens (`--color-accent`, fonts,
  spacing, motion easing) are declared once at the top of `css/styles.css`.

### The portfolio grid is placeholder photography

Only two real photographs ship with the site: the hero panorama and the
about-section portrait, both in `/assets`. Every tile in `portfolio.items`
(in `js/config.js`) renders as a labelled diagonal-stripe placeholder until
it's given a real photo. To swap one in, add `image` (a path) and `alt` to
that item — `js/main.js` will render the photograph in place of the
placeholder automatically, at the same aspect ratio and grid span. The
"More on Behance" link next to the section heading covers the gap for
visitors until the grid has real work in it.

## Adding a brand-new section

1. Add a data block for it to `js/config.js`.
2. Add `<section id="yourSection"></section>` to `index.html` inside
   `<main>`.
3. Write a `renderYourSection()` function in `js/main.js` (copy the shape of
   an existing one, e.g. `renderServices`), and call it from `init()`.
4. Style it in `css/styles.css` — reuse the existing `.eyebrow`, `.btn`,
   `[data-reveal]` utility classes for consistent animation/typography.

## What's built in

- Scroll-triggered reveal animations (respects `prefers-reduced-motion`).
- A filterable portfolio grid by category.
- A full-screen menu overlay (the site's only navigation) with a focus
  trap, Escape-to-close, and click-anywhere-to-close.
- An infinite marquee of discipline names (pauses under reduced motion).
- Hand-authored inline SVG girih ornament — service card motifs and the
  testimonials medallion — plus CSS data-URI tiling patterns for the
  hero corner, the About section's edge bands, and the contact lattice.
- Responsive down to small phones: the design handoff this version was
  built from explicitly left mobile out of scope, so the breakpoints in
  `css/styles.css` are this repo's own judgement call, not part of the
  spec. Revisit them if the shipped design doesn't feel right on a device.
- No external JS dependencies — nothing to `npm install` to run the site.

## Known placeholders to confirm before shipping

- **Contact email/phone** (`js/config.js` → `brand.email` / `brand.phone`)
  are carried over from the design handoff, unconfirmed.
- **Portfolio photography** — see above.
- **Contact form** has no submit handler beyond the `mailto:` fallback; no
  validation states or backend are wired up.
- **Hero image** ships as an unoptimized PNG (`assets/hero-panorama.png`,
  2400×1420). Re-export as WebP/AVIF at a couple of widths before shipping.

## Deploying

This is a fully static site — drag the whole folder onto Netlify/Vercel/GitHub
Pages, or upload it via FTP to any host. No server, database, or build step
required. Every asset reference (`css/`, `js/`, `assets/`) uses a relative
path, so the site works unmodified whether it's served from a domain root or
a subpath like a GitHub Pages project URL.

### GitHub Pages

1. Push this repo to GitHub (already done if you're reading this from the
   repo).
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose the branch you want published and folder
   `/ (root)`, then **Save**.
5. GitHub builds and publishes the site at
   `https://<your-username>.github.io/<repo-name>/` — this can take a
   minute on the first deploy.

A `.nojekyll` file at the repo root ships with the project so GitHub serves
the files as-is instead of running them through Jekyll (which isn't needed
here and can otherwise ignore or mangle files that start with `_`).
