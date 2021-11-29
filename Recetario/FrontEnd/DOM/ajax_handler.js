"use strict";

const recipeBookRoute = `http://localhost:8080/recipebook/recipes/`;
const userPost = 'http://localhost:8080/recipebook/user';

const Category = {
	"type1": "Platillo",
	"type2": "Bebida",
	"type3": "Postre",
	"type4": "Aperitivo",
    "type5": "Entrada",
};

const Times = {
    "Time1" : "5 - 20 min",
    "Time2": "20 - 60 min",
    "Time3": "60+ min",
};

async function loadRecipes(url){
    let response = await fetch(url);
    if(response.status != 200) return[];
    return await response.json();
}

async function loadRecipeData(url, rid){
    let response = await fetch(url + rid);
    if(response.status != 200) return[];
    return await response.json();
}

function signUp(){
    let xhr = new XMLHttpRequest();
   let obj =  {
        name:document.getElementById('name').value,
        lastName:document.getElementById('lastName').value,
        email: document.getElementById('mail').value,
        password: document.getElementById('password').value,
        registerDate:document.getElementById('regDate').value,
        sex :document.querySelector('input[name="sexo"]:checked').value,
        status: 'User1',
        favouriteRecipes: [],
    };
    xhr.open('POST', userPost);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(obj));
    xhr.onreadystatechange = function(){
        if(this.status == 200 && this.readyState ==4){
            document.getElementById('close').click();
        }
    }
    return false;
}
