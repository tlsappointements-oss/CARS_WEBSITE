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
   DOM REFERENCES (REQUIRED)
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
   PANEL SWITCH
========================= */
window.switchPanel = function () {
  const v = document.getElementById("panelSelect").value;

  document.getElementById("carsPanel").style.display =
    v === "cars" ? "block" : "none";

  document.getElementById("aboutPanel").style.display =
    v === "about" ? "block" : "none";

  document.getElementById("departmentsPanel").style.display =
    v === "departments" ? "block" : "none";
};

/* =========================
   CARS CRUD
========================= */
const carsCol = collection(db, "cars");

async function loadCars() {
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
  if (!carsList.value) return;

  await deleteDoc(doc(db, "cars", carsList.value));
  alert("Car deleted");
  loadCars();
};

/* =========================
   ABOUT
========================= */
window.saveAbout = async function () {
  await setDoc(doc(db, "settings", "about"), {
    text: aboutInput.value
  });
  alert("About updated");
};

/* =========================
   DEPARTMENTS
========================= */
window.saveDepartments = async function () {
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
