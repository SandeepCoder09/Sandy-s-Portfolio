// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAR2bTveqOertBkpt95YId9hDPrg6S9_E",
  authDomain: "budgetmate-5449e.firebaseapp.com",
  projectId: "budgetmate-5449e",
  storageBucket: "budgetmate-5449e.firebasestorage.app",
  messagingSenderId: "312843485011",
  appId: "1:312843485011:web:347c18ee0ad022a1beaba6",
  measurementId: "G-SET4XMM2ZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// reCAPTCHA verifier
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  size: 'normal',
  callback: (response) => {
    console.log('reCAPTCHA verified');
  }
});

// Send OTP
window.sendOTP = function() {
  const phoneNumber = document.getElementById('phone').value;
  const appVerifier = window.recaptchaVerifier;
  const message = document.getElementById('message');

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      message.textContent = "✅ OTP sent successfully!";
      message.className = "success";
    })
    .catch((error) => {
      message.textContent = "❌ " + error.message;
      message.className = "error";
    });
};

// Verify OTP
window.verifyOTP = function() {
  const code = document.getElementById('otp').value;
  const message = document.getElementById('message');

  window.confirmationResult.confirm(code)
    .then((result) => {
      const user = result.user;
      message.textContent = "✅ Phone verified successfully!";
      message.className = "success";

      // TODO: Store user info in your database here
      setTimeout(() => {
        window.location.href = "index.html"; // Redirect after verification
      }, 2000);
    })
    .catch((error) => {
      message.textContent = "❌ Invalid OTP. Try again!";
      message.className = "error";
    });
};
