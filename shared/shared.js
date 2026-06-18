/* ============================================================
   SANDY PORTFOLIO — shared.js
   Nav scroll, hamburger, cursor glow — included on every page
   ============================================================ */

(function () {
  // Cursor glow
  const glow = document.getElementById("cursorGlow");
  if (glow) {
    document.addEventListener("mousemove", (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  }

  // Nav scroll
  const nav = document.getElementById("nav");
  if (nav) {
    const onScroll = () =>
      nav.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Hamburger
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", open);
      const [b1, b2, b3] = hamburger.querySelectorAll("span");
      if (open) {
        b1.style.transform = "rotate(45deg) translate(5px,5px)";
        b2.style.opacity = "0";
        b3.style.transform = "rotate(-45deg) translate(5px,-5px)";
      } else {
        b1.style.transform = b3.style.transform = "";
        b2.style.opacity = "";
      }
    });
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        hamburger.querySelectorAll("span").forEach((s) => {
          s.style.transform = "";
          s.style.opacity = "";
        });
      });
    });
  }

  // Scroll fade-in
  const style = document.createElement("style");
  style.textContent = `
    .fade-up { opacity:0; transform:translateY(28px); transition:opacity 0.6s ease, transform 0.6s ease; }
    .fade-up.visible { opacity:1; transform:translateY(0); }
  `;
  document.head.appendChild(style);

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));
})();
