import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
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
auth.langauageCode = "en";
const provider = new GoogleAuthProvider();

const googleBtn = document.getElementById("googleLoginBtn");
googleBtn.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});
