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
        let index = recipes.findIndex(recipe => recipe._rid == rid);
        if(index > -1){
            Object.assign(recipes[index], updatedRecipe);
            let newRecipes = JSON.stringify(recipes);
            console.log(recipes);
            fs.writeFileSync("./BackEnd/Receta/data.json", newRecipes);
        }
    }
}

function deleteRecipe(rid){
    let index = recipes.findIndex(recipe => recipe.rid == rid);
    if(index > -1) recipes.splice(index , 1);
    let newRecipes = JSON.stringify(recipes)
    fs.writeFileSync("./BackEnd/Receta/data.json" , newRecipes);
}

function firltRecipes(time, type, rate){
    let firlteredArray = Array.from(recipes);
    if(time != undefined){
        firlteredArray = firlteredArray.filter(el => {return el._estimatedTime == time});
    }
    if(type != undefined){
        firlteredArray = firlteredArray.filter(el => {return el._category == type});
    }
    if(rate != undefined){
        firlteredArray = firlteredArray.filter(el => {return el._rating == rate});
    }
    return firlteredArray;
}

exports.createRecipe = createRecipe;
exports.getRecipeById = getRecipeById;
exports.getRecipes = getRecipes;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;
exports.firltRecipes = firltRecipes;