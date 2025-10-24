document.addEventListener("DOMContentLoaded", () => {
  const amountButtons = document.querySelectorAll(".amount");
  const customInput = document.getElementById("customAmount");
  const donateForm = document.getElementById("donateForm");

  let selectedAmount = 0;

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

  donateForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (selectedAmount <= 0) {
      alert("Please enter or select a valid amount!");
      return;
    }

    const options = {
      key: "rzp_live_RSVszqa9cSv5dY",
      amount: selectedAmount * 100, // amount in paise
      currency: "INR",
      name: "Sandy's Portfolio",
      description: "Support my work 💖",
      image: "https://sandeepcoder09.github.io/Sandy-s-Portfolio/logo.png",
      handler: function (response) {
        alert(`🎉 Thank you for your donation!\nPayment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: name,
        email: email
      },
      theme: {
        color: "#007bff"
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  });
});