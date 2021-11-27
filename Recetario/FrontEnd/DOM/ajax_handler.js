"use strict";

const recipeBookRoute = process.env.RECIPE_BOOK_ROUTE;

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