// =============================
// Expense Management System
// =============================

// Load expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Display expenses when page loads
displayExpenses();

// =============================
// Add Expense
// =============================
function addExpense() {

    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value.trim();
    const amount = document.getElementById("amount").value;

    if (date === "" || description === "" || amount === "") {
        alert("Please fill in all fields.");
        return;
    }

    const expense = {
        date: date,
        description: description,
        amount: Number(amount)
    };

    expenses.push(expense);

    // Save to localStorage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Clear form
    document.getElementById("date").value = "";
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

    displayExpenses();

    alert("Expense saved successfully.");
}

// =============================
// Display Expenses
// =============================
function displayExpenses() {

    const table = document.getElementById("expenseTable");

    table.innerHTML = "";

    let total = 0;

    expenses.forEach((expense, index) => {

        total += Number(expense.amount);

        table.innerHTML += `
            <tr>
                <td>${expense.date}</td>
                <td>${expense.description}</td>
                <td>UGX ${expense.amount.toLocaleString()}</td>
                <td>
                    <button onclick="deleteExpense(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalExpense").textContent =
        "UGX " + total.toLocaleString();
}

// =============================
// Delete Expense
// =============================
function deleteExpense(index) {

    if (confirm("Delete this expense?")) {

        expenses.splice(index, 1);

        localStorage.setItem("expenses", JSON.stringify(expenses));

        displayExpenses();

    }
}
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {

    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;

    if (!description || !category || !amount || !date) {
        alert("Please fill in all fields.");
        return;
    }

    expenses.push({
        description,
        category,
        amount: Number(amount),
        date
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    alert("Expense saved successfully!");

    console.log(expenses);

    document.getElementById("expenseForm").reset();
}
