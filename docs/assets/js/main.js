import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp({
  apiKey: "AIzaSyDnp4fC2_cEw04ydtWOwYgVzRUsqScufFs",
  authDomain: "cars-website-558c0.firebaseapp.com",
  projectId: "cars-website-558c0"
});

const db = getFirestore(app);
const list = document.getElementById("carsList");

const snap = await getDocs(collection(db,"cars"));
snap.forEach(d=>{
  const c=d.data();
  list.innerHTML += `
    <div class="car">
      <img src="${c.image}">
      <div>
        <h3>${c.name}</h3>
        <p>${c.description}</p>
        <strong>${c.price} €</strong>
        ${c.isNew ? "<span style='color:red'> NEW</span>" : ""}
      </div>
    </div>`;
});
