// ===============================
// RAYP FARM MANAGEMENT SYSTEM
// DASHBOARD JS (FULL VERSION)
// ===============================

// Load data from localStorage safely
let income = JSON.parse(localStorage.getItem("income")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// ===============================
// SUM FUNCTION (SAFE)
// ===============================
function sumAmount(arr) {
    return arr.reduce((total, item) => {
        return total + Number(item.amount || 0);
    }, 0);
}

// ===============================
// CALCULATIONS
// ===============================
let totalIncome = sumAmount(income);
let totalExpenses = sumAmount(expenses);
let profit = totalIncome - totalExpenses;

// ===============================
// FORMAT CURRENCY
// ===============================
function formatUGX(value) {
    return "UGX " + Number(value).toLocaleString();
}

// ===============================
// UPDATE DASHBOARD UI
// ===============================
function updateDashboard() {

    const incomeEl = document.getElementById("totalIncome");
    const expenseEl = document.getElementById("totalExpenses");
    const profitEl = document.getElementById("totalProfit");

    if (incomeEl) {
        incomeEl.textContent = formatUGX(totalIncome);
    }

    if (expenseEl) {
        expenseEl.textContent = formatUGX(totalExpenses);
    }

    if (profitEl) {
        profitEl.textContent = formatUGX(profit);

        // Profit color indicator
        if (profit > 0) {
            profitEl.style.color = "green";
        } 
        else if (profit < 0) {
            profitEl.style.color = "red";
        } 
        else {
            profitEl.style.color = "black";
        }
    }
}

// ===============================
// AUTO REFRESH FUNCTION
// (so dashboard updates after changes)
// ===============================
function refreshDashboardData() {

    income = JSON.parse(localStorage.getItem("income")) || [];
    expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    totalIncome = sumAmount(income);
    totalExpenses = sumAmount(expenses);
    profit = totalIncome - totalExpenses;

    updateDashboard();
}

// ===============================
// AUTO RUN ON PAGE LOAD
// ===============================
updateDashboard();

// Optional: auto refresh every 2 seconds
setInterval(refreshDashboardData, 2000);

// ===============================
// LOGOUT FUNCTION
// ===============================
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}
