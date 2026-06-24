// index.js

document.addEventListener("DOMContentLoaded", () => {

    // Create default admin account if no users exist
    let users = JSON.parse(localStorage.getItem("users"));

    if (!users || users.length === 0) {
        users = [
            {
                username: "admin",
                password: "admin123",
                role: "Admin",
                fullName: "System Administrator",
                photo: "assets/images/default-user.png"
            }
        ];

        localStorage.setItem("users", JSON.stringify(users));
    }

});

// Login Function
function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (user) {

        // Save logged-in user
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        alert("Login Successful!");

        // Redirect to dashboard
        window.location.href = "dashboard.html";

    } else {

        alert("Invalid Username or Password");

    }
}

// Allow Enter key to login
document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        login();
    }

});
localStorage.removeItem("users");
