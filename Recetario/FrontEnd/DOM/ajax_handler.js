"use strict";

const recipeBookRoute = "http://localhost:3000/recipebook/recipes/";


async function loadRecipes(url){
    let response = await fetch(url);
    if(response.status != 200) return[];
    return await response.json();
}