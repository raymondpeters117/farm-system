function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        alert("Login successful");

        window.location.href = "dashboard.html";
    } else {
        alert("Invalid username or password");
    }
}