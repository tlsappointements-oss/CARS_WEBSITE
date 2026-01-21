import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp({
  apiKey: "AIzaSyDnp4fC2_cEw04ydtWOwYgVzRUsqScufFs",
  authDomain: "cars-website-558c0.firebaseapp.com",
  projectId: "cars-website-558c0"
});

const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth,user=>{
  if(!user) location.href="login.html";
  else document.body.style.display="block";
});

logout.onclick = ()=>signOut(auth);

const snap = await getDocs(collection(db,"cars"));
snap.forEach(d=>{
  const c=d.data();
  cars.innerHTML+=`
  <div class="car">
    <input id="n${d.id}" value="${c.name}">
    <input id="p${d.id}" value="${c.price}">
    <textarea id="d${d.id}">${c.description}</textarea>
    <button onclick="save('${d.id}')">Save</button>
  </div>`;
});

window.save=async id=>{
  await updateDoc(doc(db,"cars",id),{
    name:n${id}.value,
    price:p${id}.value,
    description:d${id}.value
  });
  alert("Saved");
};
