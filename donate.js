// Theme toggle logic
    const themeSwitch = document.getElementById("theme-switch");
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      themeSwitch.checked = true;
    }
    themeSwitch.addEventListener("change", () => {
      if (themeSwitch.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    });

    // Amount button logic
    const amountButtons = document.querySelectorAll(".amount-btn");
    const customInput = document.querySelector(".custom-input");
    const customField = document.getElementById("custom-amount");
    let selectedAmount = 0;

    amountButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        amountButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        if (btn.classList.contains("custom")) {
          customInput.style.display = "block";
          selectedAmount = 0;
        } else {
          customInput.style.display = "none";
          selectedAmount = btn.dataset.amount;
        }
      });
    });

    // Razorpay integration
    document.getElementById("donation-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const amount = selectedAmount || customField.value;
      if (!amount) {
        alert("Please select or enter a donation amount.");
        return;
      }

      const options = {
        key: "rzp_live_RSVszqa9cSv5dY",
        amount: amount * 100,
        currency: "INR",
        name: "Sandy’s Portfolio",
        description: "Donation Support",
        image: "09group.png",
        handler: function(response) {
          alert("Thank you for your donation! Payment ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: document.getElementById("donor-name").value,
          email: document.getElementById("donor-email").value,
        },
        theme: { color: "#007bff" },
      };
      const rzp = new Razorpay(options);
      rzp.open();
    });
handler: function(response) {
  window.location.href = "success.html";
}