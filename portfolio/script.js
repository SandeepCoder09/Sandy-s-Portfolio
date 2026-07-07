// ── NAV ACTIVE STATE HIGHLIGHTING ─────────────────────────────
// Automatically detects the section based on ID and updates the orange underline

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a[href^='#']");

const observerOptions = {
  root: null,
  // This creates a trigger line exactly in the middle of the viewport.
  // Whichever section overlaps the center of the screen gets the active class.
  rootMargin: "-50% 0px -50% 0px", 
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const currentId = entry.target.getAttribute("id");

      // 1. Remove the 'active' class from all navigation links
      navItems.forEach((link) => {
        link.classList.remove("active");
      });

      // 2. Find the link that points to the currently intersecting section
      const currentLink = document.querySelector(`.nav-links a[href="#${currentId}"]`);
      
      // 3. Add the 'active' class to trigger the orange underline in your CSS
      if (currentLink) {
        currentLink.classList.add("active");
      }
    }
  });
}, observerOptions);

// Observe all sections that have an ID
sections.forEach((section) => {
  sectionObserver.observe(section);
});