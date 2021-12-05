"use strict"
let mainContainer = document.getElementById('dataRecipeCont');
let ingrArr = [];

function addInputIngr() {
    let opciones;
    loadIngredients(getIngr).then(ingredients => {
        ingredients.forEach((element) => {
            opciones += optionToHtml(element);
        });
        mainContainer.innerHTML += `<label for="nameIngredientes">Ingredientes: </label>
        <select id="ingredients" name="nameIngredients" required>
        ${opciones}
        </select><br>
        <label for="cantidad">Cantidad: </label>
        <input id="totalIngredients" name="cantidad" type="number" value="1" style="margin-bottom: 15px;"
            required><br>`;
    });
    setSelectionValues();
}

function optionToHtml(valueIngr) {
    return `<option>${valueIngr.name}</option>`;
}

function ingredientsListToHTML(ingrList) {
    let ingredientsOptions = mainContainer.getElementsByTagName("select");
    for (let i = 0; i < ingredientsOptions.length; i++) {
        ingredientsOptions[i].innerHTML = ingrList.map(optionToHtml).join("\n");
    }
}

function loadRecipeType() {
    let typeSelector = document.getElementById('recipeType');
    for (let type in Category) {
        let option = document.createElement('option');
        option.value = type;
        typeSelector.appendChild(option).innerText = Category[type];
    }
}

//load recipe timing in select
function loadRecipeTime() {
    let typeSelector = document.getElementById('recipeTiming');
    for (let type in Times) {
        let option = document.createElement('option');
        option.value = type;
        typeSelector.appendChild(option).innerText = Times[type];
    }
}

function loadInfo() {
    loadRecipeTime();
    loadRecipeType();

    document.getElementById('nameRecipe').value = JSON.parse(sessionStorage.getItem("Recipe"))[0].name;
    document.getElementById('descrRecipe').value = JSON.parse(sessionStorage.getItem("Recipe"))[0].description;
    document.getElementById('portionsRecipe').value = JSON.parse(sessionStorage.getItem("Recipe"))[0].portions;
    document.getElementById('recipeType').value = JSON.parse(sessionStorage.getItem("Recipe"))[0].category;
    document.getElementById('recipeTiming').value = JSON.parse(sessionStorage.getItem("Recipe"))[0].estimatedTime;
    document.getElementById('recipeProcedure').value = JSON.parse(sessionStorage.getItem("Recipe"))[0].preparation;
    document.getElementById('urlImg').value = JSON.parse(sessionStorage.getItem("Recipe"))[0].imageUrl;
    document.getElementById('urlVid').value = JSON.parse(sessionStorage.getItem("Recipe"))[0].video;

    JSON.parse(sessionStorage.getItem("Recipe"))[0].ingredients.forEach((element, index) => {
        document.getElementById("dataRecipeCont").innerHTML +=
            `<select id="${index}" name="nameIngredients" required>
            <option selected>Selecciona una opción</option>
            </select><br>
            <label for="cantidad">Cantidad: </label>
            <input id="totalIngredients" name="cantidad" type="number" value="${element.cantidad}" style="margin-bottom: 15px;"
            required><br></br>`
    });
    setSelectionValues();
}

function setSelectionValues() {
    loadIngredients(getIngr).then(ingredients => {
        ingredientsListToHTML(ingredients);
        JSON.parse(sessionStorage.getItem("Recipe"))[0].ingredients.forEach((element, index) => {
            document.getElementById(index).value = element.name;
        });
    });
}

function addIngrToRecipe() {
    let selects = document.getElementById('dataRecipeCont').querySelectorAll("select");
    let inputs = document.getElementById('dataRecipeCont').querySelectorAll("input");
    for (let i = 0; i < selects.length; i++) {
        let ingr = {};
        ingr.name = selects[i].value;
        ingr.cantidad = Number(inputs[i].value);
        ingrArr.push(ingr);
    }
}

function updateRecipe() {
    addIngrToRecipe();
    let url = recipeBookRoute + JSON.parse(sessionStorage.getItem("Recipe"))[0]._id;
    updateRec(url);
}

function deleteRec() {
    let url = recipeBookRoute + JSON.parse(sessionStorage.getItem("Recipe"))[0]._id;
    deleteRecipe(url);
}

loadInfo();