let workers = JSON.parse(localStorage.getItem("workers")) || [];

displayWorkers();

function saveWorker() {

    const name = document.getElementById("workerName").value.trim();
    const role = document.getElementById("workerRole").value.trim();
    const salary = document.getElementById("workerSalary").value;
    const contact = document.getElementById("workerContact").value.trim();

    if (!name || !role || !salary || !contact) {
        alert("Please fill in all fields.");
        return;
    }

    workers.push({
        name,
        role,
        salary,
        contact
    });

    localStorage.setItem("workers", JSON.stringify(workers));

    displayWorkers();

    document.getElementById("workerName").value = "";
    document.getElementById("workerRole").value = "";
    document.getElementById("workerSalary").value = "";
    document.getElementById("workerContact").value = "";
}

function displayWorkers() {

    const table = document.getElementById("workersTable");

    table.innerHTML = "";

    workers.forEach((worker, index) => {

        table.innerHTML += `
            <tr>
                <td>${worker.name}</td>
                <td>${worker.role}</td>
                <td>${Number(worker.salary).toLocaleString()}</td>
                <td>${worker.contact}</td>
                <td>
                    <button onclick="deleteWorker(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });

}

function deleteWorker(index) {

    workers.splice(index, 1);

    localStorage.setItem("workers", JSON.stringify(workers));

    displayWorkers();
}
