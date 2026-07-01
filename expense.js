// ===============================
// LOAD DATA
// ===============================
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Chart variable
let expenseChart;

// Run on load
window.onload = function () {
    displayExpenses();
    renderChart();
};

// ===============================
// ADD EXPENSE
// ===============================
document.getElementById("expenseForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const item = document.getElementById("item").value.trim();
    const category = document.getElementById("category").value;
    const amount = Number(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    if (!item || !category || !amount || !date) {
        alert("Please fill all fields!");
        return;
    }

    expenses.push({ item, category, amount, date });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("expenseForm").reset();

    displayExpenses();
    renderChart();

    alert("Expense saved!");
});

// ===============================
// DISPLAY TABLE
// ===============================
function displayExpenses() {

    const table = document.getElementById("expenseTableBody");

    table.innerHTML = "";

    let total = 0;

    expenses.forEach((exp, index) => {

        total += exp.amount;

        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${exp.item}</td>
                <td>${exp.category}</td>
                <td>UGX ${exp.amount.toLocaleString()}</td>
                <td>${exp.date}</td>
                <td>
                    <button class="btn-danger" onclick="deleteExpense(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalExpense").textContent =
        "UGX " + total.toLocaleString();
}

// ===============================
// DELETE
// ===============================
function deleteExpense(index) {

    if (confirm("Delete this expense?")) {

        expenses.splice(index, 1);

        localStorage.setItem("expenses", JSON.stringify(expenses));

        displayExpenses();
        renderChart();
    }
}

// ===============================
// MONTHLY CHART
// ===============================
function renderChart() {

    const ctx = document.getElementById("expenseChart").getContext("2d");

    // Group by month
    let monthlyTotals = {};

    expenses.forEach(exp => {

        let month = exp.date.substring(0, 7); // YYYY-MM

        if (!monthlyTotals[month]) {
            monthlyTotals[month] = 0;
        }

        monthlyTotals[month] += exp.amount;
    });

    let labels = Object.keys(monthlyTotals).sort();
    let data = labels.map(m => monthlyTotals[m]);

    // Destroy old chart before creating new one
    if (expenseChart) {
        expenseChart.destroy();
    }

    expenseChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Monthly Expenses (UGX)",
                data: data,
                backgroundColor: "#1976d2"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}
