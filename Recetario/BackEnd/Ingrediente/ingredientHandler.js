"use strcit";

// const fs = require("fs");
// const Ingrediente = require("./ingredient");
// let content = fs.readFileSync("./BackEnd/Ingrediente/data.json");
// const ingredients = JSON.parse(content).map(Ingrediente.createFromObject);

function getIngredients(){
    return ingredients;
}

function getIngredientByName(name){
    return ingredients.find(ing => ing._name == name);
}

function createIngredient(ingredient){
    let p = undefined;
    if(typeof ingredient == "string") p = Ingrediente.createFromJSON(ingredient);
    else p = Ingrediente.createFromObject(ingredient);
    ingredients.push(p);
    let newIngredients = JSON.stringify(ingredients)
    fs.writeFileSync("./BackEnd/Ingrediente/data.json" , newIngredients);
    return p;
}

function updateIngredient(name, updatedIngredient){
    if(getIngredientByName(name) != undefined){
        Ingrediente.cleanObject(updatedIngredient);
        let index = ingredients.findIndex(ing => ing._name == name);
        if(index > -1){
            Object.assign(ingredients[index], updatedIngredient);
            let newIngredients = JSON.stringify(ingredients);
            fs.writeFileSync("./BackEnd/Ingrediente/data.json" , newIngredients);
        }
    }
}

function deleteIngredient(name){
    let index = ingredients.findIndex(ing => ing._name == name);
    if(index > -1) ingredients.splice(index , 1);
    let newIngredients = JSON.stringify(ingredients);
    fs.writeFileSync("./BackEnd/Ingrediente/data.json" , newIngredients);
}

exports.deleteIngredient = deleteIngredient;
exports.updateIngredient = updateIngredient;
exports.createIngredient = createIngredient;
exports.getIngredientByName = getIngredientByName;
exports.getIngredients = getIngredients;