function loadDashboard() {

    const incomes =
        JSON.parse(localStorage.getItem("incomes")) || [];

    const expenses =
        JSON.parse(localStorage.getItem("expenses")) || [];

    let totalIncome = 0;
    let totalExpense = 0;

    incomes.forEach(income => {
        totalIncome += Number(income.amount);
    });

    expenses.forEach(expense => {
        totalExpense += Number(expense.amount);
    });

    const profit = totalIncome - totalExpense;

    document.getElementById("totalIncome").textContent =
        "UGX " + totalIncome.toLocaleString();

    document.getElementById("totalExpenses").textContent =
        "UGX " + totalExpense.toLocaleString();

    document.getElementById("totalProfit").textContent =
        "UGX " + profit.toLocaleString();
}

loadDashboard();