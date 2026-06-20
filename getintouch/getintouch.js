// ── CURSOR GLOW ──────────────────────────────────────────
const g = document.getElementById("cursorGlow");
document.addEventListener("mousemove", (e) => {
  g.style.left = e.clientX + "px";
  g.style.top = e.clientY + "px";
});

// ── IFRAME LOAD HANDLING ─────────────────────────────────
const FORM_URL = "https://forms.gle/ZkSDhpms5V8CwTfZ6";

function onIframeLoad() {
  // Hide spinner once frame content loads
  const loader = document.getElementById("iframeLoading");
  if (loader) loader.classList.add("hidden");
}

function onIframeError() {
  showFallback();
}

// If iframe hasn't loaded within 6 seconds, check if it's still spinning
let loaded = false;
document.getElementById("formIframe").addEventListener("load", () => {
  loaded = true;
  onIframeLoad();
});

// Fallback: if iframe is blocked / errors, show a nice CTA instead
function showFallback() {
  const wrap = document.getElementById("iframeWrap");
  const loader = document.getElementById("iframeLoading");
  const frame = document.getElementById("formIframe");

  if (loader) loader.classList.add("hidden");
  if (frame) frame.style.display = "none";

  // Inject fallback UI
  wrap.style.height = "auto";
  const fb = document.createElement("div");
  fb.className = "form-fallback";
  fb.style.display = "flex";
  fb.innerHTML = `
        <div class="fallback-icon">📋</div>
        <div class="fallback-title">Open the contact form</div>
        <p class="fallback-desc">Click the button below to open Sandy's Google Form in a new tab and send your message directly.</p>
        <a href="${FORM_URL}" target="_blank" rel="noopener" class="btn-primary" style="margin-top:4px">
          Open Contact Form →
        </a>`;
  wrap.appendChild(fb);
}

// Try to resolve short link by loading it directly in the iframe.
// If blocked (X-Frame-Options), fall back gracefully.
const iframe = document.getElementById("formIframe");

// Use the short URL directly — Google Forms short URLs redirect to embeddable form
iframe.src = FORM_URL;

// Safety net: show fallback if nothing loads in 8s
setTimeout(() => {
  if (!loaded) showFallback();
}, 8000);
