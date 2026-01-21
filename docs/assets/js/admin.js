import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ---------------- SAVE CAR ---------------- */
window.saveCar = async function () {
  const name = nameInput.value.trim();
  const price = priceInput.value.trim();
  const desc = descInput.value.trim();
  const image = imageInput.value;
  const isNew = isNewInput.checked;

  if (!name || !price) {
    alert("Name and price are required");
    return;
  }

  await addDoc(collection(db, "cars"), {
    name,
    price,
    description: desc,
    image,
    isNew,
    updatedAt: serverTimestamp()
  });

  alert("Car saved successfully");
  document.querySelector(".form").reset();
  loadCarsForDelete();
};

/* ---------------- DELETE CAR ---------------- */
async function loadCarsForDelete() {
  const snap = await getDocs(collection(db, "cars"));
  const select = document.getElementById("deleteCarSelect");
  select.innerHTML = "";

  snap.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d.id;
    opt.textContent = d.data().name;
    select.appendChild(opt);
  });
}

window.deleteCar = async function () {
  const id = document.getElementById("deleteCarSelect").value;
  if (!id) return;

  await deleteDoc(doc(db, "cars", id));
  alert("Car deleted");
  loadCarsForDelete();
};

/* ---------------- ABOUT ---------------- */
window.saveAbout = async function () {
  const text = document.getElementById("aboutInput").value.trim();
  if (!text) return alert("About text required");

  await setDoc(doc(db, "settings", "about"), { text });
  alert("About section updated");
};

/* ---------------- DEPARTMENTS ---------------- */
window.saveDepartments = async function () {
  const list = document.getElementById("departmentsInput")
    .value.split(",")
    .map(d => d.trim())
    .filter(Boolean);

  await setDoc(doc(db, "settings", "departments"), { list });
  alert("Departments updated");
};

/* INIT */
loadCarsForDelete();
