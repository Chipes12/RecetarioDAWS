"use strict";

const recipeBookRoute = `http://localhost:8080/recipebook/recipes/`;

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