document.addEventListener("DOMContentLoaded", () => {
  const amountButtons = document.querySelectorAll(".amount");
  const customInput = document.getElementById("customAmount");
  const donateForm = document.getElementById("donateForm");

  let selectedAmount = 0;

  // Your Render backend
  const BACKEND_URL = "https://sandy-s-portfolio.onrender.com";

  amountButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      selectedAmount = parseInt(btn.dataset.amount);
      amountButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      customInput.value = "";
    });
  });

  customInput.addEventListener("input", () => {
    selectedAmount = parseInt(customInput.value || 0);
    amountButtons.forEach(b => b.classList.remove("active"));
  });

  donateForm.addEventListener("submit", async e => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!selectedAmount || selectedAmount <= 0) {
      alert("Please select or enter a valid amount.");
      return;
    }

    try {
      // Create order via backend
      const orderRes = await fetch(`${BACKEND_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedAmount,
          name,
          email,
          message
        })
      });

      const data = await orderRes.json();

      if (!data.order_token) {
        alert("Error creating order. Check server logs.");
        return;
      }

      // Open Cashfree Checkout
      cashfree.checkout({
        paymentSessionId: data.order_token,
        redirectTarget: "_self"
      });

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    }
  });
});
