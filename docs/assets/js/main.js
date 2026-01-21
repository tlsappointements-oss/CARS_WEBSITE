const cars = [
  { title:"C-Class", img:"assets/images/car1.jpg" },
  { title:"E-Class", img:"assets/images/car2.jpg" },
  { title:"S-Class", img:"assets/images/car3.jpg" }
];

let index = 0;

function toggleMenu() {
  const d = document.getElementById("dropdown");
  d.style.display = d.style.display === "block" ? "none" : "block";
}

function openCar(i) {
  index = i;
  updateModal();
  document.getElementById("carModal").style.display="flex";
}

function closeCar() {
  document.getElementById("carModal").style.display="none";
}

function nextCar() {
  index = (index + 1) % cars.length;
  updateModal();
}

function prevCar() {
  index = (index - 1 + cars.length) % cars.length;
  updateModal();
}

function updateModal() {
  document.getElementById("modalImg").src = cars[index].img;
  document.getElementById("modalTitle").textContent = cars[index].title;
}
