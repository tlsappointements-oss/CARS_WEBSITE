const cars = {
  1: {
    name: "Mercedes C-Class",
    price: "45,000 €",
    desc: "Luxury compact sedan with premium comfort.",
    image: "assets/images/car1.png"
  },
  2: {
    name: "Mercedes E-Class",
    price: "62,000 €",
    desc: "Executive sedan with cutting-edge technology.",
    image: "assets/images/car2.png"
  },
  3: {
    name: "Mercedes GLE",
    price: "78,000 €",
    desc: "Luxury SUV with powerful performance.",
    image: "assets/images/car3.png"
  }
};

const id = new URLSearchParams(location.search).get("id");
const car = cars[id];

document.getElementById("carImg").src = car.image;
document.getElementById("carName").textContent = car.name;
document.getElementById("carPrice").textContent = car.price;
document.getElementById("carDesc").textContent = car.desc;
