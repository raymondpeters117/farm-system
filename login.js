function login(){

    let username =
    document.getElementById("username").value;

    let password =
    document.getElementById("password").value;

    let users =
    JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(
        u =>
        u.username === username &&
        u.password === password
    );

    if(user){

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        window.location.href =
        "dashboard.html";

    }else{

        alert("Invalid Username or Password");
    }
}function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(
        u => u.username === username &&
             u.password === password
    );

    if (user) {

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        window.location.href = "dashboard.html";

    } else {
        alert("Invalid Username or Password");
    }
}