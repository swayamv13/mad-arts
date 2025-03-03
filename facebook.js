import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
  getAuth,
  FacebookAuthProvider,
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
auth.languageCode = "en"; // corrected property name
const provider = new FacebookAuthProvider();

const facebookLogin = document.getElementById("FacebookBtn");
if (facebookLogin) {
  facebookLogin.addEventListener("click", function (event) {
    event.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        console.log(user);
        window.location.href = "dashboard.html"; // corrected redirect URL
      })
      .catch((error) => {
        console.error("Error during Facebook sign-in:", error);
        // You can show an error message to the user here if needed.
      });
  });
} else {
  console.error("Facebook login button not found");
}
