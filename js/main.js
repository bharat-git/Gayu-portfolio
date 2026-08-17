/**
 * Renders every section from window.SITE_CONFIG + window.PORTFOLIO_MANIFEST,
 * then wires up interactions (nav, scroll reveal, filters, lightbox, form).
 *
 * To add a brand-new section: write a render function below (renderXyz),
 * add its markup target in index.html (<section id="xyz">), add "xyz" to
 * SITE_CONFIG.sections in js/config.js, and add its data block to config.js.
 */
(function () {
  "use strict";

  const CFG = window.SITE_CONFIG;
  const MANIFEST = window.PORTFOLIO_MANIFEST || {};
  const IMG_BASE = "Portfolio-images";

  function imgPath(category, file) {
    return `${IMG_BASE}/${category}/${file}`;
  }

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function setSectionVisibility() {
    CFG.sections.forEach((s) => {
      const node = document.getElementById(s.id);
      if (!node) return;
      if (!s.enabled) node.remove();
    });
  }

  /* ---------------------------------------------------------------------
     Header / Nav
  --------------------------------------------------------------------- */
  function renderHeader() {
    document.getElementById("brandMark").textContent = CFG.brand.name;
    document.title = CFG.meta.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", CFG.meta.description);

    const nav = document.getElementById("mainNav");
    nav.innerHTML = CFG.nav.links.map((l) => `<a href="${l.href}">${l.label}</a>`).join("");

    const cta = document.getElementById("navCta");
    cta.textContent = CFG.nav.cta.label;
    cta.href = CFG.nav.cta.href;

    const mobileNav = document.getElementById("mobileNav");
    mobileNav.innerHTML = `<div class="mobile-nav-inner"><div class="mobile-nav-list">
      ${CFG.nav.links.map((l) => `<a href="${l.href}">${l.label}</a>`).join("")}
      <a href="${CFG.nav.cta.href}">${CFG.nav.cta.label}</a>
    </div></div>`;

    const toggle = document.getElementById("navToggle");
    const header = document.getElementById("siteHeader");
    toggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      header.classList.toggle("is-menu-open", open);
    });
    mobileNav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        header.classList.remove("is-menu-open");
      })
    );

    window.addEventListener(
      "scroll",
      () => header.classList.toggle("is-scrolled", window.scrollY > 40),
      { passive: true }
    );
  }

  /* ---------------------------------------------------------------------
     Hero
  --------------------------------------------------------------------- */
  function renderHero() {
    const section = document.getElementById("hero");
    if (!section) return;
    const h = CFG.hero;
    section.innerHTML = `
      <div class="hero-bg"><img src="${h.image}" alt="" /></div>
      <div class="hero-content">
        <div class="hero-eyebrow">${h.eyebrow}</div>
        <h1 class="hero-heading">${h.heading}</h1>
        <p class="hero-sub">${h.subheading}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="${h.primaryCta.href}">${h.primaryCta.label}</a>
          <a class="btn btn-ghost" href="${h.secondaryCta.href}">${h.secondaryCta.label}</a>
        </div>
        <div class="hero-stats">
          ${h.stats
            .map(
              (s) => `<div class="hero-stat"><div class="hero-stat-value">${s.value}</div><div class="hero-stat-label">${s.label}</div></div>`
            )
            .join("")}
        </div>
      </div>
    `;
  }

  /* ---------------------------------------------------------------------
     Marquee
  --------------------------------------------------------------------- */
  function renderMarquee() {
    const section = document.getElementById("marquee");
    if (!section) return;
    const items = CFG.marquee.items;
    const doubled = [...items, ...items];
    section.innerHTML = `<div class="marquee-track">${doubled.map((i) => `<span>${i}</span>`).join("")}</div>`;
  }

  /* ---------------------------------------------------------------------
     About
  --------------------------------------------------------------------- */
  function renderAbout() {
    const section = document.getElementById("about");
    if (!section) return;
    const a = CFG.about;
    section.innerHTML = `
      <div class="container">
        <div class="about-media" data-reveal-media><div class="about-media-inner"><img src="${a.image}" alt="${a.signatureLine}" /></div></div>
        <div class="about-body">
          <div class="eyebrow" data-reveal>${a.eyebrow}</div>
          <h2 data-reveal style="white-space:pre-line; font-size:clamp(28px,4vw,46px);">${a.heading}</h2>
          <div style="margin-top:24px;" data-reveal data-reveal-delay="1">
            ${a.body.map((p) => `<p>${p}</p>`).join("")}
          </div>
          <div class="about-highlights" data-reveal data-reveal-delay="2">
            ${a.resumeHighlights
              .map(
                (h) => `<div class="about-highlight"><span class="about-highlight-label">${h.label}</span><span class="about-highlight-value">${h.value}</span></div>`
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
  }

  /* ---------------------------------------------------------------------
     Services
  --------------------------------------------------------------------- */
  function renderServices() {
    const section = document.getElementById("services");
    if (!section) return;
    const s = CFG.services;
    section.innerHTML = `
      <div class="container">
        <div class="services-header">
          <div class="eyebrow" data-reveal>${s.eyebrow}</div>
          <h2 data-reveal>${s.heading}</h2>
          <p data-reveal data-reveal-delay="1">${s.subheading}</p>
        </div>
        <div class="services-grid">
          ${s.items
            .map(
              (item, i) => `
            <div class="service-card" data-reveal data-reveal-delay="${(i % 4) + 1}">
              <div class="service-media"><img src="${item.image}" alt="${item.title}" loading="lazy" /></div>
              <h3>${item.title}</h3>
              <p>${item.description}</p>
            </div>`
            )
            .join("")}
        </div>
      </div>
    `;
  }

  /* ---------------------------------------------------------------------
     Portfolio
  --------------------------------------------------------------------- */
  let lightboxItems = [];
  let lightboxIndex = 0;

  function renderPortfolio() {
    const section = document.getElementById("portfolio");
    if (!section) return;
    const p = CFG.portfolio;

    const items = [];
    p.categories.forEach((cat) => {
      const files = MANIFEST[cat.key] || [];
      files.forEach((entry) => {
        // manifest entries are { file, width, height } (width/height may be null
        // for formats the zero-dependency size reader can't parse)
        const file = typeof entry === "string" ? entry : entry.file;
        const width = typeof entry === "object" ? entry.width : null;
        const height = typeof entry === "object" ? entry.height : null;
        items.push({ category: cat.key, label: cat.label, src: imgPath(cat.key, file), file, width, height });
      });
    });
    lightboxItems = items;

    section.innerHTML = `
      <div class="container">
        <div class="portfolio-header">
          <div class="portfolio-header-text">
            <div class="eyebrow" data-reveal>${p.eyebrow}</div>
            <h2 data-reveal>${p.heading}</h2>
            <p data-reveal data-reveal-delay="1">${p.subheading}</p>
          </div>
          <div class="portfolio-filters" id="portfolioFilters">
            <button class="filter-pill is-active" data-filter="all">All</button>
            ${p.categories.map((c) => `<button class="filter-pill" data-filter="${c.key}">${c.label}</button>`).join("")}
          </div>
        </div>
        <div class="portfolio-grid" id="portfolioGrid">
          ${items
            .map((item, i) => {
              // Reserve aspect ratio up front (from manifest dimensions when known,
              // else a sane portrait default) so lazy-loaded images don't collapse
              // the CSS-columns masonry to 0-height before they load.
              const ratio = item.width && item.height ? `${item.width} / ${item.height}` : "4 / 5";
              return `
            <figure class="portfolio-item" data-category="${item.category}" data-index="${i}" style="aspect-ratio:${ratio};">
              <div class="portfolio-item-inner">
                <img src="${item.src}" alt="${item.label}" loading="lazy"
                  ${item.width ? `width="${item.width}"` : ""} ${item.height ? `height="${item.height}"` : ""} />
                <div class="portfolio-item-overlay"><span class="portfolio-item-label">${item.label}</span></div>
              </div>
            </figure>`;
            })
            .join("")}
        </div>
      </div>
    `;

    // Filters
    const filters = section.querySelectorAll(".filter-pill");
    const gridItems = section.querySelectorAll(".portfolio-item");
    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        filters.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const key = btn.dataset.filter;
        gridItems.forEach((item) => {
          const show = key === "all" || item.dataset.category === key;
          item.classList.toggle("is-hidden", !show);
        });
      });
    });

    // Lightbox open
    gridItems.forEach((item) => {
      item.addEventListener("click", () => openLightbox(Number(item.dataset.index)));
    });

    // Reveal each item (staggered by natural DOM order via IO, not CSS delay,
    // since count is dynamic)
    observeReveal(gridItems, true);
  }

  /* ---------------------------------------------------------------------
     Process
  --------------------------------------------------------------------- */
  function renderProcess() {
    const section = document.getElementById("process");
    if (!section) return;
    const pr = CFG.process;
    section.innerHTML = `
      <div class="container">
        <div class="process-header">
          <div class="eyebrow" data-reveal>${pr.eyebrow}</div>
          <h2 data-reveal>${pr.heading}</h2>
        </div>
        <div class="process-steps">
          ${pr.steps
            .map(
              (st, i) => `
            <div class="process-step" data-reveal data-reveal-delay="${i + 1}">
              <div class="process-number">${st.number}</div>
              <h3>${st.title}</h3>
              <p>${st.description}</p>
            </div>`
            )
            .join("")}
        </div>
      </div>
    `;
  }

  /* ---------------------------------------------------------------------
     Clients
  --------------------------------------------------------------------- */
  function renderClients() {
    const section = document.getElementById("clients");
    if (!section) return;
    const c = CFG.clients;
    section.innerHTML = `
      <div class="container">
        <div class="clients-header">
          <div class="eyebrow" data-reveal>${c.eyebrow}</div>
          <h2 data-reveal style="font-size:clamp(22px,3vw,32px);">${c.heading}</h2>
        </div>
        <div class="clients-logos" data-reveal data-reveal-delay="1">
          ${c.logos.map((l) => `<span class="client-logo">${l.name}</span>`).join("")}
        </div>
      </div>
    `;
  }

  /* ---------------------------------------------------------------------
     Testimonials
  --------------------------------------------------------------------- */
  function renderTestimonials() {
    const section = document.getElementById("testimonials");
    if (!section) return;
    const t = CFG.testimonials;
    section.innerHTML = `
      <div class="container">
        <div class="testimonials-header">
          <div class="eyebrow" data-reveal>${t.eyebrow}</div>
          <h2 data-reveal>${t.heading}</h2>
        </div>
        <div class="testimonial-track">
          ${t.items
            .map(
              (item, i) => `
            <div class="testimonial-card" data-reveal data-reveal-delay="${i + 1}">
              <p class="testimonial-quote">&ldquo;${item.quote}&rdquo;</p>
              <div class="testimonial-name">${item.name}</div>
              <div class="testimonial-role">${item.role}</div>
            </div>`
            )
            .join("")}
        </div>
      </div>
    `;
  }

  /* ---------------------------------------------------------------------
     Pricing
  --------------------------------------------------------------------- */
  function renderPricing() {
    const section = document.getElementById("pricing");
    if (!section) return;
    const pr = CFG.pricing;
    section.innerHTML = `
      <div class="container">
        <div class="pricing-header">
          <div class="eyebrow" data-reveal>${pr.eyebrow}</div>
          <h2 data-reveal>${pr.heading}</h2>
          <p data-reveal data-reveal-delay="1">${pr.subheading}</p>
        </div>
        <div class="pricing-grid">
          ${pr.packages
            .map(
              (pk, i) => `
            <div class="pricing-card ${pk.featured ? "is-featured" : ""}" data-reveal data-reveal-delay="${i + 1}">
              <div class="pricing-name">${pk.name}</div>
              <div class="pricing-price">${pk.price}</div>
              <p class="pricing-desc">${pk.description}</p>
              <ul class="pricing-features">${pk.features.map((f) => `<li>${f}</li>`).join("")}</ul>
              <a class="btn ${pk.featured ? "btn-primary" : "btn-ghost"} form-submit" href="#contact">Get a quote</a>
            </div>`
            )
            .join("")}
        </div>
        <p class="pricing-note" data-reveal>${pr.note}</p>
      </div>
    `;
  }

  /* ---------------------------------------------------------------------
     Contact
  --------------------------------------------------------------------- */
  function renderContact() {
    const section = document.getElementById("contact");
    if (!section) return;
    const c = CFG.contact;
    const b = CFG.brand;

    const fieldHtml = (f) => {
      if (f.type === "textarea") {
        return `<div class="form-row"><label for="f_${f.name}">${f.label}${f.required ? " *" : ""}</label><textarea id="f_${f.name}" name="${f.name}" ${f.required ? "required" : ""}></textarea></div>`;
      }
      if (f.type === "select") {
        return `<div class="form-row"><label for="f_${f.name}">${f.label}</label><select id="f_${f.name}" name="${f.name}">${f.options.map((o) => `<option>${o}</option>`).join("")}</select></div>`;
      }
      return `<div class="form-row"><label for="f_${f.name}">${f.label}${f.required ? " *" : ""}</label><input id="f_${f.name}" name="${f.name}" type="${f.type}" ${f.required ? "required" : ""} /></div>`;
    };

    section.innerHTML = `
      <div class="container contact-grid">
        <div class="contact-info">
          <div class="eyebrow" data-reveal>${c.eyebrow}</div>
          <h2 data-reveal>${c.heading}</h2>
          <p data-reveal data-reveal-delay="1">${c.subheading}</p>
          <div class="contact-details" data-reveal data-reveal-delay="2">
            <div><div class="contact-detail-label">Email</div><div class="contact-detail-value"><a href="mailto:${b.email}">${b.email}</a></div></div>
            <div><div class="contact-detail-label">Phone</div><div class="contact-detail-value"><a href="tel:${b.phone}">${b.phone}</a></div></div>
            <div><div class="contact-detail-label">Based in</div><div class="contact-detail-value">${b.location}</div></div>
          </div>
        </div>
        <form class="contact-form" id="contactForm" data-reveal data-reveal-delay="1">
          ${c.formFields.map(fieldHtml).join("")}
          <button class="btn btn-primary form-submit" type="submit">${c.submitLabel}</button>
          <div class="form-status" id="formStatus"></div>
        </form>
      </div>
    `;

    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if (c.formEndpoint) {
        fetch(c.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then(() => {
            status.textContent = "Thanks — I'll be in touch within 1–2 business days.";
            form.reset();
          })
          .catch(() => {
            status.textContent = "Something went wrong. Please email directly instead.";
          });
      } else {
        const subject = encodeURIComponent(`New inquiry — ${data.projectType || "Project"}`);
        const body = encodeURIComponent(
          `Name: ${data.name}\nEmail: ${data.email}\nProject type: ${data.projectType || "-"}\n\n${data.message}`
        );
        window.location.href = `mailto:${b.email}?subject=${subject}&body=${body}`;
        status.textContent = "Opening your email client…";
      }
    });
  }

  /* ---------------------------------------------------------------------
     Footer
  --------------------------------------------------------------------- */
  function renderFooter() {
    const footer = document.getElementById("siteFooter");
    const f = CFG.footer;
    const b = CFG.brand;
    footer.innerHTML = `
      <div class="footer-inner">
        <div>
          <div class="footer-brand">${b.name}</div>
          <div class="footer-tagline">${f.tagline}</div>
        </div>
        <div class="footer-social">
          <a href="${b.instagram}" target="_blank" rel="noopener">Instagram</a>
          <a href="${b.behance}" target="_blank" rel="noopener">Behance</a>
          <a href="${b.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
        </div>
        <div class="footer-copy">${f.copyright}</div>
      </div>
    `;
  }

  /* ---------------------------------------------------------------------
     Lightbox
  --------------------------------------------------------------------- */
  function openLightbox(index) {
    lightboxIndex = index;
    updateLightbox();
    document.getElementById("lightbox").classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    document.getElementById("lightbox").classList.remove("is-open");
    document.body.style.overflow = "";
  }
  function updateLightbox() {
    const item = lightboxItems[lightboxIndex];
    if (!item) return;
    document.getElementById("lightboxImage").src = item.src;
    document.getElementById("lightboxImage").alt = item.label;
    document.getElementById("lightboxCaption").textContent = item.label;
  }
  function nextLightbox() {
    lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
    updateLightbox();
  }
  function prevLightbox() {
    lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
    updateLightbox();
  }

  function wireLightbox() {
    document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
    document.getElementById("lightboxNext").addEventListener("click", nextLightbox);
    document.getElementById("lightboxPrev").addEventListener("click", prevLightbox);
    document.getElementById("lightbox").addEventListener("click", (e) => {
      if (e.target.id === "lightbox") closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      const lb = document.getElementById("lightbox");
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
    });
  }

  /* ---------------------------------------------------------------------
     Scroll progress + reveal-on-scroll
  --------------------------------------------------------------------- */
  function wireProgressBar() {
    const bar = document.getElementById("progressBar");
    window.addEventListener(
      "scroll",
      () => {
        const h = document.documentElement;
        const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
        bar.style.width = `${Math.min(scrolled * 100, 100)}%`;
      },
      { passive: true }
    );
  }

  let revealObserver;
  function observeReveal(nodeList, once) {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
    }
    nodeList.forEach((n) => revealObserver.observe(n));
  }

  function wireReveal() {
    observeReveal(document.querySelectorAll("[data-reveal]"));
    // about media uses its own clip-path visible class
    const aboutMedia = document.querySelector("[data-reveal-media]");
    if (aboutMedia) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      io.observe(aboutMedia);
    }
  }

  /* ---------------------------------------------------------------------
     Init
  --------------------------------------------------------------------- */
  function init() {
    setSectionVisibility();
    renderHeader();
    renderHero();
    renderMarquee();
    renderAbout();
    renderServices();
    renderPortfolio();
    renderProcess();
    renderClients();
    renderTestimonials();
    renderPricing();
    renderContact();
    renderFooter();
    wireLightbox();
    wireProgressBar();
    wireReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
