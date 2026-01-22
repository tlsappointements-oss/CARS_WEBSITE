/* =========================
   FIREBASE IMPORTS (ONCE)
========================= */
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* =========================
   DOM REFERENCES (SAFE)
========================= */
const name = document.getElementById("name");
const price = document.getElementById("price");
const desc = document.getElementById("desc");
const image = document.getElementById("image");
const isNew = document.getElementById("isNew");
const carId = document.getElementById("carId");

const carsList = document.getElementById("carsList");
const aboutInput = document.getElementById("aboutInput");
const departmentsInput = document.getElementById("departmentsInput");

/* =========================
   PANEL SWITCH (SAFE)
========================= */
window.switchPanel = function () {
  const panelSelect = document.getElementById("panelSelect");
  if (!panelSelect) return;

  const v = panelSelect.value;

  const carsPanel = document.getElementById("carsPanel");
  const aboutPanel = document.getElementById("aboutPanel");
  const departmentsPanel = document.getElementById("departmentsPanel");

  if (carsPanel)
    carsPanel.style.display = v === "cars" ? "block" : "none";

  if (aboutPanel)
    aboutPanel.style.display = v === "about" ? "block" : "none";

  if (departmentsPanel)
    departmentsPanel.style.display = v === "departments" ? "block" : "none";
};

/* =========================
   CARS CRUD
========================= */
const carsCol = collection(db, "cars");

async function loadCars() {
  if (!carsList) return;

  const snap = await getDocs(carsCol);

  carsList.innerHTML = "<option value=''>Select car</option>";

  snap.forEach(d => {
    const o = document.createElement("option");
    o.value = d.id;
    o.textContent = d.data().name;
    carsList.appendChild(o);
  });
}

window.saveCar = async function () {
  if (!name || !price || !desc || !image || !isNew || !carId) return;

  const id = carId.value;

  const data = {
    name: name.value,
    price: price.value,
    description: desc.value,
    image: image.value,
    isNew: isNew.checked,
    updatedAt: serverTimestamp()
  };

  if (id) {
    await updateDoc(doc(db, "cars", id), data);
    alert("Car updated");
  } else {
    await addDoc(carsCol, data);
    alert("Car added");
  }

  name.value = "";
  price.value = "";
  desc.value = "";
  image.value = "";
  isNew.checked = false;
  carId.value = "";

  loadCars();
};

window.loadCarForEdit = async function () {
  if (!carsList) return;

  const id = carsList.value;
  if (!id) return;

  const snap = await getDocs(carsCol);

  snap.forEach(d => {
    if (d.id === id) {
      const c = d.data();
      carId.value = id;
      name.value = c.name;
      price.value = c.price;
      desc.value = c.description;
      image.value = c.image;
      isNew.checked = c.isNew;
    }
  });
};

window.deleteCar = async function () {
  if (!carsList || !carsList.value) return;

  await deleteDoc(doc(db, "cars", carsList.value));
  alert("Car deleted");
  loadCars();
};

/* =========================
   ABOUT
========================= */
window.saveAbout = async function () {
  if (!aboutInput) return;

  await setDoc(doc(db, "settings", "about"), {
    text: aboutInput.value
  });

  alert("About updated");
};

/* =========================
   DEPARTMENTS
========================= */
window.saveDepartments = async function () {
  if (!departmentsInput) return;

  const list = departmentsInput.value
    .split(",")
    .map(v => v.trim());

  await setDoc(doc(db, "settings", "departments"), { list });
  alert("Departments updated");
};

/* =========================
   INIT
========================= */
loadCars();
