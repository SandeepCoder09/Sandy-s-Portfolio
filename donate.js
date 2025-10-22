document.getElementById("donateBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const amount = document.getElementById("amount").value;
  if (!amount || amount < 1) {
    alert("Please enter a valid amount!");
    return;
  }

  const options = {
    key: "rzp_live_RSVszqa9cSv5dY",
    amount: amount * 100, // amount in paise
    currency: "INR",
    name: "Sandy Portfolio",
    description: "Donation Support",
    image: "favicon.png",
    theme: { color: "#00c6ff" },
    handler: function (response) {
      alert("🎉 Thank you for your support!\nPayment ID: " + response.razorpay_payment_id);
    },
    prefill: {
      name: "Supporter",
      email: "example@gmail.com",
      contact: "9999999999",
    },
  };

  const rzp = new Razorpay(options);
  rzp.open();
});