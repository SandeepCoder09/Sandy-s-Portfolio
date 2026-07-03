// ── POSTS DATA ────────────────────────────────────────────────
// ✏️ Add your own posts here — just copy a block and fill in the details
const POSTS = [
  {
    id: 1,
    title: "How I Built My Portfolio from Scratch — Design to Deployment",
    excerpt:
      "A behind-the-scenes look at how I designed and coded my portfolio from blank canvas to live Vercel deployment.",
    cat: "design",
    catLabel: "Design · Dev",
    emoji: "🎨",
    bg: "linear-gradient(135deg,#1A0A06,#2A1008)",
    date: "June 15, 2025",
    readTime: "8 min",
    featured: true,
    slug: "how-i-built-my-portfolio",
  },
  {
    id: 2,
    title: "5 CSS Tricks That Will Level Up Your UI Instantly",
    excerpt:
      "From glass morphism to smooth scroll animations — five CSS techniques every frontend dev should know.",
    cat: "dev",
    catLabel: "Development",
    emoji: "✨",
    bg: "linear-gradient(135deg,#060E1A,#0A1828)",
    date: "June 22, 2025",
    readTime: "5 min",
    featured: false,
    slug: "5-css-tricks",
  },
  {
    id: 3,
    title: "Designing for India: Why Localisation Changes Everything",
    excerpt:
      "Building apps for India-first audiences requires thinking beyond translation — language, UX patterns, and cultural context.",
    cat: "design",
    catLabel: "Design",
    emoji: "🇮🇳",
    bg: "linear-gradient(135deg,#0D1A06,#162A0A)",
    date: "July 1, 2025",
    readTime: "6 min",
    featured: false,
    slug: "designing-for-india",
  },
  {
    id: 4,
    title: "Getting Started with Jetpack Compose — A Dev's First Look",
    excerpt:
      "I built my first Android app with Jetpack Compose. Here's what I loved, what confused me, and what I'd do differently.",
    cat: "android",
    catLabel: "Android",
    emoji: "📱",
    bg: "linear-gradient(135deg,#0A0A1A,#101028)",
    date: "July 8, 2025",
    readTime: "7 min",
    featured: false,
    slug: "jetpack-compose-first-look",
  },
  {
    id: 5,
    title: "10 Figma Tips That Save Me Hours Every Week",
    excerpt:
      "Auto-layout tricks, component properties, variables — the Figma features that once I learnt, I can't live without.",
    cat: "tips",
    catLabel: "Tips & Tricks",
    emoji: "💡",
    bg: "linear-gradient(135deg,#1A140A,#2A1E08)",
    date: "July 14, 2025",
    readTime: "4 min",
    featured: false,
    slug: "10-figma-tips",
  },
  {
    id: 6,
    title: "Building a Full-Stack App with Node.js + MongoDB",
    excerpt:
      "From setting up Express routes to connecting MongoDB Atlas — a practical walkthrough of building a REST API.",
    cat: "dev",
    catLabel: "Development",
    emoji: "🔧",
    bg: "linear-gradient(135deg,#041A0A,#062A10)",
    date: "July 20, 2025",
    readTime: "10 min",
    featured: false,
    slug: "nodejs-mongodb-fullstack",
  },
  {
    id: 7,
    title: "Dark Mode Design: How to Get the Colours Right",
    excerpt:
      "Dark themes aren't just inverting colours — here's how to build a dark UI that actually looks premium and readable.",
    cat: "design",
    catLabel: "Design",
    emoji: "🌙",
    bg: "linear-gradient(135deg,#0A0A12,#14141E)",
    date: "July 25, 2025",
    readTime: "5 min",
    featured: false,
    slug: "dark-mode-design",
  },
  {
    id: 8,
    title: "Why Every Developer Should Keep a Public Portfolio",
    excerpt:
      "It's not just a resume — it's proof of work, a personal brand, and the best conversation starter in any job interview.",
    cat: "tips",
    catLabel: "Tips & Tricks",
    emoji: "🚀",
    bg: "linear-gradient(135deg,#1A0A10,#2A0E18)",
    date: "July 30, 2025",
    readTime: "4 min",
    featured: false,
    slug: "why-keep-a-portfolio",
  },
];

// ── STATE ─────────────────────────────────────────────────────
let activeFilter = "all";
let searchQuery = "";

// ── RENDER ────────────────────────────────────────────────────
function renderPosts() {
  const grid = document.getElementById("postsGrid");
  const countEl = document.getElementById("postsCount");

  let items = POSTS.filter((p) => !p.featured); // non-featured only in grid
  if (activeFilter !== "all")
    items = items.filter((p) => p.cat === activeFilter);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.catLabel.toLowerCase().includes(q),
    );
  }

  // Update count
  const total = POSTS.filter((p) =>
    activeFilter === "all" ? true : p.cat === activeFilter,
  ).length;
  countEl.textContent =
    items.length + " article" + (items.length !== 1 ? "s" : "");

  // Show/hide featured
  const featuredSection = document.getElementById("featuredSection");
  const featured = POSTS.find((p) => p.featured);
  const featuredVisible = activeFilter === "all" && !searchQuery;
  featuredSection.style.display = featuredVisible ? "block" : "none";

  if (!items.length && !featuredVisible) {
    grid.innerHTML = `
        <div class="no-results">
          <div class="emoji">🔍</div>
          <h3>No articles found</h3>
          <p>Try a different search term or category.</p>
        </div>`;
    return;
  }

  grid.innerHTML = items
    .map(
      (p, i) => `
      <a href="posts/${p.slug}.html" class="post-card fade-up" style="animation-delay:${i * 0.06}s">
        <div class="post-card-img" style="background:${p.bg}">${p.emoji}</div>
        <div class="post-card-body">
          <span class="post-tag">${p.catLabel}</span>
          <h3 class="post-card-title">${p.title}</h3>
          <p class="post-card-excerpt">${p.excerpt}</p>
          <div class="post-card-footer">
            <span class="post-date">${p.date}</span>
            <span class="post-read-time">${p.readTime} read</span>
          </div>
        </div>
      </a>`,
    )
    .join("");
}

// ── FILTER ───────────────────────────────────────────────────
document.getElementById("filterTabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-tab");
  if (!btn) return;
  document
    .querySelectorAll(".filter-tab")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  activeFilter = btn.dataset.cat;
  renderPosts();
});

// ── SEARCH ────────────────────────────────────────────────────
const searchBar = document.getElementById("searchBar");
const searchClear = document.getElementById("searchClear");

searchBar.addEventListener("input", () => {
  searchQuery = searchBar.value.trim();
  searchClear.classList.toggle("show", searchQuery.length > 0);
  renderPosts();
});

function clearSearch() {
  searchBar.value = "";
  searchQuery = "";
  searchClear.classList.remove("show");
  renderPosts();
}

// ── NEWSLETTER ────────────────────────────────────────────────
function subscribeNewsletter(e) {
  e.preventDefault();
  const btn = e.target.querySelector("button");
  btn.textContent = "✓ Subscribed!";
  btn.style.background = "#22C55E";
  setTimeout(() => {
    btn.textContent = "Subscribe →";
    btn.style.background = "";
  }, 3000);
}

// ── CURSOR ────────────────────────────────────────────────────
const g = document.getElementById("cursorGlow");
if (g)
  document.addEventListener("mousemove", (e) => {
    g.style.left = e.clientX + "px";
    g.style.top = e.clientY + "px";
  });

// ── INIT ──────────────────────────────────────────────────────
document.getElementById("totalPosts").textContent = POSTS.length;
renderPosts();
