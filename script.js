const PROJECTS_PATH = "assets/projects.json";
const STUDIO_EMAIL = "officialinfinitebytestudios@gmail.com";
const STUDIO_LOGO = "assets/images/infinite-byte-studios-logo.png";

const $ = (selector, root = document) => root.querySelector(selector);

/* Utilities */
function escapeHTML(value = "") {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}

async function loadProjects() {
  const response = await fetch(PROJECTS_PATH);

  if (!response.ok) {
    throw new Error("Could not load assets/projects.json.");
  }

  const data = await response.json();

  if (!Array.isArray(data.projects)) {
    throw new Error("The project data format is invalid.");
  }

  return data.projects;
}

/* Header and navigation */
function renderHeader() {
  const header = $("#site-header");
  if (!header) return;

  const currentPage = document.body.dataset.page;

  const links = [
    { href: "index.html", label: "Home", page: "home" },
    { href: "projects.html", label: "Projects", page: "projects" },
    { href: "about.html", label: "About", page: "about" },
    { href: "contact.html", label: "Contact", page: "contact" },
  ];

  header.innerHTML = `
    <div class="nav-shell">
      <a class="brand" href="index.html"
        aria-label="Infinite Byte Studios home">
        <img class="brand-logo"
          src="${STUDIO_LOGO}"
          alt="Infinite Byte Studios"
          width="1024"
          height="1024">
      </a>

      <button class="menu-toggle"
        type="button"
        aria-label="Open navigation"
        aria-expanded="false"
        aria-controls="primary-navigation">
        <span></span><span></span>
      </button>

      <nav class="primary-navigation"
        id="primary-navigation"
        aria-label="Main navigation">
        ${links
          .map(
            (link) => `
              <a href="${link.href}"
                ${currentPage === link.page ? 'aria-current="page"' : ""}>
                ${link.label}
              </a>
            `,
          )
          .join("")}

        <a class="nav-cta" href="contact.html">
          Let's talk <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </div>
  `;

  const toggle = $(".menu-toggle", header);
  const navigation = $("#primary-navigation", header);

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";

    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );

    navigation.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");

      navigation.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    });
  });
}

/* Footer */
function renderFooter() {
  const footer = $("#site-footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-main section-shell">
      <a class="footer-brand" href="index.html"
        aria-label="Infinite Byte Studios home">
        <img src="${STUDIO_LOGO}"
          alt="Infinite Byte Studios"
          width="1024"
          height="1024"
          loading="lazy">
      </a>

      <div class="footer-contact">
        <span class="footer-label">HAVE AN IDEA?</span>

        <a
          href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=officialinfinitebytestudios%40gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >${STUDIO_EMAIL}</a>
      </div>

      <a class="footer-back-top" href="#top">Back to top ↑</a>
    </div>

    <div class="footer-bottom section-shell">
      <span>© ${new Date().getFullYear()} Infinite Byte Studios.</span>
      <span>DESIGNED WITH INTENTION. BUILT WITH CURIOSITY.</span>
    </div>
  `;
}

function getSocialLinksMarkup() {
  return `
    <nav class="social-icons" aria-label="Social media">

      <!-- Instagram -->
      <a
        class="social-icon-link"
        href="https://www.instagram.com/infinitebytestudios"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram — Infinite Byte Studios"
        title="Instagram"
      >
        <img
          src="assets/images/instagram-logo.png"
          alt=""
          width="128"
          height="128"
          loading="lazy"
        >
      </a>

      <!-- Reddit -->
      <a
        class="social-icon-link"
        href="https://www.reddit.com/user/InfiniteByteStudios"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Reddit — Infinite Byte Studios"
        title="Reddit"
      >
        <img
          src="assets/images/reddit-logo.png"
          alt=""
          width="128"
          height="128"
          loading="lazy"
        >
      </a>

      <!-- GitHub -->
      <a
        class="social-icon-link"
        href="https://github.com/infinitebytestudios"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub — Infinite Byte Studios"
        title="GitHub"
      >
        <img
          src="assets/images/github-logo.png"
          alt=""
          width="128"
          height="128"
          loading="lazy"
        >
      </a>

      <!-- YouTube -->
      <a
        class="social-icon-link"
        href="https://www.youtube.com/@infinitebytestudios"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube — Infinite Byte Studios"
        title="YouTube"
      >
        <img
          src="assets/images/youtube-logo.png"
          alt=""
          width="128"
          height="128"
          loading="lazy"
        >
      </a>

    </nav>
  `;
}

/* Place social links on the home, contact, and about pages */
function renderPageSocialLinks() {
  const page = document.body.dataset.page;

  if (page === "home") {
    const heroFootnote = $(".hero-footnote");

    if (heroFootnote) {
      heroFootnote.insertAdjacentHTML(
        "afterend",
        `<div class="hero-socials">
          ${getSocialLinksMarkup()}
        </div>`,
      );
    }
  }

  if (page === "contact") {
    const contactLayout = $(".contact-layout");

    if (contactLayout) {
      contactLayout.insertAdjacentHTML(
        "afterend",
        `<section class="contact-social-section section section-shell"
          aria-labelledby="contact-social-title">
          <p class="eyebrow">STAY CONNECTED</p>
          <h2 id="contact-social-title">Find Us <span class="gradient-text">Online.</span></h2>
          <p>Follow Infinite Byte Studios and keep up with our latest work.</p>
          ${getSocialLinksMarkup()}
        </section>`,
      );
    }
  }

  if (page === "about") {
    const aboutIntro = $(".page-hero");

    if (aboutIntro) {
      aboutIntro.insertAdjacentHTML(
        "beforeend",
        `<div class="about-socials">
          <span class="about-social-label">FIND THE STUDIO ONLINE</span>
          ${getSocialLinksMarkup()}
        </div>`,
      );
    }
  }
}

/* Project cards */
function projectCard(project, index = 0) {
  const detailURL = `project.html?id=${encodeURIComponent(project.id)}`;
  const isApp = project.category === "app";

  return `
    <article
      class="project-card project-${escapeHTML(project.accent)}"
      style="--card-index:${index}"
    >
      <a
        class="project-preview"
        href="${detailURL}"
        aria-label="Explore ${escapeHTML(project.name)} details"
      >
        <div class="preview-topline">
          <span class="preview-index">
            ${escapeHTML(project.number)} / 05
          </span>
          <span class="preview-type">
            ${escapeHTML(project.type)}
          </span>
        </div>

        <div class="preview-art">
          <div class="preview-glow" aria-hidden="true"></div>
          <img
            class="project-logo"
            src="${escapeHTML(project.logo)}"
            alt="${escapeHTML(project.name)} logo"
            loading="lazy"
            width="1024"
            height="1024"
          >
        </div>

        <div class="preview-bottomline">
          <span>${escapeHTML(project.categoryLabel)}</span>
          <span class="preview-arrow" aria-hidden="true">↗</span>
        </div>
      </a>

      <div class="project-card-info">
        <div class="project-card-heading">
          <div>
            <span class="project-number">
              ${escapeHTML(project.number)} / 05
            </span>
            <h3>
              <a href="${detailURL}">
                ${escapeHTML(project.name)}
              </a>
            </h3>
          </div>

          <span class="project-type-tag">
            ${isApp ? "APP" : "WEB"}
          </span>
        </div>

        <p>${escapeHTML(project.tagline)}</p>

        <div class="project-card-actions">
          <a class="text-link" href="${detailURL}">
            View details <span aria-hidden="true">↗</span>
          </a>

          <a
            class="live-link"
            href="${escapeHTML(project.url)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${isApp ? "Google Play" : "Live website"} ↗
          </a>
        </div>
      </div>
    </article>
  `;
}

/* Screenshot gallery */
function renderScreenshotGallery(project) {
  const isApp = project.category === "app";
  const screenshotCount = isApp ? 8 : 5;
  const folder = `assets/images/project-screenshots/${project.id}`;

  const screenshots = Array.from({ length: screenshotCount }, (_, index) => {
    const number = index + 1;
    const imagePath = `${folder}/${number}.png`;

    const dimensions = isApp ? 'width="1240" height="2208"' : "";

    return `
        <figure class="screenshot-card">
          <div class="screenshot-frame">
            <button
              class="screenshot-open"
              type="button"
              aria-label="Open ${escapeHTML(project.name)} screenshot ${number} full screen"
            >
              <img
                class="screenshot-image"
                src="${imagePath}"
                alt="${escapeHTML(project.name)} ${
                  isApp ? "app" : "website"
                } screenshot ${number}"
                ${dimensions}
                loading="lazy"
                decoding="async"
              >

              <span class="screenshot-open-hint" aria-hidden="true">
                <span>⤢</span> VIEW FULL SCREEN
              </span>
            </button>
          </div>

          <figcaption>
            <span class="screenshot-number">
              ${String(number).padStart(2, "0")}
            </span>
            <span>
              SCREEN / ${String(screenshotCount).padStart(2, "0")}
            </span>
          </figcaption>
        </figure>
      `;
  }).join("");

  return `
    <section
      class="section section-shell screenshot-gallery-section"
      aria-labelledby="screenshot-gallery-title"
    >
      <p class="eyebrow">03 / INSIDE THE EXPERIENCE</p>

      <div class="screenshot-gallery-heading">
        <div>
          <h2 id="screenshot-gallery-title">
            A closer <span class="gradient-text">look.</span>
          </h2>

          <p class="section-intro">
            Explore the screens and details that bring
            ${escapeHTML(project.name)} to life.
          </p>
        </div>

        <span class="screenshot-count">
          ${String(screenshotCount).padStart(2, "0")} SCREENS
        </span>
      </div>

      <div class="screenshot-gallery ${isApp ? "is-app" : "is-website"}">
        ${screenshots}
      </div>
    </section>
  `;
}

/* Full-screen screenshot viewer with pinch and wheel zoom */
function initScreenshotLightbox() {
  if ($(".screenshot-lightbox")) return;

  const dialog = document.createElement("dialog");
  dialog.className = "screenshot-lightbox";
  dialog.setAttribute("aria-label", "Screenshot viewer");

  dialog.innerHTML = `
    <button
      class="screenshot-lightbox-close"
      type="button"
      aria-label="Close full-screen screenshot"
    >×</button>

    <img class="screenshot-lightbox-image" alt="">

    <p class="screenshot-lightbox-caption" aria-live="polite"></p>
  `;

  document.body.appendChild(dialog);

  const image = $(".screenshot-lightbox-image", dialog);
  const caption = $(".screenshot-lightbox-caption", dialog);
  const closeButton = $(".screenshot-lightbox-close", dialog);

  let lastTrigger = null;

  const minZoom = 1;
  const maxZoom = 4;

  let zoomLevel = 1;
  let translateX = 0;
  let translateY = 0;

  // Track active pointers so touchscreens can use two-finger pinching.
  const pointers = new Map();

  let pinchStartDistance = 0;
  let pinchStartZoom = 1;
  let pinchAnchorX = 0;
  let pinchAnchorY = 0;

  let lastPointerX = 0;
  let lastPointerY = 0;
  let isDragging = false;

  function clampPosition() {
    const availableWidth = Math.max(0, window.innerWidth - 48);
    const availableHeight = Math.max(0, window.innerHeight - 112);

    const scaledWidth = image.offsetWidth * zoomLevel;
    const scaledHeight = image.offsetHeight * zoomLevel;

    const maxX = Math.max(0, (scaledWidth - availableWidth) / 2);
    const maxY = Math.max(0, (scaledHeight - availableHeight) / 2);

    translateX = Math.max(-maxX, Math.min(maxX, translateX));
    translateY = Math.max(-maxY, Math.min(maxY, translateY));
  }

  function applyZoom() {
    if (zoomLevel <= minZoom) {
      zoomLevel = minZoom;
      translateX = 0;
      translateY = 0;
    }

    clampPosition();

    image.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;

    image.style.cursor =
      zoomLevel > minZoom ? (isDragging ? "grabbing" : "grab") : "default";
  }

  function resetViewer() {
    zoomLevel = 1;
    translateX = 0;
    translateY = 0;

    pointers.clear();
    pinchStartDistance = 0;
    pinchStartZoom = 1;
    isDragging = false;

    image.style.transform = "translate(0, 0) scale(1)";
    image.style.cursor = "default";
  }

  function getPointerDistance() {
    const points = [...pointers.values()];

    if (points.length < 2) return 0;

    return Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
  }

  function getPointerMidpoint() {
    const points = [...pointers.values()];

    return {
      x: (points[0].x + points[1].x) / 2,
      y: (points[0].y + points[1].y) / 2,
    };
  }

  function beginPinch() {
    if (pointers.size < 2) return;

    isDragging = false;
    pinchStartDistance = getPointerDistance();
    pinchStartZoom = zoomLevel;

    if (!pinchStartDistance) return;

    const midpoint = getPointerMidpoint();
    const rect = image.getBoundingClientRect();

    // Keep the point beneath the fingers anchored while zooming.
    pinchAnchorX = (midpoint.x - rect.left - rect.width / 2) / zoomLevel;

    pinchAnchorY = (midpoint.y - rect.top - rect.height / 2) / zoomLevel;
  }

  function updatePinch() {
    if (pointers.size < 2 || !pinchStartDistance) return;

    const distance = getPointerDistance();
    const midpoint = getPointerMidpoint();

    const nextZoom = Math.max(
      minZoom,
      Math.min(maxZoom, pinchStartZoom * (distance / pinchStartDistance)),
    );

    // Recover the untransformed image centre.
    const rect = image.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2 - translateX;
    const centerY = rect.top + rect.height / 2 - translateY;

    zoomLevel = nextZoom;

    translateX = midpoint.x - centerX - pinchAnchorX * zoomLevel;

    translateY = midpoint.y - centerY - pinchAnchorY * zoomLevel;

    applyZoom();
  }

  function zoomByWheel(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!image.src || !image.complete) return;

    const previousZoom = zoomLevel;
    const direction = event.deltaY < 0 ? 1 : -1;

    zoomLevel = Math.max(
      minZoom,
      Math.min(maxZoom, zoomLevel + direction * 0.25),
    );

    if (zoomLevel === minZoom) {
      translateX = 0;
      translateY = 0;
    } else if (zoomLevel > previousZoom) {
      clampPosition();
    }

    applyZoom();
  }

  image.addEventListener("wheel", zoomByWheel, {
    passive: false,
  });

  image.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    event.preventDefault();

    pointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    try {
      image.setPointerCapture(event.pointerId);
    } catch {
      // The pointer may already have been released.
    }

    if (pointers.size >= 2) {
      beginPinch();
      return;
    }

    if (zoomLevel > minZoom) {
      isDragging = true;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      image.style.cursor = "grabbing";
    }
  });

  image.addEventListener("pointermove", (event) => {
    if (!pointers.has(event.pointerId)) return;

    pointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    if (pointers.size >= 2) {
      updatePinch();
      return;
    }

    if (!isDragging || zoomLevel <= minZoom) return;

    translateX += event.clientX - lastPointerX;
    translateY += event.clientY - lastPointerY;

    lastPointerX = event.clientX;
    lastPointerY = event.clientY;

    applyZoom();
  });

  function stopPointer(event) {
    if (!pointers.has(event.pointerId)) return;

    pointers.delete(event.pointerId);

    if (pointers.size < 2) {
      pinchStartDistance = 0;
    }

    if (pointers.size === 1 && zoomLevel > minZoom) {
      const remaining = [...pointers.values()][0];

      isDragging = true;
      lastPointerX = remaining.x;
      lastPointerY = remaining.y;
    } else {
      isDragging = false;
    }

    applyZoom();
  }

  image.addEventListener("pointerup", stopPointer);
  image.addEventListener("pointercancel", stopPointer);
  image.addEventListener("lostpointercapture", stopPointer);

  // Clicking or double-clicking the image never changes its zoom.
  image.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });

  image.addEventListener("dblclick", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });

  dialog.addEventListener(
    "wheel",
    (event) => {
      if (event.target !== image) {
        event.preventDefault();
      }
    },
    { passive: false },
  );

  // Open screenshots through event delegation.
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;

    const trigger = event.target.closest(".screenshot-open");
    if (!trigger || !trigger.isConnected) return;

    const thumbnail = $(".screenshot-image", trigger);
    if (!thumbnail) return;

    lastTrigger = trigger;

    resetViewer();

    image.src = thumbnail.currentSrc || thumbnail.src;
    image.alt = thumbnail.alt;
    caption.textContent = thumbnail.alt;

    if (!dialog.open) {
      dialog.showModal();
    }
  });

  closeButton.addEventListener("click", () => {
    if (dialog.open) dialog.close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener("close", () => {
    image.removeAttribute("src");
    image.alt = "";
    caption.textContent = "";

    resetViewer();

    if (lastTrigger?.isConnected) {
      lastTrigger.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (dialog.open) applyZoom();
  });
}

/* Initialize the screenshot viewer once */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initScreenshotLightbox, {
    once: true,
  });
} else {
  initScreenshotLightbox();
}

/* Project collection and filters */
function renderProjectCollection(projects, target, filter = "all") {
  const container = $(target);
  if (!container) return;

  const visible =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  container.innerHTML = visible.length
    ? visible.map((project, index) => projectCard(project, index)).join("")
    : "";

  const emptyState = $("#empty-projects");

  if (emptyState) {
    emptyState.hidden = visible.length !== 0;
  }
}

function initFilters(projects) {
  const filters = $("#project-filters");
  if (!filters) return;

  filters.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest("[data-filter]");
    if (!button) return;

    filters.querySelectorAll("[data-filter]").forEach((item) => {
      const active = item === button;

      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    renderProjectCollection(projects, "#all-projects", button.dataset.filter);
  });
}

/* Individual project details */
function renderProjectDetail(projects) {
  const root = $("#project-detail");
  if (!root) return;

  const id = new URLSearchParams(window.location.search).get("id");

  const index = projects.findIndex((project) => project.id === id);
  const project = projects[index];

  if (!project) {
    document.title = "Project Not Found — Infinite Byte Studios";

    root.innerHTML = `
      <section class="page-hero section-shell">
        <p class="eyebrow">404 / PROJECT NOT FOUND</p>

        <h1>
          This project<br>
          <span class="gradient-text">isn't here.</span>
        </h1>

        <p>
          The link may be incomplete. Browse the portfolio
          to find another project.
        </p>

        <a class="button button-primary" href="projects.html">
          Browse projects ↗
        </a>
      </section>
    `;

    return;
  }

  document.title = `${project.name} — Infinite Byte Studios`;

  const features = project.features
    .map((feature) => `<li>${escapeHTML(feature)}</li>`)
    .join("");

  const technologies = project.technologies
    .map(
      (technology) =>
        `<span class="tech-pill">${escapeHTML(technology)}</span>`,
    )
    .join("");

  const previous = projects[(index - 1 + projects.length) % projects.length];

  const next = projects[(index + 1) % projects.length];

  const externalLabel =
    project.category === "app" ? "View on Google Play" : "Visit live website";

  root.innerHTML = `
    <section class="project-detail-hero section-shell">
      <a class="back-link" href="projects.html">
        ← Back to all projects
      </a>

      <div class="eyebrow">
        ${escapeHTML(project.number)} /
        ${escapeHTML(project.categoryLabel)}
      </div>

      <h1>
        ${escapeHTML(project.name)}<br>
        <span class="gradient-text">
          ${escapeHTML(project.tagline)}
        </span>
      </h1>

      <p class="detail-description">
        ${escapeHTML(project.description)}
      </p>

      <div class="hero-actions">
        <a
          class="button button-primary"
          href="${escapeHTML(project.url)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${externalLabel} <span aria-hidden="true">↗</span>
        </a>

        <span class="project-platform">
          ${escapeHTML(project.platform)}
        </span>
      </div>

      <div class="detail-art project-${escapeHTML(project.accent)}">
        <div class="detail-art-glow" aria-hidden="true"></div>

        <img
          class="detail-project-logo"
          src="${escapeHTML(project.logo)}"
          alt="${escapeHTML(project.name)} logo"
          width="1024"
          height="1024"
        >

        <span class="detail-art-index">
          INFINITE BYTE STUDIOS / ${escapeHTML(project.number)}
        </span>
      </div>
    </section>

    <section class="section section-shell detail-content-grid">
      <article class="detail-overview">
        <p class="eyebrow">01 / OVERVIEW</p>

        <h2>
          The idea behind<br>
          <span class="gradient-text">the experience.</span>
        </h2>

        <p>${escapeHTML(project.overview)}</p>
      </article>

      <aside class="detail-sidebar">
        <div class="detail-info-block">
          <span class="detail-label">PROJECT TYPE</span>
          <strong>${escapeHTML(project.categoryLabel)}</strong>
        </div>

        <div class="detail-info-block">
          <span class="detail-label">PLATFORM</span>
          <strong>${escapeHTML(project.platform)}</strong>
        </div>

        <div class="detail-info-block">
          <span class="detail-label">TECHNOLOGY</span>
          <div class="tech-pills">${technologies}</div>
        </div>
      </aside>
    </section>

    <section class="section section-shell">
      <p class="eyebrow">02 / HIGHLIGHTS</p>

      <h2>
        What makes it <span class="gradient-text">distinct.</span>
      </h2>

      <ul class="feature-list">${features}</ul>

      <div class="detail-visit">
        <div>
          <p class="eyebrow">EXPERIENCE IT YOURSELF</p>
          <h3>Explore ${escapeHTML(project.name)}.</h3>
          <p>Open the project and experience it directly.</p>
        </div>

        <a
          class="button button-primary"
          href="${escapeHTML(project.url)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${externalLabel} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>

    ${renderScreenshotGallery(project)}

    <section class="section section-shell project-pagination">
      <a
        class="pagination-item"
        href="project.html?id=${encodeURIComponent(previous.id)}"
      >
        <span>← PREVIOUS PROJECT</span>
        <strong>${escapeHTML(previous.name)}</strong>
      </a>

      <a
        class="pagination-item pagination-next"
        href="project.html?id=${encodeURIComponent(next.id)}"
      >
        <span>NEXT PROJECT →</span>
        <strong>${escapeHTML(next.name)}</strong>
      </a>
    </section>
  `;
}

/* Contact form */
function initContactForm() {
  const form = $("#contact-form");
  if (!form) return;

  const status = $("#form-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const emailSubject = `Studio enquiry: ${subject || "Website enquiry"}`;

    const emailBody = [`Name: ${name}`, "", message].join("\n");

    const gmailURL = new URL("https://mail.google.com/mail/");

    gmailURL.searchParams.set("view", "cm");
    gmailURL.searchParams.set("fs", "1");
    gmailURL.searchParams.set("to", STUDIO_EMAIL);
    gmailURL.searchParams.set("su", emailSubject);
    gmailURL.searchParams.set("body", emailBody);

    if (status) {
      status.classList.remove("is-error");
      status.textContent = "Opening Gmail compose in a new tab...";
    }

    window.open(gmailURL.toString(), "_blank", "noopener,noreferrer");
  });
}

/* Back-to-top links */
function initBackToTop() {
  document.querySelectorAll('a[href="#top"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    });
  });
}

/* Main initialization */
async function init() {
  renderHeader();
  renderFooter();
  renderPageSocialLinks();
  initContactForm();
  initBackToTop();

  try {
    const projects = await loadProjects();
    const page = document.body.dataset.page;

    if (page === "home") {
      renderProjectCollection(projects.slice(0, 3), "#featured-projects");
    }

    if (page === "projects") {
      renderProjectCollection(projects, "#all-projects");
      initFilters(projects);
    }

    if (page === "project") {
      renderProjectDetail(projects);
    }
  } catch (error) {
    console.error(error);

    const message = `
      <div class="load-error">
        <h2>We couldn't load the projects.</h2>
        <p>
          Run this site using Live Server and check that
          assets/projects.json exists and contains valid JSON.
        </p>
      </div>
    `;

    ["#featured-projects", "#all-projects", "#project-detail"].forEach(
      (selector) => {
        const target = $(selector);
        if (target) target.innerHTML = message;
      },
    );
  }
}

document.addEventListener("DOMContentLoaded", init);
