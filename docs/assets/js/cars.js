import { db } from "./firebase.js";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* Cars */
const carsContainer = document.getElementById("cars");

const q = query(collection(db, "cars"), orderBy("updatedAt", "desc"));

onSnapshot(q, snapshot => {
  carsContainer.innerHTML = "";
  snapshot.forEach(d => {
    const car = d.data();
    carsContainer.innerHTML += `
      <div class="car-card">
        ${car.isNew ? `<span class="badge">NEW</span>` : ""}
        <img src="assets/images/${car.image}">
        <h3>${car.name}</h3>
        <p>${car.description}</p>
        <strong>${car.price} €</strong>
      </div>
    `;
  });
});

/* About */
onSnapshot(doc(db, "settings", "about"), snap => {
  if (snap.exists()) {
    document.getElementById("aboutText").textContent = snap.data().text;
  }
});

/* Departments */
onSnapshot(doc(db, "settings", "departments"), snap => {
  if (!snap.exists()) return;

  const select = document.getElementById("departments");
  select.innerHTML = "";

  snap.data().list.forEach(dep => {
    const opt = document.createElement("option");
    opt.textContent = dep;
    select.appendChild(opt);
  });
});
