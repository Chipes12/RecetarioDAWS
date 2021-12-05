"use strict";

let mainContainer = document.getElementById('dataRecipeCont');
let ingrArr = [];

function load() {
    loadIngredients(getIngr).then(ingredients => {
        ingredientsListToHTML(ingredients);
    });
    loadRecipeType();
    loadRecipeTime();
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
//load recipe category in select
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
//push obj ingr to arr
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

function addInputIngr() {
    mainContainer.innerHTML += `<label for="nameIngredientes">Ingredientes: </label>
    <select id="ingredients" name="nameIngredients" required>
    </select><br>
    <label for="cantidad">Cantidad: </label>
    <input id="totalIngredients" name="cantidad" type="number" value="1" style="margin-bottom: 15px;"
        required><br>`;
    load();
}

//guardar valores en base de datos
function addRecipe() {
    addIngrToRecipe();

    let url = recipeBookRoute;
    createRec(url);

}
load();