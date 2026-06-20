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
  totalDisplay.textContent = "₹" + (customAmt.value || "0");
});

document
  .getElementById("donateForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    let amount;
    if (customWrap.style.display === "block") {
      amount = parseInt(customAmt.value);
    } else {
      amount = selected;
    }

    if (!amount || amount < 1) {
      alert("Enter valid amount");
      return;
    }

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          amount,
        }),
      });

      if (!response.ok) {
        alert("Unable to create order.");
        return;
      }

      const order = await response.json();
      var options = {
        key: order.key,
        amount: order.amount,
        currency: "INR",
        name: "Support Sandy's Work ❤️",
        description:"Website Development & Creative Services Support",
        image:
          "https://sandy-s-portfolio-nine.vercel.app/assets/09logo-black.jpg",
        order_id: order.id,
        theme: {
          color: "#ff6b2b",
        },

        handler: async function (response) {
          try {
            const verify = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify(response),
            });

            const result = await verify.json();
            if (result.success) {
              console.log(response.razorpay_payment_id);

              alert(
                "Thank you ❤️\n\nPayment Successful\n\nPayment ID:\n" +
                  response.razorpay_payment_id,
              );

              document.getElementById("donateForm").style.display = "none";
              document.getElementById("donateSuccess").style.display = "block";
            } else {
              alert("Verification failed");
            }
          } catch (error) {
            console.error(error);
            alert("Verification error.");
          }
        },
      };

      const rzp = new Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert("Payment failed.\n\n" + response.error.description);
      });

      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  });
