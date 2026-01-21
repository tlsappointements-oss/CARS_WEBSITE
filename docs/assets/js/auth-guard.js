// Replace with real auth later
if (!sessionStorage.getItem("admin")) {
  window.location.replace("login.html");
} else {
  document.body.style.display = "block";
}

function logout() {
  sessionStorage.removeItem("admin");
  window.location.replace("login.html");
}
