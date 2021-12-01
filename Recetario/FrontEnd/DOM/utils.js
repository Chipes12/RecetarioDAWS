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

function initUserStorage(){
    let init = {"Hola" : "Mundo"};
    if(sessionStorage.getItem("User") == null){
        writeUserStorage(init);
    }
}

function readUserStorage(){
    let storage = JSON.parse(sessionStorage.getItem("User"));
    return storage;
}

function writeUserStorage(user){
    sessionStorage.setItem("User", JSON.stringify(user));
}
initUserStorage();
initRecipeStorage();

