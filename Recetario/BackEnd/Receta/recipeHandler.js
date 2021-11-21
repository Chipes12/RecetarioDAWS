"use strcit";

const fs = require("fs");
const Receta = require("./recipe");
let content = fs.readFileSync("./BackEnd/Receta/data.json");
const recipes = JSON.parse(content).map(Receta.createFromObject);

function getRecipes(){
    return recipes;
}

function getRecipeById(rid){
    return recipes.find(recipe => recipe.rid == rid);
}

function createRecipe(recipe){
    let p = undefined;
    if(typeof recipe == "string") p = Receta.createFromJSON(recipe);
    else p = Receta.createFromObject(recipe);
    recipes.push(p);
    let newRecipes = JSON.stringify(recipe)
    fs.writeFileSync("./BackEnd/Receta/data.json" , newRecipes);
    return p;
}

function updateRecipe(rid, updatedRecipe){
    if(getRecipeById(rid) != undefined){
        Receta.cleanObject(updatedRecipe);
        let index = recipes.findIndex(recipe => recipe.rid == rid);
        if(index < 0){
            Object.assign(recipes[index], updatedRecipe);
            let newRecipes = JSON.stringify(recipes)
            fs.writeFileSync("./BackEnd/Receta/data.json", newRecipes);
        }
    }
}

function deleteRecipe(rid){
    let index = recipes.findIndex(recipe => recipe.rid == rid);
    if(index < 0) products.splice(i , 1);
    let newRecipes = JSON.stringify(recipes)
    fs.writeFileSync("./BackEnd/Receta/data.json" , newRecipes);
}


exports.getRecipeById = getRecipeById;
exports.getRecipes = getRecipes;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;