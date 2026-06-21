let animals =
JSON.parse(localStorage.getItem("animals")) || [];

function addAnimal(){

    animals.push({

        tag:
        document.getElementById("tag").value,

        breed:
        document.getElementById("breed").value,

        age:
        document.getElementById("age").value
    });

    localStorage.setItem(
        "animals",
        JSON.stringify(animals)
    );

    loadAnimals();
}

function loadAnimals(){

    let table =
    document.getElementById("animalTable");

    table.innerHTML="";

    animals.forEach((animal,index)=>{

        table.innerHTML += `
        <tr>
            <td>${animal.tag}</td>
            <td>${animal.breed}</td>
            <td>${animal.age}</td>
            <td>
            <button onclick="deleteAnimal(${index})">
            Delete
            </button>
            </td>
        </tr>
        `;
    });
}

function deleteAnimal(index){

    animals.splice(index,1);

    localStorage.setItem(
        "animals",
        JSON.stringify(animals)
    );

    loadAnimals();
}

loadAnimals();