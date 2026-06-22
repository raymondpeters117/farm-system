const currentUser =
JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "index.html";
}document.addEventListener("DOMContentLoaded", () => {

    let currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("loggedUser").textContent =
        currentUser.username;

    document.getElementById("loggedRole").textContent =
        currentUser.role.toUpperCase();
});
function logout() {
    localStorage.removeItem("loggedInUser");

    alert("Logged out successfully!");

    window.location.href = "index.html"; // Login page
}