// ===============================
// RAYP DASHBOARD (FIXED + ROBUST)
// ===============================

// Load safely
let income = JSON.parse(localStorage.getItem("income")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// -------------------------------
// SAFE AMOUNT READER
// (handles different key names)
// -------------------------------
function getAmount(item) {
    return Number(
        item.amount ??
        item.expense ??
        item.cost ??
        item.value ??
        0
    );
}

// -------------------------------
// SUM FUNCTION
// -------------------------------
function sum(data) {
    return data.reduce((total, item) => {
        return total + getAmount(item);
    }, 0);
}

// -------------------------------
// CALCULATIONS
// -------------------------------
function calculate() {

    const totalIncome = sum(income);
    const totalExpenses = sum(expenses);
    const profit = totalIncome - totalExpenses;

    return { totalIncome, totalExpenses, profit };
}

// -------------------------------
// UPDATE UI
// -------------------------------
function updateDashboard() {

    const { totalIncome, totalExpenses, profit } = calculate();

    const incomeEl = document.getElementById("totalIncome");
    const expenseEl = document.getElementById("totalExpenses");
    const profitEl = document.getElementById("totalProfit");

    if (incomeEl) {
        incomeEl.textContent = "UGX " + totalIncome.toLocaleString();
    }

    if (expenseEl) {
        expenseEl.textContent = "UGX " + totalExpenses.toLocaleString();
    }

    if (profitEl) {
        profitEl.textContent = "UGX " + profit.toLocaleString();

        if (profit > 0) profitEl.style.color = "green";
        else if (profit < 0) profitEl.style.color = "red";
        else profitEl.style.color = "black";
    }
}

// -------------------------------
// AUTO REFRESH (IMPORTANT FIX)
// -------------------------------
function refreshData() {
    income = JSON.parse(localStorage.getItem("income")) || [];
    expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    updateDashboard();
}

// Run immediately
updateDashboard();

// Keep synced
setInterval(refreshData, 1000);

// Logout
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}
