import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.login = async () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth,email,pass);
    location.href = "admin.html";
  } catch {
    alert("Wrong email or password");
  }
};

onAuthStateChanged(auth,user=>{
  if(user && location.pathname.includes("login")) {
    location.href="admin.html";
  }
});
