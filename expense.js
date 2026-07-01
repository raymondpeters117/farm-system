// ===============================
// RAYP FARM MANAGEMENT SYSTEM
// Expense Management
// ===============================

// Load expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Display expenses when page loads
window.onload = function () {
    displayExpenses();
};

// ===============================
// Save Expense
// ===============================

document.getElementById("expenseForm").addEventListener("submit", function (e) {

    e.preventDefault();

    const item = document.getElementById("item").value.trim();
    const category = document.getElementById("category").value;
    const amount = Number(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    if (item === "" || category === "" || amount <= 0 || date === "") {
        alert("Please fill in all fields correctly.");
        return;
    }

    const expense = {
        item,
        category,
        amount,
        date
    };

    expenses.push(expense);

    // Save to localStorage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Refresh table
    displayExpenses();

    // Clear form
    document.getElementById("expenseForm").reset();

    alert("Expense saved successfully!");

});

// ===============================
// Display Expenses
// ===============================

function displayExpenses() {

    const table = document.getElementById("expenseTableBody");

    table.innerHTML = "";

    let totalExpense = 0;

    expenses.forEach((expense, index) => {

        totalExpense += expense.amount;

        table.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${expense.item}</td>
            <td>${expense.category}</td>
            <td>UGX ${expense.amount.toLocaleString()}</td>
            <td>${expense.date}</td>
            <td>
                <button class="btn-danger"
                onclick="deleteExpense(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;

    });

    // Show total expenditure
    let totalElement = document.getElementById("totalExpense");

    if (!totalElement) {

        totalElement = document.createElement("h2");
        totalElement.id = "totalExpense";
        totalElement.style.marginTop = "20px";

        document.querySelector(".table-container").appendChild(totalElement);
    }

    totalElement.innerHTML =
        "Total Expenditure: <span style='color:red;'>UGX "
        + totalExpense.toLocaleString()
        + "</span>";

}

// ===============================
// Delete Expense
// ===============================

function deleteExpense(index) {

    if (confirm("Delete this expense?")) {

        expenses.splice(index, 1);

        localStorage.setItem("expenses", JSON.stringify(expenses));

        displayExpenses();

    }

}
