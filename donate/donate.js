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

document.getElementById("donateForm").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.style.display = "none";
  document.getElementById("donateSuccess").style.display = "block";
});
