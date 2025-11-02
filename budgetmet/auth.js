import { auth, db } from "./firebase.js";

const emailEl = document.getElementById("email");
const passEl = document.getElementById("password");
const msg = document.getElementById("message");

// Auto redirect if already signed in
auth.onAuthStateChanged(user => {
  if (user) {
    window.location.href = "frontend/index.html";
  }
});

document.getElementById("signUp").addEventListener("click", async () => {
  const email = emailEl.value.trim();
  const pass = passEl.value;
  if (!email || pass.length < 6) return showMsg("Enter valid email and password (min 6 chars)", false);

  try {
    const user = await auth.createUserWithEmailAndPassword(email, pass);
    await db.collection("users").doc(user.user.uid).set({ createdAt: new Date() });
    showMsg("Account created! Redirecting...");
    setTimeout(() => (window.location.href = "frontend/index.html"), 800);
  } catch (e) {
    showMsg(e.message, false);
  }
});

document.getElementById("signIn").addEventListener("click", async () => {
  const email = emailEl.value.trim();
  const pass = passEl.value;
  if (!email || !pass) return showMsg("Please fill in all fields", false);

  try {
    await auth.signInWithEmailAndPassword(email, pass);
    showMsg("Signed in successfully! Redirecting...");
    setTimeout(() => (window.location.href = "frontend/index.html"), 600);
  } catch (e) {
    showMsg(e.message, false);
  }
});

document.getElementById("guest").addEventListener("click", () => {
  window.location.href = "frontend/index.html";
});

function showMsg(text, ok = true) {
  msg.textContent = text;
  msg.style.color = ok ? "#00ffc8" : "#ff7b7b";
}
