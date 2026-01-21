import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.saveCar = async function () {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const desc = document.getElementById("desc").value;
  const image = document.getElementById("image").value;
  const isNew = document.getElementById("isNew").checked;

  if (!name || !price) {
    alert("Name and price required");
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
};
import {
  deleteDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* Load cars into delete dropdown */
async function loadCarsForDelete() {
  const snap = await getDocs(collection(db, "cars"));
  const select = document.getElementById("deleteCarSelect");

  select.innerHTML = "";

  snap.forEach(docu => {
    const opt = document.createElement("option");
    opt.value = docu.id;
    opt.textContent = docu.data().name;
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

/* Load on admin open */
loadCarsForDelete();
window.saveAbout = async function () {
  const text = document.getElementById("aboutInput").value;

  await setDoc(doc(db, "settings", "about"), {
    text
  });

  alert("About section updated");
};
window.saveDepartments = async function () {
  const list = document.getElementById("departmentsInput")
    .value.split(",")
    .map(d => d.trim());

  await setDoc(doc(db, "settings", "departments"), {
    list
  });

  alert("Departments updated");
};
