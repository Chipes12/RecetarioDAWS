"use strict";

let ingredientsOptions = document.getElementById("ingredients");

function loadIngr() {
    loadIngredients(getIngr).then(ingredients => {
        ingredientsListToHTML(ingredients);
    });
}

function optionToHtml(valueIngr) {
    return `<option>${valueIngr.name}</option>`;
}

function ingredientsListToHTML(ingrList) {
    ingredientsOptions.innerHTML = ingrList.map(optionToHtml).join("\n");
}

loadIngr();