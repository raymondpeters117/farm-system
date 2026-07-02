// ===============================
// RAYP FARM MANAGEMENT SYSTEM
// workers.js
// ===============================

// Load workers from localStorage
let workers = JSON.parse(localStorage.getItem("workers")) || [];

// Elements
const nameInput = document.getElementById("workerName");
const roleInput = document.getElementById("workerRole");
const salaryInput = document.getElementById("workerSalary");
const contactInput = document.getElementById("workerContact");

const table = document.getElementById("workersTable");
const searchInput = document.getElementById("searchWorker");
const totalSalaryEl = document.getElementById("totalSalary");

// Save workers
function saveWorkers() {
    localStorage.setItem("workers", JSON.stringify(workers));
}

// Display workers
function displayWorkers(list = workers) {

    table.innerHTML = "";

    if (list.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    No workers found
                </td>
            </tr>
        `;
        updateTotal();
        return;
    }

    list.forEach((worker, index) => {

        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${worker.name}</td>
                <td>${worker.role}</td>
                <td>UGX ${Number(worker.salary).toLocaleString()}</td>
                <td>${worker.contact}</td>
                <td>
                    <button onclick="editWorker(${index})">✏ Edit</button>
                    <button onclick="deleteWorker(${index})">🗑 Delete</button>
                </td>
            </tr>
        `;
    });

    updateTotal();
}

// Add worker
function saveWorker() {

    const name = nameInput.value.trim();
    const role = roleInput.value.trim();
    const salary = Number(salaryInput.value);
    const contact = contactInput.value.trim();

    if (!name || !role || !salary || !contact) {
        alert("Please fill all fields");
        return;
    }

    workers.push({
        name,
        role,
        salary,
        contact
    });

    saveWorkers();
    displayWorkers();

    nameInput.value = "";
    roleInput.value = "";
    salaryInput.value = "";
    contactInput.value = "";
}

// Delete worker
function deleteWorker(index) {

    if (confirm("Delete this worker?")) {

        workers.splice(index, 1);

        saveWorkers();
        displayWorkers();

    }
}

// Edit worker
function editWorker(index) {

    const w = workers[index];

    nameInput.value = w.name;
    roleInput.value = w.role;
    salaryInput.value = w.salary;
    contactInput.value = w.contact;

    workers.splice(index, 1);

    saveWorkers();
    displayWorkers();

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Search workers
searchInput.addEventListener("keyup", function () {

    const search = this.value.toLowerCase();

    const filtered = workers.filter(w =>
        w.name.toLowerCase().includes(search) ||
        w.role.toLowerCase().includes(search) ||
        w.contact.toLowerCase().includes(search) ||
        w.salary.toString().includes(search)
    );

    displayWorkers(filtered);
});

// TOTAL SALARY CALCULATION 💰
function updateTotal() {

    const total = workers.reduce((sum, worker) => {
        return sum + Number(worker.salary);
    }, 0);

    totalSalaryEl.textContent =
        "UGX " + total.toLocaleString();
}

// Initial load
displayWorkers();
