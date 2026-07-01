function updateDashboard() {

    let income = Number(document.getElementById("incomeInput").value);
    let expense = Number(document.getElementById("expenseInput").value);
    let workers = Number(document.getElementById("workersInput").value);

    // Default values if empty
    income = income || 0;
    expense = expense || 0;
    workers = workers || 0;

    // Profit calculation
    let profit = income - expense;

    // Display values
    document.getElementById("income").innerText = income;
    document.getElementById("expense").innerText = expense;
    document.getElementById("workers").innerText = workers;
    document.getElementById("profit").innerText = profit;
}
// Income
let income = JSON.parse(localStorage.getItem("income")) || [];

// Expenses
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Workers
let workers = JSON.parse(localStorage.getItem("workers")) || [];

// Calculate totals
let totalIncome = income.reduce((sum, item) => sum + Number(item.amount), 0);

let totalExpense = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

let profit = totalIncome - totalExpense;

// Display

document.getElementById("totalIncome").textContent =
"UGX " + totalIncome.toLocaleString();

document.getElementById("totalExpense").textContent =
"UGX " + totalExpense.toLocaleString();

document.getElementById("workerCount").textContent =
workers.length;

document.getElementById("profit").textContent =
"UGX " + profit.toLocaleString();
