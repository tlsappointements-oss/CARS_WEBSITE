const EMAIL = "admin@admin.com";
const PASSWORD = "123";

function login() {
  if (
    email.value === EMAIL &&
    password.value === PASSWORD
  ) {
    sessionStorage.setItem("auth", "true");
    location.href = "admin.html";
  } else {
    alert("Wrong credentials");
  }
}
