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
