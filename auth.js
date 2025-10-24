document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const forgotLink = document.getElementById("forgotLink");
  const forgotPopup = document.getElementById("forgotPopup");
  const closePopup = document.getElementById("closePopup");
  const resetBtn = document.getElementById("resetBtn");

  // Registration
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (name && email && password) {
        localStorage.setItem("user", JSON.stringify({ name, email, password }));
        showSuccess("Registration Successful!", "donate.html");
      } else {
        alert("Please fill all fields!");
      }
    });
  }

  // Login
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
        alert("Invalid credentials!");
      }
    });
  }

  // Forgot Password Logic
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
        alert("Password reset successful! You can now login with your new password.");
        forgotPopup.classList.remove("active");
      } else {
        alert("No account found with that email!");
      }
    });
  }

  // Redirect protection for donation page
  if (window.location.pathname.includes("donate.html")) {
    const loggedIn = localStorage.getItem("userLoggedIn");
    if (!loggedIn) {
      window.location.href = "register.html";
    }
  }
});

// Success animation popup
function showSuccess(message, redirectPage) {
  const popup = document.getElementById("successPopup");
  const messageBox = document.getElementById("successMessage");
  messageBox.textContent = message;
  popup.classList.add("active");

  setTimeout(() => {
    popup.classList.remove("active");
    window.location.href = redirectPage;
  }, 2000);
}