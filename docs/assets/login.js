import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const app = initializeApp({
  apiKey: "AIzaSyDnp4fC2_cEw04ydtWOwYgVzRUsqScufFs",
  authDomain: "cars-website-558c0.firebaseapp.com"
});

const auth = getAuth(app);

login.onclick = async ()=>{
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    location.href="admin.html";
  } catch {
    error.textContent="Wrong email or password";
  }
};
