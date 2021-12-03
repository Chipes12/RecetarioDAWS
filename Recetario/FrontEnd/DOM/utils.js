"use strict";

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
function deleteUserStorage(){
    localStorage.setItem("User", JSON.stringify(JSON.stringify("undefined")));
    window.location.reload();
}

function verifyUser(){
    if(JSON.parse(JSON.parse(localStorage.getItem("User"))) == "undefined"){
        document.getElementById("signupInBar").setAttribute("class", "");
        document.getElementById("loginInBar").setAttribute("class", "");
        document.getElementById("adminBar").setAttribute("class", "d-none");
        document.getElementById("myAccount").setAttribute("class", "d-none");
    }else{
        let uid = JSON.parse(JSON.parse(localStorage.getItem("User"))).idUser;
        let url = 'http://localhost:3000/recipebook/user/login' + "/" + uid;
        let response = fetch(url);
        if(response.status != 200){
            document.getElementById("signupInBar").setAttribute("class", "d-none");
            document.getElementById("loginInBar").setAttribute("class", "d-none");
            document.getElementById("adminBar").setAttribute("class", "");
            document.getElementById("myAccount").setAttribute("class", "");
        }else{
            document.getElementById("signupInBar").setAttribute("class", "");
            document.getElementById("loginInBar").setAttribute("class", "");
            document.getElementById("adminBar").setAttribute("class", "d-none");
            document.getElementById("myAccount").setAttribute("class", "d-none");
        }
    }
}

verifyUser();
initUserStorage();
initRecipeStorage();