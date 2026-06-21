// Create default admin if none exists
if (!localStorage.getItem("users")) {
    const defaultUsers = [
        {
            username: "admin",
            password: "admin123",
            role: "admin"
        }
    ];

    localStorage.setItem("users", JSON.stringify(defaultUsers));
}

// Create account
function createAccount() {

    let username = document.getElementById("newUsername").value.trim();
    let password = document.getElementById("newPassword").value.trim();
    let role = document.getElementById("newRole").value;

    if(username === "" || password === ""){
        alert("Fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.find(
        user => user.username === username
    );

    if(exists){
        alert("Username already exists");
        return;
    }

    users.push({
        username,
        password,
        role
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account Saved Successfully");

    document.getElementById("newUsername").value = "";
    document.getElementById("newPassword").value = "";

    loadAccounts();
}

// Display accounts
function loadAccounts(){

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let html = "";

    users.forEach((user,index)=>{

        html += `
        <div class="account-item">
            <p><strong>${user.username}</strong> (${user.role})</p>
            <button onclick="deleteAccount(${index})">
                Delete
            </button>
        </div>
        `;
    });

    document.getElementById("accountsList").innerHTML = html;
}

// Delete account
function deleteAccount(index){

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.splice(index,1);

    localStorage.setItem("users", JSON.stringify(users));

    loadAccounts();
}

loadAccounts();const currentUser =
JSON.parse(localStorage.getItem("currentUser"));

if (currentUser.role !== "admin") {

    alert("Access Denied");

    window.location.href = "dashboard.html";
}