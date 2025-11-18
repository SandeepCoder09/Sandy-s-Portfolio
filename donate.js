// donate.js
const BACKEND_URL = window.BACKEND_URL || "http://localhost:5000";

document.addEventListener("DOMContentLoaded", () => {
  const amountButtons = document.querySelectorAll(".amount");
  const customInput = document.getElementById("customAmount");
  const donateForm = document.getElementById("donateForm");

  let selectedAmount = 0;

  amountButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      selectedAmount = parseInt(btn.dataset.amount, 10);
      amountButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      customInput.value = "";
    });
  });

  customInput.addEventListener("input", () => {
    selectedAmount = parseInt(customInput.value || 0, 10);
    amountButtons.forEach(b => b.classList.remove("active"));
  });

  donateForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!selectedAmount || selectedAmount <= 0) {
      alert("Please select or enter a valid amount");
      return;
    }

    try {
      // 1) Create order on server
      const resp = await fetch(`${BACKEND_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(selectedAmount),
          customer_name: name,
          customer_email: email
        })
      });
      const payload = await resp.json();
      if (!payload || payload.error) {
        console.error(payload);
        alert("Failed to create order. Try again.");
        return;
      }

      // Cashfree returns data object inside payload.data
      const orderData = payload.data;
      // Most important for SDK: payment_session_id (v3)
      const paymentSessionId = orderData.payment_session_id || orderData.order_id || null;

      if (!paymentSessionId) {
        console.error("No payment_session_id returned:", orderData);
        alert("Unable to start payment session");
        return;
      }

      // 2) Open Cashfree checkout
      // Cashfree SDK exposes `Cashfree` global
      if (typeof Cashfree === "undefined" && typeof window.Cashfree === "undefined") {
        alert("Payment SDK not loaded.");
        return;
      }

      // use the SDK to open checkout — sandbox/production mode depends on your account
      try {
        // Newer Cashfree SDK accepts an object with paymentSessionId
        // For production: mode = 'production'; for testing use 'sandbox'
        const cf = new Cashfree({ mode: "production" }); // change to 'sandbox' for testing
        cf.checkout({ paymentSessionId });
      } catch (err) {
        // fallback: some versions expose a static method
        try {
          window.Cashfree.checkout({ paymentSessionId });
        } catch (err2) {
          console.error("Cashfree checkout error:", err, err2);
          alert("Unable to open payment checkout.");
        }
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Check console for details.");
    }
  });
});
