/* ============================================================
   SANDY PORTFOLIO — script.js
   ============================================================ */

// ── CURSOR GLOW ──────────────────────────────────────────────
const cursorGlow = document.getElementById("cursorGlow");
if (cursorGlow) {
  document.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
  });
}

// ── NAV SCROLL ───────────────────────────────────────────────
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
    highlightActiveNav();
  },
  { passive: true },
);

function highlightActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
}

// ── HAMBURGER ────────────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const navLinksEl = document.getElementById("navLinks");

if (hamburger && navLinksEl) {
  hamburger.addEventListener("click", () => {
    navLinksEl.classList.toggle("open");
    const isOpen = navLinksEl.classList.contains("open");
    hamburger.setAttribute("aria-expanded", isOpen);
    // animate bars
    const bars = hamburger.querySelectorAll("span");
    if (isOpen) {
      bars[0].style.transform = "rotate(45deg) translate(5px,5px)";
      bars[1].style.opacity = "0";
      bars[2].style.transform = "rotate(-45deg) translate(5px,-5px)";
    } else {
      bars[0].style.transform = "";
      bars[1].style.opacity = "";
      bars[2].style.transform = "";
    }
  });

  // close on link click
  navLinksEl.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navLinksEl.classList.remove("open");
      hamburger.querySelectorAll("span").forEach((s) => {
        s.style.transform = "";
        s.style.opacity = "";
      });
    });
  });
}

// ── SKILL BAR ANIMATION ──────────────────────────────────────
const skillFills = document.querySelectorAll(".skill-bar-fill");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const width = el.getAttribute("data-width") || "0";
        setTimeout(() => {
          el.style.width = width + "%";
        }, 200);
        skillObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);

skillFills.forEach((el) => skillObserver.observe(el));

// ── SCROLL FADE-IN ────────────────────────────────────────────
const fadeEls = document.querySelectorAll(
  ".project-card, .service-card, .about-img-col, .about-text-col, .contact-inner, .section-header",
);

const style = document.createElement("style");
style.textContent = `
  .fade-hidden { opacity: 0; transform: translateY(32px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .fade-visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);

fadeEls.forEach((el, i) => {
  el.classList.add("fade-hidden");
});

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.closest(".projects-grid, .services-grid")
          ? Array.from(el.parentElement.children).indexOf(el) * 80
          : 0;
        setTimeout(() => {
          el.classList.replace("fade-hidden", "fade-visible");
        }, delay);
        fadeObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.12 },
);

fadeEls.forEach((el) => fadeObserver.observe(el));

// ── SMOOTH SCROLL ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        (parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--nav-h",
          ),
        ) || 72);
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});
