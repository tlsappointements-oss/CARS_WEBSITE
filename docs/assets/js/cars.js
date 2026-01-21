import { db } from "./firebase.js";
import {
  collection,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const carsContainer = document.getElementById("cars");

const q = query(
  collection(db, "cars"),
  orderBy("updatedAt", "desc")
);

onSnapshot(q, snapshot => {
  carsContainer.innerHTML = "";

  snapshot.forEach(doc => {
    const car = doc.data();

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
