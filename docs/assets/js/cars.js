import { db } from "./firebase.js";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* CARS */
const carsGrid = document.getElementById("carsGrid");

const q = query(collection(db, "cars"), orderBy("updatedAt", "desc"));

onSnapshot(q, snap => {
  carsGrid.innerHTML = "";

  snap.forEach(d => {
    const car = d.data();

    carsGrid.innerHTML += `
      <div class="car-card">
        ${car.isNew ? `<span class="badge">NEW</span>` : ""}
        <img src="assets/images/${car.image}">
        <div class="car-info">
          <h3>${car.name}</h3>
          <p>${car.description}</p>
          <div class="price">${car.price} €</div>
        </div>
      </div>
    `;
  });
});

/* ABOUT */
onSnapshot(doc(db, "settings", "about"), snap => {
  if (snap.exists()) {
    document.getElementById("aboutText").textContent = snap.data().text;
  }
});

/* DEPARTMENTS */
onSnapshot(doc(db, "settings", "departments"), snap => {
  if (!snap.exists()) return;

  const list = document.getElementById("departmentsList");
  list.innerHTML = "";

  snap.data().list.forEach(dep => {
    const span = document.createElement("span");
    span.textContent = dep;
    list.appendChild(span);
  });
});
