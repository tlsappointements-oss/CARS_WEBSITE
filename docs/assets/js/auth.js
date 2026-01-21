import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.login = () => {
  signInWithEmailAndPassword(
    auth,
    email.value,
    password.value
  ).then(() => {
    location.href = "admin.html";
  }).catch(() => {
    error.innerText = "Wrong email or password";
  });
};

window.logout = () => {
  signOut(auth).then(() => location.href = "login.html");
};

onAuthStateChanged(auth, user => {
  if (!user && location.pathname.includes("admin.html")) {
    location.href = "login.html";
  }
});
