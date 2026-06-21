let incomeRecords =
JSON.parse(localStorage.getItem("income")) || [];

const form =
document.getElementById("incomeForm");

const table =
document.getElementById("incomeTable");

function saveIncome(){
    localStorage.setItem(
        "income",
        JSON.stringify(incomeRecords)
    );
}

function displayIncome(){

    table.innerHTML = "";

    incomeRecords.forEach((income,index)=>{

        table.innerHTML += `
        <tr>
            <td>${income.source}</td>
            <td>${income.amount}</td>
            <td>${income.date}</td>
            <td>
                <button onclick="deleteIncome(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });
}

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const source =
    document.getElementById("source").value;

    const amount =
    document.getElementById("amount").value;

    const date =
    document.getElementById("date").value;

    incomeRecords.push({
        source,
        amount,
        date
    });

    saveIncome();
    displayIncome();

    form.reset();

});

function deleteIncome(index){

    incomeRecords.splice(index,1);

    saveIncome();
    displayIncome();

}

document.getElementById("searchIncome")
.addEventListener("keyup",function(){

    let search =
    this.value.toLowerCase();

    let rows =
    document.querySelectorAll("#incomeTable tr");

    rows.forEach(row=>{

        let text =
        row.innerText.toLowerCase();

        row.style.display =
        text.includes(search)
        ? ""
        : "none";

    });

});

displayIncome();