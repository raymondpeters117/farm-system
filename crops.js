let crops =
JSON.parse(localStorage.getItem("crops")) || [];

function addCrop(){

    crops.push({

        crop:
        document.getElementById("crop").value,

        acreage:
        document.getElementById("acreage").value,

        planted:
        document.getElementById("planted").value
    });

    localStorage.setItem(
        "crops",
        JSON.stringify(crops)
    );

    loadCrops();
}

function loadCrops(){

    let table =
    document.getElementById("cropTable");

    table.innerHTML="";

    crops.forEach((crop,index)=>{

        table.innerHTML += `
        <tr>
            <td>${crop.crop}</td>
            <td>${crop.acreage}</td>
            <td>${crop.planted}</td>
            <td>
            <button onclick="deleteCrop(${index})">
            Delete
            </button>
            </td>
        </tr>
        `;
    });
}

function deleteCrop(index){

    crops.splice(index,1);

    localStorage.setItem(
        "crops",
        JSON.stringify(crops)
    );

    loadCrops();
}

loadCrops();