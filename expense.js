// ===============================
// LOAD EXPENSES FROM LOCALSTORAGE
// ===============================
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Run when page loads
window.onload = function () {
    displayExpenses();
};

// ===============================
// ADD EXPENSE
// ===============================
document.getElementById("expenseForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const item = document.getElementById("item").value.trim();
    const category = document.getElementById("category").value;
    const amount = Number(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    if (!item || !category || !amount || !date) {
        alert("Please fill all fields");
        return;
    }

    const expense = {
        item,
        category,
        amount,
        date
    };

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("expenseForm").reset();

    displayExpenses();

    alert("Expense saved successfully!");
});

// ===============================
// DISPLAY EXPENSES
// ===============================
function displayExpenses() {

    const table = document.getElementById("expenseTableBody");

    table.innerHTML = "";

    let total = 0;

    expenses.forEach((exp, index) => {

        total += exp.amount;

        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${exp.item}</td>
                <td>${exp.category}</td>
                <td>UGX ${exp.amount.toLocaleString()}</td>
                <td>${exp.date}</td>
                <td>
                    <button class="btn-danger" onclick="deleteExpense(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

    // Show total expense
    document.getElementById("totalExpense").textContent =
        "UGX " + total.toLocaleString();
}

// ===============================
// DELETE EXPENSE
// ===============================
function deleteExpense(index) {

    if (confirm("Are you sure you want to delete this expense?")) {

        expenses.splice(index, 1);

        localStorage.setItem("expenses", JSON.stringify(expenses));

        displayExpenses();
    }
}
