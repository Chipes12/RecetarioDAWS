"use strcit";

const fs = require("fs");
const Ingrediente = require("./ingredient");
let content = fs.readFileSync("./BackEnd/Ingrediente/data.json");
const ingredients = JSON.parse(content).map(Ingrediente.createFromObject);

function getIngredients(){
    return ingredients;
}

function getIngredientById(iid){
    return ingredients.find(ing => ing._iid == iid);
}

function createIngridient(ingredient){
    let p = undefined;
    if(typeof ingredient == "string") p = Ingrediente.createFromJSON(recipe);
    else p = Ingrediente.createFromObject(recipe);
    ingredients.push(p);
    let newIngredients = JSON.stringify(ingredients)
    fs.writeFileSync("./BackEnd/Ingrediente/data.json" , newIngredients);
    return p;
}

function updateIngredient(iid, updatedIngredient){
    if(getIngredientById(iid) != undefined){
        Ingrediente.cleanObject(updatedIngredient);
        let index = ingredients.findIndex(ing => ing._iid == iid);
        if(index > -1){
            Object.assign(ingredients[index], updatedIngredient);
            let newIngredients = JSON.stringify(ingredients);
            fs.writeFileSync("./BackEnd/Ingrediente/data.json" , newIngredients);
        }
    }
}

function deleteIngredient(iid){
    let index = ingredients.findIndex(ing => ing._rid == rid);
    if(index > -1) ingredients.splice(index , 1);
    let newIngredients = JSON.stringify(ingredients);
    fs.writeFileSync("./BackEnd/Ingrediente/data.json" , newIngredients);
}

exports.deleteIngredient = deleteIngredient;
exports.updateIngredient = updateIngredient;
exports.createIngridient = createIngridient;
exports.getIngredientById = getIngredientById;
exports.getIngredients = getIngredients;