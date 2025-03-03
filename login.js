import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCruzuiwQ9qEZPoTPc-hzimE__PPhZhpx0",
  authDomain: "madarts-284b1.firebaseapp.com",
  projectId: "madarts-284b1",
  storageBucket: "madarts-284b1.firebasestorage.app",
  messagingSenderId: "1074604608284",
  appId: "1:1074604608284:web:5fd93d30bc391c6f72c8d9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const showMessage = (msg, type) => {
  const msgDiv = document.getElementById("formMessage");
  if (msgDiv) {
    msgDiv.innerHTML = `<p style="color: ${
      type === "success" ? "green" : "red"
    }; font-weight: 300;">${msg}</p>`;
    setTimeout(() => (msgDiv.innerHTML = ""), 3000);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("submitBtn")?.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();
    if (!email || !password)
      return showMessage("Enter email and password", "error");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showMessage("Login successful", "success");
      setTimeout(() => (window.location.href = "dashboard.html"), 2000);
    } catch (err) {
      showMessage(
        "Invalid credentials. Please check your email and password.",
        "error"
      );
    }
  });

  document.getElementById("reset")?.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email")?.value.trim();
    if (!email) return showMessage("Enter your email", "error");
    try {
      await sendPasswordResetEmail(auth, email);
      showMessage("Password reset email sent", "success");
    } catch (err) {
      showMessage("Error sending reset email", "error");
    }
  });
});
