<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Admin Dashboard</title>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="assets/css/style.css">

  <!-- 🔐 AUTH GUARD -->
  <script type="module">
    import { auth } from "./assets/js/firebase.js";
    import { onAuthStateChanged, signOut }
      from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

    // Hide page by default
    document.documentElement.style.display = "none";

    onAuthStateChanged(auth, user => {
      if (!user) {
        // ❌ Not logged in → instant redirect
        window.location.replace("login.html");
      } else {
        // ✅ Logged in → show admin
        document.documentElement.style.display = "block";
      }
    });

    window.logout = async () => {
      await signOut(auth);
      window.location.replace("login.html");
    };
  </script>
</head>

<body>

<div class="admin-layout">

  <aside>
    <h2>Admin Panel</h2>
    <button onclick="logout()">Logout</button>
  </aside>

  <main>

    <h1>Manage Cars</h1>

    <div class="form">
      <input id="name" placeholder="Car name">
      <input id="price" placeholder="Price (€)">
      <textarea id="desc" placeholder="Description"></textarea>

      <select id="image">
        <option value="a-class.jpg">A-Class</option>
        <option value="c-class.jpg">C-Class</option>
        <option value="e-class.jpg">E-Class</option>
        <option value="s-class.jpg">S-Class</option>
      </select>

      <label>
        <input type="checkbox" id="isNew"> New model
      </label>

      <button onclick="saveCar()">Save Car</button>
    </div>

    <hr>

    <h2>Delete Car</h2>
    <select id="deleteCarSelect"></select>
    <button onclick="deleteCar()">Delete Selected Car</button>

    <hr>

    <h2>Edit About Section</h2>
    <textarea id="aboutInput" rows="5"></textarea>
    <button onclick="saveAbout()">Save About</button>

    <hr>

    <h2>Company Departments</h2>
    <input id="departmentsInput" placeholder="Sales, Service, Finance">
    <button onclick="saveDepartments()">Save Departments</button>

  </main>
</div>

<script type="module" src="assets/js/admin.js"></script>

</body>
</html>
