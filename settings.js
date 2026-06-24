// =========================
// SETTINGS.JS
// =========================

// Store uploaded profile photo
let uploadedPhoto = "";

// Preview selected image
const photoInput = document.getElementById("profilePhoto");

if (photoInput) {
    photoInput.addEventListener("change", function () {
        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {
            uploadedPhoto = e.target.result;

            const preview = document.getElementById("previewImage");

            if (preview) {
                preview.src = uploadedPhoto;
                preview.style.display = "block";
            }
        };

        reader.readAsDataURL(file);
    });
}

// Save Account
function saveAccount() {
    const fullName = document.getElementById("fullName").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!fullName || !username || !password) {
        alert("Please fill all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check duplicate username
    const exists = users.some(user => user.username === username);

    if (exists) {
        alert("Username already exists.");
        return;
    }

    const newUser = {
        fullName,
        username,
        password,
        role,
        photo: uploadedPhoto || "images/default-user.png"
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account saved successfully!");

    clearForm();
    displayAccounts();
}

// Clear Form
function clearForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("role").selectedIndex = 0;

    if (document.getElementById("profilePhoto")) {
        document.getElementById("profilePhoto").value = "";
    }

    if (document.getElementById("previewImage")) {
        document.getElementById("previewImage").src = "";
        document.getElementById("previewImage").style.display = "none";
    }

    uploadedPhoto = "";
}

// Display Accounts
function displayAccounts() {
    const container = document.getElementById("accountsList");

    if (!container) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
        container.innerHTML = "<p>No accounts created.</p>";
        return;
    }

    let html = "";

    users.forEach((user, index) => {
        html += `
        <div class="account-card">
            <img src="${user.photo}" 
                 style="width:70px;height:70px;border-radius:50%;object-fit:cover;">

            <h4>${user.fullName}</h4>

            <p>
                Username: ${user.username}<br>
                Role: ${user.role}
            </p>

            <button onclick="deleteAccount(${index})">
                Delete
            </button>
        </div>
        `;
    });

    container.innerHTML = html;
}

// Delete Account
function deleteAccount(index) {
    if (!confirm("Delete this account?")) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.splice(index, 1);

    localStorage.setItem("users", JSON.stringify(users));

    displayAccounts();
}

// Load Accounts on Page Open
document.addEventListener("DOMContentLoaded", function () {
    displayAccounts();
});
localStorage.removeItem("users");
localStorage.removeItem("loggedInUser");
