import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection, addDoc, getDocs, deleteDoc, doc, setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth,user=>{
  if(!user) location.href="login.html";
});

window.saveCar = async ()=>{
  await addDoc(collection(db,"cars"),{
    name:name.value,
    price:price.value,
    description:desc.value,
    image:image.value,
    isNew:isNew.checked
  });
  alert("Saved");
};

window.deleteCar = async ()=>{
  await deleteDoc(doc(db,"cars",deleteCarSelect.value));
  alert("Deleted");
};

window.saveAbout = async ()=>{
  await setDoc(doc(db,"settings","about"),{text:aboutInput.value});
  alert("Updated");
};

window.saveDepartments = async ()=>{
  await setDoc(doc(db,"settings","departments"),{
    list:departmentsInput.value.split(",")
  });
  alert("Updated");
};

(async ()=>{
  const snap=await getDocs(collection(db,"cars"));
  snap.forEach(d=>{
    deleteCarSelect.innerHTML+=`<option value="${d.id}">${d.data().name}</option>`;
  });
})();
