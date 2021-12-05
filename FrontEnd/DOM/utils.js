"use strict";

const Category = {
    "type1": "Platillo",
    "type2": "Bebida",
    "type3": "Postre",
    "type4": "Aperitivo",
    "type5": "Entrada",
};

const Times = {
    "Time1": "5 - 20 min",
    "Time2": "20 - 60 min",
    "Time3": "60+ min",
};

function initRecipeStorage() {
    let init = {
        "Hola": "Mundo"
    };
    if (sessionStorage.getItem("Recipe") == null) {
        writeRecipeStorage(init);
    }
}

function readRecipeStorage() {
    let storage = JSON.parse(sessionStorage.getItem("Recipe"));
    return storage;
}

function writeRecipeStorage(recipe) {
    sessionStorage.setItem("Recipe", JSON.stringify(recipe));
}

function initUserStorage() {
    let init = {
        "Hola": "Mundo"
    };
    if (localStorage.getItem("User") == null) {
        writeUserStorage(init);
    }
}

function readUserStorage() {
    let storage = JSON.parse(localStorage.getItem("User"));
    return storage;
}

function writeUserStorage(user) {
    localStorage.setItem("User", JSON.stringify(user));

}

function deleteUserStorage() {
    localStorage.setItem("User", JSON.stringify(JSON.stringify("undefined")));
    window.location.reload();
}

initUserStorage();
initRecipeStorage();