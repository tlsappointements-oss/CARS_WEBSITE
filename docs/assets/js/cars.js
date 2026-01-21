import { db } from "./firebase.js";
import {
  collection, onSnapshot, doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const carsEl = document.getElementById("cars");
const aboutText = document.getElementById("aboutText");
const deptSelect = document.getElementById("departmentsSelect");

onSnapshot(collection(db,"cars"), snap => {
  carsEl.innerHTML = "";
  snap.forEach(d => {
    const c = d.data();
    carsEl.innerHTML += `
      <div class="car-card">
        ${c.isNew ? `<div class="badge">NEW</div>` : ""}
        <img src="assets/images/${c.image}">
        <div class="car-body">
          <h3>${c.name}</h3>
          <p>${c.description}</p>
          <div class="car-price">${c.price} €</div>
        </div>
      </div>
    `;
  });
});

onSnapshot(doc(db,"settings","about"), snap => {
  if (snap.exists()) aboutText.textContent = snap.data().text;
});

onSnapshot(doc(db,"settings","departments"), snap => {
  if (!snap.exists()) return;
  deptSelect.innerHTML = "";
  snap.data().list.forEach(d => {
    const o = document.createElement("option");
    o.textContent = d;
    deptSelect.appendChild(o);
  });
});
