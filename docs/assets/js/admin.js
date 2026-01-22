// --- CAR REPOSITORY DATA ---
let carsInventory = [
    { id: '1', name: 'Mercedes-Benz G63 BRABUS', price: '450,000', desc: 'Custom 800HP Engine', image: 'brabus-g.jpg', isNew: true },
    { id: '2', name: 'Mercedes AMG GT Black Series', price: '325,000', desc: 'Track-focused performance', image: 'amg-gt.jpg', isNew: false }
];

// Initialize View
window.onload = () => {
    updateDashboardStats();
    populateCarSelect();
};

function updateDashboardStats() {
    document.getElementById('carCount').innerText = carsInventory.length;
}

function populateCarSelect() {
    const select = document.getElementById('editCarSelect');
    select.innerHTML = '';
    carsInventory.forEach(car => {
        const option = document.createElement('option');
        option.value = car.id;
        option.textContent = car.name;
        select.appendChild(option);
    });
}

// Logic to load data into the form
function loadCarForEdit() {
    const selectedId = document.getElementById('editCarSelect').value;
    const car = carsInventory.find(c => c.id === selectedId);
    
    if (car) {
        document.getElementById('carId').value = car.id;
        document.getElementById('name').value = car.name;
        document.getElementById('price').value = car.price;
        document.getElementById('desc').value = car.desc;
        document.getElementById('image').value = car.image;
        document.getElementById('isNew').checked = car.isNew;
    }
}

// SAVE / UPDATE Logic
function saveCar() {
    const id = document.getElementById('carId').value;
    const name = document.getElementById('name').value;
    
    if(!name) return alert("Please enter a car name");

    const newCarData = {
        id: id || Date.now().toString(),
        name: name,
        price: document.getElementById('price').value,
        desc: document.getElementById('desc').value,
        image: document.getElementById('image').value,
        isNew: document.getElementById('isNew').checked
    };

    if (id) {
        // Find existing and update
        const index = carsInventory.findIndex(c => c.id === id);
        carsInventory[index] = newCarData;
        alert("Vehicle updated successfully.");
    } else {
        // Add new
        carsInventory.push(newCarData);
        alert("New vehicle added to gallery.");
    }

    populateCarSelect();
    updateDashboardStats();
}

// DELETE Logic
function deleteCar() {
    const id = document.getElementById('carId').value;
    if (!id) return alert("Select a car to delete");

    if (confirm("Permanently remove this vehicle from the database?")) {
        carsInventory = carsInventory.filter(c => c.id !== id);
        populateCarSelect();
        updateDashboardStats();
        resetForm();
    }
}

function resetForm() {
    document.getElementById('carId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('isNew').checked = false;
}