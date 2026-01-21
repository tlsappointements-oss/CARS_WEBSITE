import { db } from "./firebase.js";
import { collection, getDocs } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const carsDiv = document.getElementById("cars");
const snap = await getDocs(collection(db, "cars"));

snap.forEach(doc => {
  const c = doc.data();
  carsDiv.innerHTML += `
    <div class="car">
      <img src="assets/images/${c.image}">
      <div class="car-content">
        ${c.isNew ? '<span class="badge">NEW</span>' : ''}
        <h3>${c.name}</h3>
        <p>${c.description}</p>
        <strong>${c.price} €</strong>
      </div>
    </div>
  `;
});
