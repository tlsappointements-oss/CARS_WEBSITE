<!import { db } from "./firebase.js";
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

/* ==========================
   PANEL SWITCH
========================== */
window.switchPanel = function () {
  const v = document.getElementById("panelSelect").value;

  document.getElementById("carsPanel").style.display = v === "cars" ? "block" : "none";
  document.getElementById("aboutPanel").style.display = v === "about" ? "block" : "none";
  document.getElementById("departmentsPanel").style.display = v === "departments" ? "block" : "none";
};

/* ==========================
   CARS CRUD
========================== */
const carsCol = collection(db, "cars");

async function loadCars() {
  const snap = await getDocs(carsCol);
  const list = document.getElementById("carsList");

  list.innerHTML = "<option value=''>Select car</option>";

  snap.forEach(d => {
    const o = document.createElement("option");
    o.value = d.id;
    o.textContent = d.data().name;
    list.appendChild(o);
  });
}

window.saveCar = async function () {
  const id = document.getElementById("carId").value;

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

  document.querySelector(".form").reset();
  document.getElementById("carId").value = "";
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

/* ==========================
   ABOUT
========================== */
window.saveAbout = async function () {
  await setDoc(doc(db, "settings", "about"), {
    text: aboutInput.value
  });
  alert("About updated");
};

/* ==========================
   DEPARTMENTS
========================== */
window.saveDepartments = async function () {
  const list = departmentsInput.value.split(",").map(v => v.trim());
  await setDoc(doc(db, "settings", "departments"), { list });
  alert("Departments updated");
};

/* INIT */
loadCars();
import {
  getDocs,
  deleteDoc,
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* =========================
   PANEL SWITCH
========================= */
window.switchAdminSection = function () {
  const v = document.getElementById("adminSelector").value;

  document.getElementById("editCarsSection").style.display =
    v === "cars" ? "block" : "none";

  document.getElementById("aboutSection").style.display =
    v === "about" ? "block" : "none";

  document.getElementById("departmentsSection").style.display =
    v === "departments" ? "block" : "none";
};

/* =========================
   LOAD CARS FOR EDIT / DELETE
========================= */
async function loadCarsForAdmin() {
  const snap = await getDocs(collection(db, "cars"));
  const select = document.getElementById("editCarSelect");

  select.innerHTML = "<option value=''>Select a car</option>";

  snap.forEach(d => {
    const o = document.createElement("option");
    o.value = d.id;
    o.textContent = d.data().name;
    select.appendChild(o);
  });
}

window.loadCarForEdit = async function () {
  const id = document.getElementById("editCarSelect").value;
  if (!id) return;

  const snap = await getDocs(collection(db, "cars"));

  snap.forEach(d => {
    if (d.id === id) {
      const c = d.data();
      document.getElementById("name").value = c.name;
      document.getElementById("price").value = c.price;
      document.getElementById("desc").value = c.description;
      document.getElementById("image").value = c.image;
      document.getElementById("isNew").checked = c.isNew;
      document.getElementById("carId").value = d.id;
    }
  });
};

window.deleteCar = async function () {
  const id = document.getElementById("editCarSelect").value;
  if (!id) return;

  await deleteDoc(doc(db, "cars", id));
  alert("Car deleted");
  loadCarsForAdmin();
};

/* =========================
   ABOUT
========================= */
window.saveAbout = async function () {
  await setDoc(doc(db, "settings", "about"), {
    text: document.getElementById("aboutInput").value
  });
  alert("About updated");
};

/* =========================
   DEPARTMENTS
========================= */
window.saveDepartments = async function () {
  const list = document
    .getElementById("departmentsInput")
    .value.split(",")
    .map(v => v.trim());

  await setDoc(doc(db, "settings", "departments"), { list });
  alert("Departments updated");
};

/* INIT */
loadCarsForAdmin();
import {
  getDocs,
  deleteDoc,
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* =========================
   PANEL SWITCH
========================= */
window.switchAdminSection = function () {
  const v = document.getElementById("adminSelector").value;

  document.getElementById("editCarsSection").style.display =
    v === "cars" ? "block" : "none";

  document.getElementById("aboutSection").style.display =
    v === "about" ? "block" : "none";

  document.getElementById("departmentsSection").style.display =
    v === "departments" ? "block" : "none";
};

/* =========================
   LOAD CARS FOR EDIT / DELETE
========================= */
async function loadCarsForAdmin() {
  const snap = await getDocs(collection(db, "cars"));
  const select = document.getElementById("editCarSelect");

  select.innerHTML = "<option value=''>Select a car</option>";

  snap.forEach(d => {
    const o = document.createElement("option");
    o.value = d.id;
    o.textContent = d.data().name;
    select.appendChild(o);
  });
}

window.loadCarForEdit = async function () {
  const id = document.getElementById("editCarSelect").value;
  if (!id) return;

  const snap = await getDocs(collection(db, "cars"));

  snap.forEach(d => {
    if (d.id === id) {
      const c = d.data();
      document.getElementById("name").value = c.name;
      document.getElementById("price").value = c.price;
      document.getElementById("desc").value = c.description;
      document.getElementById("image").value = c.image;
      document.getElementById("isNew").checked = c.isNew;
      document.getElementById("carId").value = d.id;
    }
  });
};

window.deleteCar = async function () {
  const id = document.getElementById("editCarSelect").value;
  if (!id) return;

  await deleteDoc(doc(db, "cars", id));
  alert("Car deleted");
  loadCarsForAdmin();
};

/* =========================
   ABOUT
========================= */
window.saveAbout = async function () {
  await setDoc(doc(db, "settings", "about"), {
    text: document.getElementById("aboutInput").value
  });
  alert("About updated");
};

/* =========================
   DEPARTMENTS
========================= */
window.saveDepartments = async function () {
  const list = document
    .getElementById("departmentsInput")
    .value.split(",")
    .map(v => v.trim());

  await setDoc(doc(db, "settings", "departments"), { list });
  alert("Departments updated");
};

/* INIT */
loadCarsForAdmin();
