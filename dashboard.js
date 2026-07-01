// Get saved data
const income = JSON.parse(localStorage.getItem("income")) || [];
const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
const workers = JSON.parse(localStorage.getItem("workers")) || [];

// Calculate totals
const totalIncome = income.reduce((sum, item) => {
    return sum + Number(item.amount || 0);
}, 0);

const totalExpense = expenses.reduce((sum, item) => {
    return sum + Number(item.amount || 0);
}, 0);

// Display on dashboard
document.getElementById("totalIncome").textContent =
    "UGX " + totalIncome.toLocaleString();

document.getElementById("totalExpense").textContent =
    "UGX " + totalExpense.toLocaleString();

document.getElementById("workerCount").textContent =
    workers.length;
// ===============================
// DASHBOARD DATA LOAD
// ===============================

function loadDashboard() {

    let income = JSON.parse(localStorage.getItem("income")) || [];
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let workers = JSON.parse(localStorage.getItem("workers")) || [];

    // TOTAL INCOME
    let totalIncome = income.reduce((sum, i) => sum + Number(i.amount), 0);

    // TOTAL EXPENSE
    let totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

    // WORKERS COUNT
    let totalWorkers = workers.length;

    // DISPLAY
    document.getElementById("totalIncome").textContent =
        "UGX " + totalIncome.toLocaleString();

    document.getElementById("totalExpense").textContent =
        "UGX " + totalExpense.toLocaleString();

    document.getElementById("workerCount").textContent =
        totalWorkers;
}

// Load on page open
window.onload = loadDashboard;

// 🔥 REAL-TIME SYNC (same tab)
window.addEventListener("dataUpdated", loadDashboard);

// 🔥 SYNC (other tabs)
window.addEventListener("storage", loadDashboard);
