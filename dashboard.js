// ===============================
// RAYP DASHBOARD SYSTEM
// ===============================

// Load data from localStorage
let income = JSON.parse(localStorage.getItem("income")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let workers = JSON.parse(localStorage.getItem("workers")) || [];

// ===============================
// SUM FUNCTION
// ===============================
function sum(arr) {
    return arr.reduce((total, item) => {
        return total + Number(item.amount || 0);
    }, 0);
}

// ===============================
// CALCULATE TOTALS
// ===============================
function calculate() {

    const totalIncome = sum(income);
    const totalExpenses = sum(expenses);
    const profit = totalIncome - totalExpenses;

    return { totalIncome, totalExpenses, profit };
}

// ===============================
// UPDATE WORKERS
// ===============================
function updateWorkers() {
    const workersEl = document.getElementById("totalWorkers");

    if (workersEl) {
        workersEl.textContent = workers.length;
    }
}

// ===============================
// UPDATE DASHBOARD UI
// ===============================
function updateDashboard() {

    const data = calculate();

    const incomeEl = document.getElementById("totalIncome");
    const expenseEl = document.getElementById("totalExpenses");
    const profitEl = document.getElementById("totalProfit");

    if (incomeEl) {
        incomeEl.textContent = "UGX " + data.totalIncome.toLocaleString();
    }

    if (expenseEl) {
        expenseEl.textContent = "UGX " + data.totalExpenses.toLocaleString();
    }

    if (profitEl) {
        profitEl.textContent = "UGX " + data.profit.toLocaleString();

        profitEl.style.color =
            data.profit > 0 ? "green" :
            data.profit < 0 ? "red" :
            "black";
    }

    updateWorkers();
}

// ===============================
// AUTO REFRESH (LIVE UPDATE)
// ===============================
function refreshDashboard() {
    income = JSON.parse(localStorage.getItem("income")) || [];
    expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    workers = JSON.parse(localStorage.getItem("workers")) || [];

    updateDashboard();
}

// RUN ON LOAD
updateDashboard();

// KEEP SYNCED
setInterval(refreshDashboard, 2000);

// LOGOUT
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}
