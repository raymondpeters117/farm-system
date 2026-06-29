// expense.js

// Load expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Display expenses when the page loads
document.addEventListener("DOMContentLoaded", displayExpenses);

// Save expense
document.getElementById("expenseForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const item = document.getElementById("item").value.trim();
    const category = document.getElementById("category").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;

    if (item === "" || category === "" || amount === "" || date === "") {
        alert("Please fill in all fields.");
        return;
    }

    const expense = {
        item: item,
        category: category,
        amount: amount,
        date: date
    };

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();

    document.getElementById("expenseForm").reset();
});

// Display all expenses
function displayExpenses() {

    const tableBody = document.getElementById("expenseTableBody");
    tableBody.innerHTML = "";

    expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    expenses.forEach((expense, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${expense.item}</td>
            <td>${expense.category}</td>
            <td>${Number(expense.amount).toLocaleString()}</td>
            <td>${expense.date}</td>
            <td>
                <button onclick="deleteExpense(${index})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Delete expense
function deleteExpense(index) {

    expenses.splice(index, 1);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
}
