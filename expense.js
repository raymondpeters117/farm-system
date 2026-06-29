let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
    const item = document.getElementById("expenseItem").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);

    if (!item || !amount) {
        alert("Fill all fields");
        return;
    }

    expenses.push({
        item,
        amount,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    alert("Expense Saved");
}
function displayExpenses() {
    const tableBody = document.getElementById("expenseTableBody");

    if (!tableBody) {
        console.log("expenseTableBody not found");
        return;
    }

    tableBody.innerHTML = "";

    expenses.forEach((expense, index) => {

        let row = `
        <tr>
            <td>${index + 1}</td>
            <td>${expense.item}</td>
            <td>${expense.category}</td>
            <td>${expense.amount}</td>
            <td>${expense.date}</td>
            <td>
                <button onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </td>
        </tr>
        `;

        tableBody.innerHTML += row;
    });
}
function deleteExpense(id) {

    expenses = expenses.filter(expense => expense.id != id);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    displayExpenses();
}
window.onload = function () {
    displayExpenses();
};
const category = document.getElementById("category").value;
