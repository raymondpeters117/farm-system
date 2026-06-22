// Load workers when page opens
document.addEventListener("DOMContentLoaded", loadWorkers);

function saveWorker() {
    let name = document.getElementById("workerName").value;
    let role = document.getElementById("workerRole").value;
    let salary = document.getElementById("workerSalary").value;

    if (name === "" || role === "" || salary === "") {
        alert("Please fill all fields");
        return;
    }

    let workers = JSON.parse(localStorage.getItem("workers")) || [];

    workers.push({
        id: Date.now(),
        name: name,
        role: role,
        salary: salary
    });

    localStorage.setItem("workers", JSON.stringify(workers));

    document.getElementById("workerName").value = "";
    document.getElementById("workerRole").value = "";
    document.getElementById("workerSalary").value = "";
    document.getElementById("workerContact").value="";
    loadWorkers();
}

function loadWorkers() {
    let workers = JSON.parse(localStorage.getItem("workers")) || [];
    let tableBody = document.getElementById("workersTable");

    tableBody.innerHTML = "";

    workers.forEach(worker => {
        tableBody.innerHTML += `
            <tr>
                <td>${worker.name}</td>
                <td>${worker.role}</td>
                <td>${worker.salary}</td>
                <td>${worker.contact}</td>
<td>
                    <button onclick="deleteWorker(${worker.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function deleteWorker(id) {
    let workers = JSON.parse(localStorage.getItem("workers")) || [];

    workers = workers.filter(worker => worker.id !== id);

    localStorage.setItem("workers", JSON.stringify(workers));

    loadWorkers();
}
function logout() {
    localStorage.removeItem("loggedInUser");

    alert("Logged out successfully!");

    window.location.href = "index.html"; // Login page
}