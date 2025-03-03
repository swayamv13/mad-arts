import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

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
const db = getFirestore(app);

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
  const submit = document.getElementById("submitBtn");
  if (!submit) return;

  submit.addEventListener("click", (e) => {
    e.preventDefault();

    // Disable the button immediately to prevent multiple submissions
    submit.disabled = true;

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const firstName = document.getElementById("floatingfirstName").value.trim();
    const lastName = document.getElementById("floatinglastName").value.trim();

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      showMessage("Please enter all details.", "error");
      submit.disabled = false; // re-enable if error
      return;
    }
    if (password !== confirmPassword) {
      showMessage("Password and Confirm Password do not match.", "error");
      submit.disabled = false;
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        return setDoc(doc(db, "users", user.uid), {
          email: user.email,
          uid: user.uid,
          firstName,
          lastName,
        });
      })
      .then(() => {
        showMessage("Account created successfully...", "success");
        setTimeout(() => (window.location.href = "index.html"), 4000);
      })
      .catch((error) => {
        const msg =
          error.code === "auth/email-already-in-use"
            ? "User already exists."
            : error.message;
        showMessage(msg, "error");
        submit.disabled = false; // re-enable the button on error
      });
  });
});
