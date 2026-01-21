import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnp4fC2_cEw04ydtWOwYgVzRUsqScufFs",
  authDomain: "cars-website-558c0.firebaseapp.com",
  projectId: "cars-website-558c0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* 🔐 PROTECT PAGE */
onAuthStateChanged(auth, (user) => {
  if (!user) location.replace("login.html");
});

/* LOGOUT */
logout.onclick = () => signOut(auth).then(() => location.href = "login.html");

/* LOAD CARS */
async function loadCars() {
  const snap = await getDocs(collection(db, "cars"));
  cars.innerHTML = "";

  snap.forEach(d => {
    const c = d.data();
    cars.innerHTML += `
      <div class="car">
        <input id="name-${d.id}" value="${c.name}">
        <input id="price-${d.id}" value="${c.price}">
        <textarea id="desc-${d.id}">${c.description}</textarea>
        <label>
          <input type="checkbox" id="new-${d.id}" ${c.isNew ? "checked" : ""}>
          NEW
        </label>
        <button onclick="saveCar('${d.id}')">Save</button>
      </div>
    `;
  });
}

window.saveCar = async function(id) {
  await updateDoc(doc(db, "cars", id), {
    name: document.getElementById(`name-${id}`).value,
    price: document.getElementById(`price-${id}`).value,
    description: document.getElementById(`desc-${id}`).value,
    isNew: document.getElementById(`new-${id}`).checked
  });
  alert("Saved");
};

loadCars();
