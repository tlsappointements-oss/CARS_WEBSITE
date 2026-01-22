// assets/js/login.js
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");
  const errorBox = document.getElementById("error");

  if (!loginBtn) {
    console.error("loginBtn not found in DOM");
    return;
  }

  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    errorBox.style.display = "none";

    if (!email || !password) {
      errorBox.textContent = "Email and password required";
      errorBox.style.display = "block";
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "admin.html";
    } catch (err) {
      console.error(err);
      errorBox.textContent = err.message;
      errorBox.style.display = "block";
    }
  });

});
