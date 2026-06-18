document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const forgotLink = document.getElementById("forgotLink");
  const forgotPopup = document.getElementById("forgotPopup");
  const closePopup = document.getElementById("closePopup");
  const resetBtn = document.getElementById("resetBtn");

  // -----------------------------
  // ✅ Registration
  // -----------------------------
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (name && email && password) {
        localStorage.setItem("user", JSON.stringify({ name, email, password }));
        localStorage.setItem("userLoggedIn", "true");
        showSuccess("Registration Successful!", "donate.html");
      } else {
        alert("⚠️ Please fill in all fields!");
      }
    });
  }

  // -----------------------------
  // ✅ Login
  // -----------------------------
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser && storedUser.email === email && storedUser.password === password) {
        localStorage.setItem("userLoggedIn", "true");
        showSuccess("Login Successful!", "donate.html");
      } else {
        alert("❌ Invalid email or password!");
      }
    });
  }

  // -----------------------------
  // ✅ Forgot Password
  // -----------------------------
  if (forgotLink) {
    forgotLink.addEventListener("click", (e) => {
      e.preventDefault();
      forgotPopup.classList.add("active");
    });
  }

  if (closePopup) {
    closePopup.addEventListener("click", () => {
      forgotPopup.classList.remove("active");
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const email = document.getElementById("resetEmail").value;
      const newPassword = document.getElementById("newPassword").value;
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser && storedUser.email === email) {
        storedUser.password = newPassword;
        localStorage.setItem("user", JSON.stringify(storedUser));
        alert("✅ Password reset successful! Please login with your new password.");
        forgotPopup.classList.remove("active");
      } else {
        alert("⚠️ No user found with that email!");
      }
    });
  }

  // -----------------------------
  // ✅ Logout
  // -----------------------------
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("userLoggedIn");
      showSuccess("Logged out successfully!", "login.html");
    });
  }

  // -----------------------------
  // ✅ Protect Donation Page
  // -----------------------------
  if (window.location.pathname.includes("donate.html")) {
    const loggedIn = localStorage.getItem("userLoggedIn");
    if (!loggedIn) {
      window.location.href = "register.html";
    }
  }
});

// -----------------------------
// ✅ Success Animation Function
// -----------------------------
function showSuccess(message, redirectPage) {
  let popup = document.getElementById("successPopup");
  let messageBox = document.getElementById("successMessage");

  if (!popup) {
    popup = document.createElement("div");
    popup.id = "successPopup";
    popup.className = "success-popup";
    popup.innerHTML = `
      <div class="popup-box">
        <h2 id="successMessage">${message}</h2>
      </div>`;
    document.body.appendChild(popup);
  }

  messageBox = document.getElementById("successMessage");
  messageBox.textContent = message;

  popup.classList.add("active");

  setTimeout(() => {
    popup.classList.remove("active");
    window.location.href = redirectPage;
  }, 2000);
}