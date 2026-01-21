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
