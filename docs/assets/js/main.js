const cars = [
  { title: "C-Class", img: "./assets/images/car1.jpg" },
  { title: "E-Class", img: "./assets/images/car2.jpg" },
  { title: "S-Class", img: "./assets/images/car3.jpg" }
];

let current = 0;

function toggleMenu() {
  const d = document.getElementById("menuDropdown");
  d.style.display = d.style.display === "block" ? "none" : "block";
}

function openCar(i) {
  current = i;
  document.getElementById("carModal").style.display = "flex";
  updateModal();
}

function closeCar() {
  document.getElementById("carModal").style.display = "none";
}

function updateModal() {
  document.getElementById("modalImg").src = cars[current].img;
  document.getElementById("modalTitle").textContent = cars[current].title;
}

function nextCar() {
  current = (current + 1) % cars.length;
  updateModal();
}

function prevCar() {
  current = (current - 1 + cars.length) % cars.length;
  updateModal();
}
