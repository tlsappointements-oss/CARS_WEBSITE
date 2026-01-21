import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.login = async () => {
  const emailVal = document.getElementById("email").value;
  const passVal = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, emailVal, passVal);
    window.location.href = "admin.html";
  } catch (err) {
    document.getElementById("error").innerText =
      "Wrong email or password";
  }
};

window.logout = async () => {
  await signOut(auth);
  window.location.href = "login.html";
};

/* 🔒 PROTECT ADMIN PAGE */
onAuthStateChanged(auth, user => {
  if (!user && window.location.pathname.includes("admin.html")) {
    window.location.href = "login.html";
  }
});
