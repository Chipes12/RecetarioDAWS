"use strcit";

const fs = require("fs");
const Recipe = require("./recipe");

const recipes = [];

function getRecipes(){
    return recipes;
}

function getRecipeById(rid){
    return recipes.find(recipe => recipe.rid == rid);
}

function createRecipe(recipe){
    let p = undefined;
    if(typeof recipe == "string") {
        p = Recipe.createFromJSON(recipe);
    }
    else {
        p = Recipe.createFromObject(recipe);
    }
    recipes.push(p);
    //let newRecipes = JSON.stringify(recipe)
    // fs.writeFileSync("./app/Data/products.json" , newProducts);
    return p;
}