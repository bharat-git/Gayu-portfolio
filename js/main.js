/**
 * Renders every section from window.SITE_CONFIG, then wires up interactions:
 * scroll reveal, the portfolio filter, the menu overlay and the contact form.
 *
 * To add a brand-new section: write a render function below (renderXyz),
 * add its markup target in index.html (<section id="xyz">), and add its
 * data block to js/config.js.
 */
(function () {
  "use strict";

  const CFG = window.SITE_CONFIG;

  /* ---------------------------------------------------------------------
     Girih motifs (service card icons) + testimonial medallion
  --------------------------------------------------------------------- */
  const SERVICE_MOTIFS = {
    campaigns: `
      <rect x="-14" y="-14" width="28" height="28"></rect>
      <rect x="-14" y="-14" width="28" height="28" transform="rotate(45)"></rect>
      <path d="M0 -20 L6 0 L0 20 L-6 0 Z"></path>
      <path d="M-20 0 L0 -6 L20 0 L0 6 Z"></path>
      <circle r="4.5"></circle>`,
    fashion: `
      <path d="M0 -20 C10 -12 14 -4 14 4 L14 20 L-14 20 L-14 4 C-14 -4 -10 -12 0 -20 Z"></path>
      <path d="M0 -11 C7 -5 9 0 9 5 L9 20 L-9 20 L-9 5 C-9 0 -7 -5 0 -11 Z"></path>
      <path d="M0 -2 C4 2 5 5 5 8 L5 20 L-5 20 L-5 8 C-5 5 -4 2 0 -2 Z"></path>
      <path d="M0 -20 L0 20"></path>`,
    food: `
      <path d="M0 -19 L16.5 -9.5 L16.5 9.5 L0 19 L-16.5 9.5 L-16.5 -9.5 Z"></path>
      <path d="M0 -10.5 L9 -5.25 L9 5.25 L0 10.5 L-9 5.25 L-9 -5.25 Z"></path>
      <path d="M0 -19 L0 -10.5 M16.5 -9.5 L9 -5.25 M16.5 9.5 L9 5.25 M0 19 L0 10.5 M-16.5 9.5 L-9 5.25 M-16.5 -9.5 L-9 -5.25"></path>
      <circle r="3.5"></circle>`,
    automotive: `
      <circle r="9" cx="-7" cy="0"></circle>
      <circle r="9" cx="7" cy="0"></circle>
      <circle r="9" cx="0" cy="-7"></circle>
      <circle r="9" cx="0" cy="7"></circle>
      <path d="M0 -18 L18 0 L0 18 L-18 0 Z"></path>`,
  };

  function serviceMotifSvg(motif) {
    const inner = SERVICE_MOTIFS[motif] || "";
    return `<svg class="card-motif" viewBox="0 0 48 48" width="46" height="46" aria-hidden="true"><g transform="translate(24 24)">${inner}</g></svg>`;
  }

  function testimonialMedallionSvg() {
    const outerLozenge = "M0 -138 L26 -92 L0 -46 L-26 -92 Z";
    const innerLozenge = "M0 -92 L14 -69 L0 -46 L-14 -69 Z";
    const lozenges = Array.from({ length: 8 })
      .map(
        (_, i) => `<g transform="rotate(${i * 45})"><path d="${outerLozenge}"></path><path d="${innerLozenge}"></path></g>`
      )
      .join("");
    const octagon =
      "0,-14 9.9,-9.9 14,0 9.9,9.9 0,14 -9.9,9.9 -14,0 -9.9,-9.9";
    return `
      <svg class="testimonial-medallion" viewBox="0 0 320 320" aria-hidden="true">
        <g transform="translate(160 160)" fill="none" stroke="#c9a26a" stroke-width="0.7">
          <circle r="138"></circle>
          <circle r="92"></circle>
          <circle r="46"></circle>
          ${lozenges}
          <rect x="-10" y="-10" width="20" height="20"></rect>
          <rect x="-10" y="-10" width="20" height="20" transform="rotate(45)"></rect>
          <polygon points="${octagon}"></polygon>
        </g>
      </svg>`;
  }

  /* ---------------------------------------------------------------------
     Header / menu overlay
  --------------------------------------------------------------------- */
  function renderHeader() {
    document.getElementById("wordmark").textContent = CFG.brand.name;
    document.title = CFG.meta.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", CFG.meta.description);

    if (CFG.meta.favicon) {
      const favicon = document.querySelector('link[rel="icon"]') || document.createElement("link");
      favicon.rel = "icon";
      favicon.href = CFG.meta.favicon;
      if (!favicon.parentNode) document.head.appendChild(favicon);
    }
  }

  function renderMenuOverlay() {
    const list = document.getElementById("menuOverlayList");
    list.innerHTML = CFG.menu.items
      .map((item) => `<li><a href="${item.href}">${item.label}</a></li>`)
      .join("");
  }

  function wireMenuOverlay() {
    const toggle = document.getElementById("menuToggle");
    const overlay = document.getElementById("menuOverlay");
    let lastFocused = null;

    function focusableEls() {
      return Array.from(overlay.querySelectorAll("a, button")).filter((el) => el.offsetParent !== null);
    }

    function openMenu() {
      lastFocused = document.activeElement;
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      const first = focusableEls()[0];
      if (first) first.focus();
      document.addEventListener("keydown", onKeydown);
    }

    function closeMenu() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeydown);
      if (lastFocused) lastFocused.focus();
    }

    function onKeydown(e) {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key === "Tab") {
        const els = focusableEls();
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    toggle.addEventListener("click", () => {
      if (overlay.classList.contains("is-open")) closeMenu();
      else openMenu();
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeMenu();
    });

    overlay.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  }

  /* ---------------------------------------------------------------------
     Hero
  --------------------------------------------------------------------- */
  function renderHero() {
    const section = document.getElementById("hero");
    if (!section) return;
    const h = CFG.hero;
    section.innerHTML = `
      <img class="hero-image" src="${h.image}" alt="${h.imageAlt}" />
      <div class="hero-scrim-bottom"></div>
      <div class="hero-scrim-top"></div>
      <div class="girih girih--hero"></div>
      <div class="hero-content" data-reveal>
        <div class="hero-eyebrow-row eyebrow-rule">
          <span class="eyebrow">${h.eyebrow}</span>
        </div>
        <h1 class="hero-heading">${h.heading}</h1>
        <div class="hero-bottom-row">
          <p class="hero-standfirst">${h.standfirst}</p>
          <a class="btn" href="${h.cta.href}">${h.cta.label}</a>
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
    const run = items.map((i) => `<span>${i}</span><span class="dot">·</span>`).join("");
    section.innerHTML = `<div class="marquee-track">${run}${run}</div>`;
  }

  /* ---------------------------------------------------------------------
     About
  --------------------------------------------------------------------- */
  function renderAbout() {
    const section = document.getElementById("about");
    if (!section) return;
    const a = CFG.about;
    section.innerHTML = `
      <div class="girih-band girih-band--left"></div>
      <div class="girih-band girih-band--right"></div>
      <div class="about-grid">
        <div data-reveal>
          <span class="eyebrow">${a.eyebrow}</span>
          <h2 class="about-heading">${a.heading}</h2>
          <div class="about-body">${a.body.map((p) => `<p>${p}</p>`).join("")}</div>
          <div class="about-stats">
            ${a.stats
              .map(
                (s) => `<div><div class="about-stat-value tnum">${s.value}</div><div class="about-stat-label">${s.label}</div></div>`
              )
              .join("")}
          </div>
        </div>
        <div data-reveal data-reveal-delay>
          <div class="portrait-plate">
            <div class="portrait-plate-inner">
              <img src="${a.portrait.image}" alt="${a.portrait.alt}" width="196" height="196" />
              <div class="portrait-caption">${a.portrait.captionLines.join("<br />")}</div>
            </div>
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
      <div class="section-heading-row" data-reveal>
        <h2>${s.eyebrow}</h2>
        <span class="eyebrow">${s.heading}</span>
      </div>
      <div class="services-grid">
        ${s.items
          .map(
            (item) => `
          <div class="service-card" data-reveal>
            ${serviceMotifSvg(item.motif)}
            <span class="service-index tnum">${item.index}</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>`
          )
          .join("")}
      </div>
    `;
  }

  /* ---------------------------------------------------------------------
     Portfolio
  --------------------------------------------------------------------- */
  function renderPortfolio() {
    const section = document.getElementById("portfolio");
    if (!section) return;
    const p = CFG.portfolio;

    section.innerHTML = `
      <div class="section-heading-row" data-reveal>
        <h2>${p.heading}</h2>
        <a class="eyebrow" href="${p.moreLink.href}" target="_blank" rel="noopener">${p.moreLink.label} ↗</a>
      </div>
      <div class="portfolio-filters" id="portfolioFilters" role="group" aria-label="Filter work by category">
        ${p.categories
          .map(
            (c, i) => `<button class="filter-btn${i === 0 ? " is-active" : ""}" data-filter="${c.key}" aria-pressed="${i === 0}">${c.label}</button>`
          )
          .join("")}
      </div>
      <div class="portfolio-grid" id="portfolioGrid">
        ${p.items
          .map((item) => {
            const media = item.image
              ? `<img src="${item.image}" alt="${item.alt || item.label}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" />`
              : `<div class="portfolio-tile-stripes" aria-hidden="true"></div><span class="portfolio-tile-label">${item.label}</span>`;
            return `
          <figure class="portfolio-tile${item.span2 ? " portfolio-tile--span2" : ""}" data-category="${item.category}" data-aspect="${item.aspect}">
            ${media}
          </figure>`;
          })
          .join("")}
      </div>
    `;

    const filters = section.querySelectorAll(".filter-btn");
    const tiles = section.querySelectorAll(".portfolio-tile");
    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        filters.forEach((b) => {
          b.classList.remove("is-active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");
        const key = btn.dataset.filter;
        tiles.forEach((tile) => {
          const show = key === "all" || tile.dataset.category === key;
          tile.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  /* ---------------------------------------------------------------------
     Clients
  --------------------------------------------------------------------- */
  function renderClients() {
    const section = document.getElementById("clients");
    if (!section) return;
    const c = CFG.clients;
    section.innerHTML = `
      <div class="eyebrow clients-eyebrow" data-reveal>${c.eyebrow}</div>
      <div class="clients-logos" data-reveal data-reveal-delay>
        ${c.logos.map((name) => `<span class="client-logo">${name}</span>`).join("")}
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
      ${testimonialMedallionSvg()}
      <p class="testimonial-lead" data-reveal>&ldquo;${t.lead.quote}&rdquo;</p>
      <div class="testimonial-lead-attr" data-reveal>${t.lead.attribution}</div>
      <div class="testimonial-secondary-grid" data-reveal data-reveal-delay>
        ${t.secondary
          .map(
            (item) => `
          <div class="testimonial-secondary">
            <p>&ldquo;${item.quote}&rdquo;</p>
            <div class="testimonial-secondary-attr">${item.attribution}</div>
          </div>`
          )
          .join("")}
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
      const id = `f_${f.name}`;
      if (f.type === "textarea") {
        return `<label class="form-field" for="${id}"><span>${f.label}${f.required ? " *" : ""}</span><textarea id="${id}" name="${f.name}" rows="${f.rows || 4}" ${f.required ? "required" : ""}></textarea></label>`;
      }
      if (f.type === "select") {
        return `<label class="form-field" for="${id}"><span>${f.label}</span><select id="${id}" name="${f.name}">${f.options.map((o) => `<option>${o}</option>`).join("")}</select></label>`;
      }
      return `<label class="form-field" for="${id}"><span>${f.label}${f.required ? " *" : ""}</span><input id="${id}" name="${f.name}" type="${f.type}" ${f.required ? "required" : ""} /></label>`;
    };

    section.innerHTML = `
      <div class="girih girih--contact"></div>
      <div class="contact-grid">
        <div data-reveal>
          <span class="eyebrow">${c.eyebrow}</span>
          <h2 class="contact-heading">${c.heading}</h2>
          <p class="contact-lead">${c.lead}</p>
          <div class="contact-details">
            <a href="mailto:${b.email}">${b.email}</a>
            <span>${b.phone}</span>
            <a href="${b.behance}" target="_blank" rel="noopener">Behance ↗</a>
          </div>
        </div>
        <form class="contact-form" id="contactForm" data-reveal data-reveal-delay>
          ${c.formFields.map(fieldHtml).join("")}
          <button class="btn form-submit" type="submit">${c.submitLabel}</button>
          <div class="form-status" id="formStatus" role="status"></div>
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
            status.textContent = "Thanks — I'll be in touch within one to two business days.";
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
    footer.innerHTML = `<span>${f.line1}</span><span>${f.line2}</span>`;
  }

  /* ---------------------------------------------------------------------
     Scroll reveal
  --------------------------------------------------------------------- */
  function wireReveal() {
    const targets = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    targets.forEach((t) => io.observe(t));
  }

  /* ---------------------------------------------------------------------
     Init
  --------------------------------------------------------------------- */
  function init() {
    renderHeader();
    renderMenuOverlay();
    renderHero();
    renderMarquee();
    renderAbout();
    renderServices();
    renderPortfolio();
    renderClients();
    renderTestimonials();
    renderContact();
    renderFooter();
    wireMenuOverlay();
    wireReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
