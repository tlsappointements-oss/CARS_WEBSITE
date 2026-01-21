import { auth } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/*
  HARD LOCK:
  - Page stays hidden
  - Redirect BEFORE render
*/
onAuthStateChanged(auth, user => {
  if (!user) {
    // Not logged in → redirect immediately
    window.location.replace("login.html");
  } else {
    // Logged in → allow render
    document.documentElement.style.visibility = "visible";
  }
});
