import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const errorBox = document.getElementById("error");

/* 🔒 If already logged in, redirect */
onAuthStateChanged(auth, user => {
  if (user) {
    window.location.replace("admin.html");
  }
});

/* 🔑 Login */
loginBtn.addEventListener("click", async () => {
  errorBox.textContent = "";

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    errorBox.textContent = "Please fill all fields";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.replace("admin.html");
  } catch (err) {
    errorBox.textContent = "Invalid email or password";
    console.error(err.code);
  }
});
