document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) return;

    const photo = document.getElementById("userPhoto");
    const name = document.getElementById("userName");
    const role = document.getElementById("userRole");

    if (photo) {
        photo.src = user.photo || "images/default-user.png";
    }

    if (name) {
        name.textContent = user.fullName || user.username;
    }

    if (role) {
        role.textContent = user.role;
    }
});
localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
document.addEventListener("DOMContentLoaded", function () {

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
        console.log("No logged-in user found");
        return;
    }

    document.getElementById("userName").textContent = user.fullName;
    document.getElementById("userRole").textContent = user.role;
    document.getElementById("userPhoto").src = user.photo;

});