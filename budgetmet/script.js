// script.js
import { auth, db } from "./firebase.js";

const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const addBtn = document.getElementById("add");
const list = document.getElementById("list");
const balance = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const dateEl = document.getElementById("live-date");
const userEmail = document.getElementById("userEmail");
const signOutBtn = document.getElementById("signOutBtn");

let currentUser = null;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let unsubscribe = null;

// Live Date/Time
setInterval(() => {
  const now = new Date();
  dateEl.textContent = now.toLocaleString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}, 1000);

// Validate inputs
function validate() {
  addBtn.disabled = !(desc.value && amount.value && type.value);
}
[desc, amount, type].forEach(el => el.addEventListener("input", validate));

// Render transactions (newest first)
function render() {
  list.innerHTML = "";
  const sorted = [...transactions].reverse();
  let inc = 0, exp = 0;

  sorted.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${t.desc}</strong>
        <small>${t.dateTime}</small>
      </div>
      <span class="${t.type}">${t.type === "income" ? "+" : "-"}₹${t.amount}</span>
    `;
    list.appendChild(li);
    t.type === "income" ? inc += t.amount : exp += t.amount;
  });

  incomeEl.textContent = `₹${inc}`;
  expenseEl.textContent = `₹${exp}`;
  balance.textContent = `₹${(inc - exp).toFixed(2)}`;
}

// Add transaction
addBtn.addEventListener("click", async () => {
  const now = new Date();
  const tx = {
    desc: desc.value.trim(),
    amount: parseFloat(amount.value),
    type: type.value,
    dateTime: now.toLocaleString(),
  };

  if (currentUser) {
    await db.collection("users").doc(currentUser.uid).collection("transactions").add({
      ...tx,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } else {
    transactions.push(tx);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    render();
  }

  desc.value = "";
  amount.value = "";
  type.value = "";
  validate();
});

// Firebase Auth
auth.onAuthStateChanged(async user => {
  currentUser = user;
  if (user) {
    userEmail.textContent = user.email;
    signOutBtn.style.display = "inline-block";

    if (unsubscribe) unsubscribe();
    unsubscribe = db
      .collection("users")
      .doc(user.uid)
      .collection("transactions")
      .orderBy("createdAt", "desc")
      .onSnapshot(snap => {
        transactions = snap.docs.map(doc => doc.data());
        localStorage.setItem("transactions", JSON.stringify(transactions));
        render();
      });
  } else {
    userEmail.textContent = "Guest";
    signOutBtn.style.display = "none";
    transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    render();
  }
});

signOutBtn.addEventListener("click", async () => {
  await auth.signOut();
});

render();
