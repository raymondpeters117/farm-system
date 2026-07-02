// ===============================
// RAYP FARM MANAGEMENT SYSTEM
// expense.js
// ===============================

// Load expense records from localStorage
let expenseRecords = JSON.parse(localStorage.getItem("expenses")) || [];

// Get HTML elements
const form = document.getElementById("expenseForm");
const table = document.getElementById("expenseTableBody");
const searchInput = document.getElementById("searchExpense");

// Create Total Expense display if it doesn't exist
let totalDisplay = document.getElementById("totalExpense");

if (!totalDisplay) {
    totalDisplay = document.createElement("h2");
    totalDisplay.id = "totalExpense";
    totalDisplay.style.margin = "15px 0";
    totalDisplay.style.color = "red";

    const tableSection = document.querySelector(".table-container");
    tableSection.insertBefore(totalDisplay, tableSection.firstChild);
}

// Save to localStorage
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenseRecords));
}

// Display all expenses
function displayExpenses(records = expenseRecords) {

    table.innerHTML = "";

    if (records.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No expense records found.
                </td>
            </tr>
        `;
        updateTotal(records);
        return;
    }

    records.forEach((expense, index) => {

        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${expense.item}</td>
                <td>${expense.category}</td>
                <td>UGX ${Number(expense.amount).toLocaleString()}</td>
                <td>${expense.date}</td>
                <td>
                    <button onclick="editExpense(${index})">✏ Edit</button>
                    <button onclick="deleteExpense(${index})">🗑 Delete</button>
                </td>
            </tr>
        `;
    });

    updateTotal(records);
}

// Update total expenses
function updateTotal(records = expenseRecords) {

    const total = records.reduce((sum, expense) => {
        return sum + Number(expense.amount);
    }, 0);

    totalDisplay.innerHTML =
        `Total Expenses: <span style="color:blue;">UGX ${total.toLocaleString()}</span>`;
}

// Add new expense
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const item = document.getElementById("item").value.trim();
    const category = document.getElementById("category").value;
    const amount = Number(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    if (!item || !category || amount <= 0 || !date) {
        alert("Please complete all fields.");
        return;
    }

    expenseRecords.push({
        item,
        category,
        amount,
        date
    });

    saveExpenses();
    displayExpenses();

    form.reset();
});

// Delete expense
function deleteExpense(index) {

    if (confirm("Delete this expense record?")) {

        expenseRecords.splice(index, 1);

        saveExpenses();
        displayExpenses();
    }
}

// Edit expense
function editExpense(index) {

    const expense = expenseRecords[index];

    document.getElementById("item").value = expense.item;
    document.getElementById("category").value = expense.category;
    document.getElementById("amount").value = expense.amount;
    document.getElementById("date").value = expense.date;

    expenseRecords.splice(index, 1);

    saveExpenses();
    displayExpenses();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Search expenses
searchInput.addEventListener("keyup", function () {

    const search = this.value.toLowerCase();

    const filtered = expenseRecords.filter(expense =>
        expense.item.toLowerCase().includes(search) ||
        expense.category.toLowerCase().includes(search) ||
        expense.date.toLowerCase().includes(search) ||
        expense.amount.toString().includes(search)
    );

    displayExpenses(filtered);
});

// Initial display
displayExpenses();
