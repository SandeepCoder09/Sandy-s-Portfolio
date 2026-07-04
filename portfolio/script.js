/* ============================================================
   portfolio/script.js
   Portfolio-specific logic only.
   shared.js already handles: cursor glow, nav scroll,
   hamburger toggle, and nav active highlight.
   animation.js already handles: scroll fade-in via data-animate,
   data-stagger, data-split, and data-count counters.
   ============================================================ */

// ── SKILL BAR ANIMATION ──────────────────────────────────────
// Animates the width of .skill-bar-fill elements on scroll.
// Uses data-width attribute to set the target percentage.
const skillFills = document.querySelectorAll(".skill-bar-fill");

if (skillFills.length) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const width = el.getAttribute("data-width") || "0";
          // Small delay so the transition is visible as it enters view
          setTimeout(() => {
            el.style.width = width + "%";
          }, 200);
          skillObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.4 }
  );

  skillFills.forEach((el) => skillObserver.observe(el));
}

// ── SMOOTH SCROLL (anchor links) ─────────────────────────────
// Handles clicks on href="#section" links and scrolls smoothly,
// accounting for the fixed nav height.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (href === "#") return; // skip bare # links
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navH =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue("--nav-h")
        ) || 72;
      const top =
        target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});