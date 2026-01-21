import { db } from "./firebase.js";
import { collection, addDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.saveCar = async () => {
  await addDoc(collection(db, "cars"), {
    name: name.value,
    price: price.value,
    description: desc.value,
    image: image.value,
    isNew: isNew.checked
  });
  alert("Car saved successfully");
};
