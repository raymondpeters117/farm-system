const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    window.location.href = "index.html";
}
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
function logout() {
    localStorage.removeItem("loggedInUser");

    alert("Logged out successfully!");

    window.location.href = "index.html"; // Login page
}
document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    console.log(user); // Check if user loads

    if (!user) return;

    document.getElementById("userName").textContent = user.fullName;
    document.getElementById("userRole").textContent = user.role;
    document.getElementById("userPhoto").src = user.photo;
});
document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    console.log(user); // Check if user loads

    if (!user) return;

    document.getElementById("userName").textContent = user.fullName;
    document.getElementById("userRole").textContent = user.role;
    document.getElementById("userPhoto").src = user.photo;
});document.addEventListener("DOMContentLoaded", function () {

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
        console.log("No logged-in user found");
        return;
    }

    console.log(user);

    const nameEl = document.getElementById("userName");
    const roleEl = document.getElementById("userRole");
    const photoEl = document.getElementById("userPhoto");

    if (nameEl) nameEl.textContent = user.fullName;
    if (roleEl) roleEl.textContent = user.role;
    if (photoEl) photoEl.src = user.photo;
});
document.addEventListener("DOMContentLoaded", function () {

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user) {
        document.getElementById("userName").textContent = user.fullName;
        document.getElementById("userRole").textContent = user.role;
        document.getElementById("userPhoto").src = user.photo;
    }

});
