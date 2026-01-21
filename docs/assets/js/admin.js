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

/* ADD CAR */
window.saveCar = async () => {
  const data = {
    name: name.value,
    price: price.value,
    description: desc.value,
    image: image.value,
    isNew: isNew.checked,
    updatedAt: serverTimestamp()
  };

  await addDoc(collection(db, "cars"), data);
  alert("Car added");
  document.querySelector(".form").reset();
  loadCars();
};

/* DELETE */
async function loadCars() {
  const snap = await getDocs(collection(db, "cars"));
  deleteCarSelect.innerHTML = "";

  snap.forEach(d => {
    deleteCarSelect.innerHTML += `<option value="${d.id}">${d.data().name}</option>`;
  });
}

window.deleteCar = async () => {
  await deleteDoc(doc(db, "cars", deleteCarSelect.value));
  alert("Car deleted");
  loadCars();
};

/* ABOUT */
window.saveAbout = async () => {
  await setDoc(doc(db, "settings", "about"), {
    text: aboutInput.value
  });
  alert("About updated");
};

/* DEPARTMENTS */
window.saveDepartments = async () => {
  const list = departmentsInput.value.split(",").map(d => d.trim());
  await setDoc(doc(db, "settings", "departments"), { list });
  alert("Departments updated");
};

loadCars();
