/* ============================================================
   shared/animation.js
   Scroll-triggered animation engine — Sandy's Portfolio
   Include at the bottom of every page <body>, AFTER shared.js
   ============================================================ */

(function () {
  "use strict";

  // ── CONFIG ───────────────────────────────────────────────
  const STAGGER_STEP = 0.11; // seconds between each staggered child
  const STAGGER_MAX = 0.65; // max stagger delay cap (seconds)
  const THRESHOLD = 0.12; // how much of element must be visible
  const ROOT_MARGIN = "0px 0px -48px 0px"; // trigger 48px before bottom edge

  // ── HELPERS ──────────────────────────────────────────────
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  function markAnimated(el) {
    el.classList.add("is-animated");
  }

  // ── MAIN OBSERVER ────────────────────────────────────────
  // Handles: [data-animate], [data-split], .reveal-line
  const mainObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        markAnimated(entry.target);
        mainObserver.unobserve(entry.target);

        // Trigger counter animation if element has [data-count]
        entry.target.querySelectorAll("[data-count]").forEach(triggerCounter);
      });
    },
    { threshold: THRESHOLD, rootMargin: ROOT_MARGIN },
  );

  // ── STAGGER OBSERVER ─────────────────────────────────────
  // Handles: [data-stagger] — animates children with delay cascade
  const staggerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const parent = entry.target;
        const children = Array.from(parent.children);

        children.forEach((child, i) => {
          const delay = Math.min(i * STAGGER_STEP, STAGGER_MAX);
          child.style.transitionDelay = delay + "s";
        });

        // Tiny rAF so delays are painted before class is added
        requestAnimationFrame(() => {
          requestAnimationFrame(() => markAnimated(parent));
        });

        staggerObserver.unobserve(parent);
      });
    },
    { threshold: THRESHOLD, rootMargin: ROOT_MARGIN },
  );

  // ── COUNTER ANIMATION ────────────────────────────────────
  function triggerCounter(el) {
    const target = parseFloat(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || "";
    const duration = 1400; // ms
    const start = performance.now();
    const isFloat = String(target).includes(".");

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = target * eased;
      el.textContent =
        (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ── REGISTER ALL ELEMENTS ────────────────────────────────
  function init() {
    if (prefersReducedMotion) {
      // Instantly reveal everything — no animation
      document
        .querySelectorAll(
          "[data-animate],[data-split],[data-stagger],.reveal-line",
        )
        .forEach((el) => {
          el.classList.add("is-animated");
        });
      document.querySelectorAll("[data-count]").forEach((el) => {
        el.textContent = el.dataset.count + (el.dataset.suffix || "");
      });
      return;
    }

    // Single elements
    document
      .querySelectorAll("[data-animate], [data-split], .reveal-line")
      .forEach((el) => {
        mainObserver.observe(el);
      });

    // Stagger parents
    document.querySelectorAll("[data-stagger]").forEach((el) => {
      staggerObserver.observe(el);
    });

    // Standalone counters (not inside a data-animate parent)
    document.querySelectorAll("[data-count]").forEach((el) => {
      if (!el.closest("[data-animate]")) {
        const counterObserver = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              triggerCounter(el);
              counterObserver.disconnect();
            }
          },
          { threshold: 0.5 },
        );
        counterObserver.observe(el);
      }
    });
  }

  // ── PARALLAX SUBTLE BACKGROUND ───────────────────────────
  // Adds a very gentle vertical drift to elements with [data-parallax]
  function initParallax() {
    const els = document.querySelectorAll("[data-parallax]");
    if (!els.length || prefersReducedMotion) return;

    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          els.forEach((el) => {
            const speed = parseFloat(el.dataset.parallax) || 0.15;
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const offset = (center - window.innerHeight / 2) * speed;
            el.style.transform = `translateY(${offset}px)`;
          });
          ticking = false;
        });
      },
      { passive: true },
    );
  }

  // ── MAGNETIC BUTTON EFFECT ────────────────────────────────
  // Elements with [data-magnetic] gently follow the cursor
  function initMagnetic() {
    const els = document.querySelectorAll("[data-magnetic]");
    if (!els.length || prefersReducedMotion) return;

    els.forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const strength = parseFloat(el.dataset.magnetic) || 0.35;
        const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  // ── NAV ACTIVE LINK (auto-highlight on scroll) ────────────
  function initNavHighlight() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((a) => {
            a.classList.toggle(
              "active",
              a.getAttribute("href") === "#" + entry.target.id,
            );
          });
        });
      },
      { threshold: 0.4 },
    );

    sections.forEach((s) => sectionObserver.observe(s));
  }

  // ── RUN ───────────────────────────────────────────────────
  // Wait for DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      init();
      initParallax();
      initMagnetic();
      initNavHighlight();
    });
  } else {
    init();
    initParallax();
    initMagnetic();
    initNavHighlight();
  }
})();
