// ===============================
// RAYP DASHBOARD SYSTEM
// ===============================

// Load data
let income = JSON.parse(localStorage.getItem("income")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Sum helper
function sum(arr) {
    return arr.reduce((total, item) => total + Number(item.amount || 0), 0);
}

// Calculate values
const totalIncome = sum(income);
const totalExpenses = sum(expenses);
const profit = totalIncome - totalExpenses;

// Update UI
function updateDashboard() {

    document.getElementById("totalIncome").textContent =
        "UGX " + totalIncome.toLocaleString();

    document.getElementById("totalExpenses").textContent =
        "UGX " + totalExpenses.toLocaleString();

    const profitEl = document.getElementById("totalProfit");

    profitEl.textContent =
        "UGX " + profit.toLocaleString();

    profitEl.style.color = profit >= 0 ? "green" : "red";
}

// Run
updateDashboard();

// Logout (optional)
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}
