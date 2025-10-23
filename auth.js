document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const forgotForm = document.getElementById("forgotForm");

  // Register
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const user = { name, email, password };
      localStorage.setItem("user", JSON.stringify(user));
      alert("Registration successful!");
      window.location.href = "login.html";
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
        localStorage.setItem("loggedIn", "true");
        alert("Login successful!");
        window.location.href = "donate.html";
      } else {
        alert("Invalid email or password!");
      }
    });
  }

  // Forgot password
  if (forgotForm) {
    forgotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("forgotEmail").value;
      const newPassword = document.getElementById("newPassword").value;
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser && storedUser.email === email) {
        storedUser.password = newPassword;
        localStorage.setItem("user", JSON.stringify(storedUser));
        alert("Password updated successfully!");
        window.location.href = "login.html";
      } else {
        alert("Email not found. Please register first.");
      }
    });
  }
});