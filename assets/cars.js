import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnp4fC2_cEw04ydtWOwYgVzRUsqScufFs",
  authDomain: "cars-website-558c0.firebaseapp.com",
  projectId: "cars-website-558c0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const container = document.getElementById("cars");

const snap = await getDocs(collection(db, "cars"));
snap.forEach(d => {
  const c = d.data();
  container.innerHTML += `
    <div>
      <h3>${c.name} ${c.isNew ? "🆕" : ""}</h3>
      <p>${c.description}</p>
      <strong>${c.price}</strong>
    </div>
  `;
});
