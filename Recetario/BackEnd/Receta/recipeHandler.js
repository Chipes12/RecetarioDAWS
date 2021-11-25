"use strcit";

const fs = require("fs");
const Receta = require("./recipe");
let content = fs.readFileSync("./BackEnd/Receta/data.json");
const recipes = JSON.parse(content).map(Receta.Recipe.createFromObject);

function getRecipes(){
    return recipes;
}

function getRecipeById(rid){
    return recipes.find(recipe => recipe._rid == rid);
}

function createRecipe(recipe){
    let p = undefined;
    console.log(recipe);
    if(typeof recipe == "string") p = Receta.Recipe.createFromJSON(recipe);
    else p = Receta.Recipe.createFromObject(recipe);
    recipes.push(p);
    let newRecipes = JSON.stringify(recipes)
    fs.writeFileSync("./BackEnd/Receta/data.json" , newRecipes);
    return p;
}

function updateRecipe(rid, updatedRecipe){
    if(getRecipeById(rid) != undefined){
        Receta.Recipe.cleanObject(updatedRecipe);
        let index = recipes.findIndex(recipe => recipe._rid == rid);
        if(index > -1){
            Object.assign(recipes[index], updatedRecipe);
            recipes[index]['_estimatedTime'] = Receta.Times[`Time${recipes[index]['_estimatedTime']}`];
            recipes[index]['_category'] = Receta.Category[`type${recipes[index]['_category']}`];
            let newRecipes = JSON.stringify(recipes);
            fs.writeFileSync("./BackEnd/Receta/data.json", newRecipes);
        }
    }
}

function deleteRecipe(rid){
    let index = recipes.findIndex(recipe => recipe._rid == rid);
    if(index > -1) recipes.splice(index , 1);
    let newRecipes = JSON.stringify(recipes);
    fs.writeFileSync("./BackEnd/Receta/data.json" , newRecipes);
}

function firltRecipes(time, type, rate){
    let firlteredArray = Array.from(recipes);
    if(time != undefined && (time > 0 && time < 4)){
        let ti = "Time" + time;
        firlteredArray = firlteredArray.filter(el => {return el._estimatedTime == Receta.Times[ti]});
    }
    if(type != undefined && (type > 0 && type < 6)){
        let ty = "type" + type;
        firlteredArray = firlteredArray.filter(el => {return el._category == Receta.Category[ty]});
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