// ===============================
// RAYP DASHBOARD FIX
// ===============================

// Load data
let income = JSON.parse(localStorage.getItem("income")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// SUM FUNCTION
function sum(data) {
    return data.reduce((total, item) => {
        return total + Number(item.amount);
    }, 0);
}

// CALCULATIONS
function calculateTotals() {

    const totalIncome = sum(income);
    const totalExpenses = sum(expenses);
    const profit = totalIncome - totalExpenses;

    return { totalIncome, totalExpenses, profit };
}

// UPDATE UI
function updateDashboard() {

    const { totalIncome, totalExpenses, profit } = calculateTotals();

    document.getElementById("totalIncome").textContent =
        "UGX " + totalIncome.toLocaleString();

    document.getElementById("totalExpenses").textContent =
        "UGX " + totalExpenses.toLocaleString();

    const profitEl = document.getElementById("totalProfit");

    profitEl.textContent =
        "UGX " + profit.toLocaleString();

    profitEl.style.color = profit >= 0 ? "green" : "red";
}

// RUN
updateDashboard();
