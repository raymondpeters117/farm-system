// ===============================
// RAYP FARM MANAGEMENT SYSTEM
// income.js
// ===============================

// Load income records from localStorage
let incomeRecords = JSON.parse(localStorage.getItem("income")) || [];

// Get HTML elements
const form = document.getElementById("incomeForm");
const table = document.getElementById("incomeTable");
const searchInput = document.getElementById("searchIncome");

// Create Total Income display if it doesn't exist
let totalDisplay = document.getElementById("totalIncome");

if (!totalDisplay) {
    totalDisplay = document.createElement("h2");
    totalDisplay.id = "totalIncome";
    totalDisplay.style.margin = "15px 0";
    totalDisplay.style.color = "green";

    const tableSection = document.querySelector(".table-section");
    tableSection.insertBefore(totalDisplay, tableSection.firstChild);
}

// Save to localStorage
function saveIncome() {
    localStorage.setItem("income", JSON.stringify(incomeRecords));
}

// Display all income
function displayIncome(records = incomeRecords) {

    table.innerHTML = "";

    if (records.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;">
                    No income records found.
                </td>
            </tr>
        `;
        updateTotal(records);
        return;
    }

    records.forEach((income, index) => {

        table.innerHTML += `
            <tr>
                <td>${income.source}</td>
                <td>UGX ${Number(income.amount).toLocaleString()}</td>
                <td>${income.date}</td>
                <td>
                    <button onclick="editIncome(${index})">✏ Edit</button>
                    <button onclick="deleteIncome(${index})">🗑 Delete</button>
                </td>
            </tr>
        `;

    });

    updateTotal(records);
}

// Update total income
function updateTotal(records = incomeRecords) {

    const total = records.reduce((sum, income) => {
        return sum + Number(income.amount);
    }, 0);

    totalDisplay.innerHTML =
        `Total Income: <span style="color:blue;">UGX ${total.toLocaleString()}</span>`;
}

// Add new income
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const source = document.getElementById("source").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    if (!source || amount <= 0 || !date) {
        alert("Please complete all fields.");
        return;
    }

    incomeRecords.push({
        source,
        amount,
        date
    });

    saveIncome();
    displayIncome();

    form.reset();
});

// Delete income
function deleteIncome(index) {

    if (confirm("Delete this income record?")) {

        incomeRecords.splice(index, 1);

        saveIncome();
        displayIncome();
    }
}

// Edit income
function editIncome(index) {

    const income = incomeRecords[index];

    document.getElementById("source").value = income.source;
    document.getElementById("amount").value = income.amount;
    document.getElementById("date").value = income.date;

    incomeRecords.splice(index, 1);

    saveIncome();
    displayIncome();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Search income
searchInput.addEventListener("keyup", function () {

    const search = this.value.toLowerCase();

    const filtered = incomeRecords.filter(income =>

        income.source.toLowerCase().includes(search) ||
        income.date.toLowerCase().includes(search) ||
        income.amount.toString().includes(search)

    );

    displayIncome(filtered);

});

// Logout
function logout() {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("loggedInUser");

        alert("Logged out successfully.");

        window.location.href = "index.html";
    }

}

// Initial display
displayIncome();
