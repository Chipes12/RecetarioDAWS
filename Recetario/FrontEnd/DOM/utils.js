"use strict";

function initRecipeStorage(){
    let init = {"Hola" : "Mundo"};
    if(sessionStorage.getItem("Recipe") == null){
        writeRecipeStorage(init);
    }
}

function readRecipeStorage(){
    let storage = JSON.parse(sessionStorage.getItem("Recipe"));
    return storage;
}

function writeRecipeStorage(recipe){
    sessionStorage.setItem("Recipe", JSON.stringify(recipe));
}

initRecipeStorage();

