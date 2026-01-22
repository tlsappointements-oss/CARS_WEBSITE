// --- Section Switching ---
function switchAdminSection(sectionId) {
    // Hide all
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
    });
    // Show target
    document.getElementById(sectionId + 'Section').style.display = 'block';
    
    // Update Title
    document.getElementById('sectionTitle').innerText = sectionId.toUpperCase();
    
    // Update Active Nav
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

// --- Car Management Logic ---
let cars = [
    { id: '1', name: 'Mercedes-Benz G63 BRABUS', price: '450000', desc: '800 HP Monster', image: 'brabus-g.jpg', isNew: true },
    { id: '2', name: 'Mercedes AMG GT63', price: '180000', desc: 'Twin Turbo V8', image: 'amg-gt.jpg', isNew: false }
];

function init() {
    refreshCarList();
    document.getElementById('carCount').innerText = `${cars.length} Active Listings`;
}

function refreshCarList() {
    const select = document.getElementById('editCarSelect');
    select.innerHTML = '';
    cars.forEach(car => {
        const opt = document.createElement('option');
        opt.value = car.id;
        opt.innerText = car.name;
        select.appendChild(opt);
    });
}

function loadCarForEdit() {
    const id = document.getElementById('editCarSelect').value;
    const car = cars.find(c => c.id === id);
    if (car) {
        document.getElementById('carId').value = car.id;
        document.getElementById('name').value = car.name;
        document.getElementById('price').value = car.price;
        document.getElementById('desc').value = car.desc;
        document.getElementById('image').value = car.image;
        document.getElementById('isNew').checked = car.isNew;
    }
}

function saveCar() {
    const id = document.getElementById('carId').value;
    const carData = {
        id: id || Date.now().toString(),
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        desc: document.getElementById('desc').value,
        image: document.getElementById('image').value,
        isNew: document.getElementById('isNew').checked
    };

    if (id) {
        // Update
        const index = cars.findIndex(c => c.id === id);
        cars[index] = carData;
        alert("Car Updated Successfully!");
    } else {
        // Create
        cars.push(carData);
        alert("New Car Added to Inventory!");
    }
    refreshCarList();
}

function deleteCar() {
    const id = document.getElementById('carId').value;
    if(confirm("Are you sure you want to delete this vehicle?")) {
        cars = cars.filter(c => c.id !== id);
        refreshCarList();
        resetCarForm();
    }
}

function resetCarForm() {
    document.getElementById('carId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('isNew').checked = false;
}

// Run init on load
init();