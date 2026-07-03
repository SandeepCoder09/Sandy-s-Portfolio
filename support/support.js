/* ============================================================
     support.js + popup engine — all inline
  ============================================================ */

// ── AMOUNT SELECTION ───────────────────────────────────────
let selected = 100;
const totalDisplay = document.getElementById("totalDisplay");
const customWrap = document.getElementById("customWrap");
const customAmt = document.getElementById("customAmt");

document.querySelectorAll(".amount-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".amount-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const amt = parseInt(btn.dataset.amount);
    if (amt === 0) {
      customWrap.style.display = "block";
      totalDisplay.textContent = "₹" + (customAmt.value || "0");
    } else {
      customWrap.style.display = "none";
      selected = amt;
      totalDisplay.textContent = "₹" + amt;
    }
  });
});

customAmt.addEventListener("input", () => {
  const v = parseInt(customAmt.value) || 0;
  selected = v;
  totalDisplay.textContent = "₹" + (v || "0");
});

// ── FORM SUBMIT ────────────────────────────────────────────
document
  .getElementById("donateForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    let amount =
      customWrap.style.display === "block"
        ? parseInt(customAmt.value)
        : selected;

    if (!amount || amount < 1) {
      showErrorPopup(
        "Invalid Amount",
        "Please enter a valid amount before proceeding.",
      );
      return;
    }

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          donorName: document.getElementById("donorName").value,
          donorMsg: document.getElementById("donorMsg").value,
        }),
      });

      if (!response.ok) {
        showErrorPopup(
          "Order Failed",
          "We couldn't create your payment order. Please try again in a moment.",
        );
        return;
      }

      const order = await response.json();

      const options = {
        key: order.key,
        amount: order.amount,
        currency: "INR",
        name: "Support Sandy's Work ❤️",
        description: "Website Development & Creative Services Support",
        image:
          "https://sandy-s-portfolio-nine.vercel.app/assets/09logo-black.jpg",
        order_id: order.id,
        theme: { color: "#ff6b2b" },

        handler: async function (razorpayResponse) {
          try {
            const verify = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(razorpayResponse),
            });

            const result = await verify.json();

            if (result.success) {
              // Hide form
              document.getElementById("donateForm").style.display = "none";
              // Show beautiful popup ✅
              showSuccessPopup(razorpayResponse.razorpay_payment_id);
            } else {
              showErrorPopup(
                "Verification Failed",
                "Payment received but verification failed. Please contact us with your Payment ID: " +
                  (razorpayResponse.razorpay_payment_id || "N/A"),
              );
            }
          } catch (err) {
            console.error("Verification error:", err);
            showErrorPopup(
              "Verification Error",
              "A network error occurred. Your payment may have gone through — please save your payment details and contact us.",
            );
          }
        },
      };

      const rzp = new Razorpay(options);

      rzp.on("payment.failed", function (response) {
        showErrorPopup(
          "Payment Failed",
          response.error?.description ||
            "Your payment could not be processed. Please try a different method.",
        );
      });

      rzp.open();
    } catch (err) {
      console.error("Checkout error:", err);
      showErrorPopup(
        "Something Went Wrong",
        "An unexpected error occurred. Please refresh and try again.",
      );
    }
  });

// ══════════════════════════════════════════════════════════
//  POPUP ENGINE
// ══════════════════════════════════════════════════════════

const CONFETTI_COLORS = [
  "#FF6B2B",
  "#FF8C55",
  "#FFAD80",
  "#F5F2EE",
  "#C8C5C0",
  "#FFD700",
  "#FF4444",
];

// ── SHOW SUCCESS ─────────────────────────────────────────
function showSuccessPopup(paymentId) {
  const overlay = document.getElementById("paymentPopup");
  const card = document.getElementById("popupCard");
  const payIdEl = document.getElementById("popupPayId");
  const payIdBox = document.getElementById("popupPayIdBox");
  const succDiv = document.getElementById("popupSuccessContent");
  const errDiv = document.getElementById("popupErrorContent");
  const iconSucc = document.getElementById("popupIconSuccess");
  const iconErr = document.getElementById("popupIconError");
  const title = document.getElementById("popupTitle");

  card.classList.remove("error");
  succDiv.style.display = "block";
  errDiv.style.display = "none";
  iconSucc.style.display = "";
  iconErr.style.display = "none";
  title.innerHTML = 'Thank you <span class="script">so much!</span>';

  if (paymentId) {
    payIdEl.textContent = paymentId;
    payIdBox.style.display = "flex";
  } else {
    payIdBox.style.display = "none";
  }

  spawnConfetti();
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", escClose);
}

// ── SHOW ERROR ───────────────────────────────────────────
function showErrorPopup(title, message) {
  const overlay = document.getElementById("paymentPopup");
  const card = document.getElementById("popupCard");
  const succDiv = document.getElementById("popupSuccessContent");
  const errDiv = document.getElementById("popupErrorContent");
  const iconSucc = document.getElementById("popupIconSuccess");
  const iconErr = document.getElementById("popupIconError");
  const errTitle = document.getElementById("popupErrorTitle");
  const errMsg = document.getElementById("popupErrorMsg");

  card.classList.add("error");
  succDiv.style.display = "none";
  errDiv.style.display = "block";
  iconSucc.style.display = "none";
  iconErr.style.display = "";
  errTitle.textContent = title || "Something went wrong";
  errMsg.textContent = message || "Please try again.";

  document.getElementById("popupConfetti").innerHTML = "";
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", escClose);
}

// ── CLOSE ────────────────────────────────────────────────
function closePaymentPopup() {
  document.getElementById("paymentPopup").classList.remove("open");
  document.body.style.overflow = "";
  document.removeEventListener("keydown", escClose);
  setTimeout(() => {
    document.getElementById("popupConfetti").innerHTML = "";
  }, 400);
}

function escClose(e) {
  if (e.key === "Escape") closePaymentPopup();
}

// ── COPY PAYMENT ID ──────────────────────────────────────
function copyPaymentId() {
  const id = document.getElementById("popupPayId").textContent.trim();
  const btn = document.getElementById("popupCopyBtn");
  if (!id || id === "—") return;

  navigator.clipboard
    .writeText(id)
    .then(() => {
      btn.classList.add("copied");
      const orig = btn.innerHTML;
      btn.innerHTML = `<svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:#22C55E;fill:none"><polyline points="20 6 9 17 4 12"/></svg>`;
      setTimeout(() => {
        btn.classList.remove("copied");
        btn.innerHTML = orig;
      }, 2200);
    })
    .catch(() => {
      const r = document.createRange();
      r.selectNode(document.getElementById("popupPayId"));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(r);
    });
}

// ── CONFETTI ─────────────────────────────────────────────
function spawnConfetti() {
  const container = document.getElementById("popupConfetti");
  container.innerHTML = "";
  for (let i = 0; i < 38; i++) {
    const el = document.createElement("div");
    el.className = "confetti-piece";
    const color =
      CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    const left = (Math.random() * 100).toFixed(1);
    const delay = (Math.random() * 0.75).toFixed(2);
    const dur = (0.85 + Math.random() * 0.9).toFixed(2);
    const size = 5 + Math.floor(Math.random() * 7);
    const radius = Math.random() > 0.45 ? "50%" : "2px";
    el.style.cssText = `left:${left}%;background:${color};width:${size}px;height:${size}px;border-radius:${radius};animation-delay:${delay}s;animation-duration:${dur}s;`;
    container.appendChild(el);
  }
}
