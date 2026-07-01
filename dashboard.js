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
