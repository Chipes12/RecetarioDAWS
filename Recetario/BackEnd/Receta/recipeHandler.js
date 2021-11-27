"use strcit";

const { json } = require('express');
// const fs = require("fs");
const Receta = require("../../Server/models/recipes"); //require("./recipe");
// let content = fs.readFileSync("./BackEnd/Receta/data.json");
// const recipes = JSON.parse(content).map(Receta.Recipe.createFromObject);

function getRecipes(req, res) {
    // await Receta.findById('f7d0-af5b-4c41-a7cb').then(recipes => console.log(recipes)).catch(err => console.log(err));
    // Receta.db('Recetario');
        Receta.find({}).then(recipe => res.status(200).json(recipe))
        .catch(err => res.status(400).send(err));
    // return recipes;
}

function getRecipeById(rid,res) {
        Receta.find({"_rid": rid}).then(recipe => res.status(200).json(recipe))
        .catch(err => {
            res.status(400).send(err)
            // return;
        })
    // Receta.findOne({_rid: rid}).then(recipe => res.status(200).json(recipe))
    //     .catch(err => res.status(400).send(err));
    // return recipes.find(recipe => recipe._rid == rid);
}

function createRecipe(recipe) {
    let p = undefined;
    if (typeof recipe == "string") p = Receta.Recipe.createFromJSON(recipe);
    else p = Receta.Recipe.createFromObject(recipe);
    recipes.push(p);
    let newRecipes = JSON.stringify(recipes)
    fs.writeFileSync("./BackEnd/Receta/data.json", newRecipes);
    return p;
}

function updateRecipe(rid, updatedRecipe) {
    if (getRecipeById(rid) != undefined) {
        Receta.Recipe.cleanObject(updatedRecipe);
        let index = recipes.findIndex(recipe => recipe._rid == rid);
        if (index > -1) {
            Object.assign(recipes[index], updatedRecipe);
            recipes[index]._estimatedTime = typeof recipes[index]._estimatedTime == "number" ? Receta.Times[`Time${recipes[index]['_estimatedTime']}`] : recipes[index]._estimatedTime;
            recipes[index]._category = typeof recipes[index]._category == "number" ? Receta.Category[`type${recipes[index]['_category']}`] : recipes[index]._category;
            let newRecipes = JSON.stringify(recipes);
            fs.writeFileSync("./BackEnd/Receta/data.json", newRecipes);
        }
    }
}

function deleteRecipe(rid) {
    let index = recipes.findIndex(recipe => recipe._rid == rid);
    if (index > -1) recipes.splice(index, 1);
    let newRecipes = JSON.stringify(recipes);
    fs.writeFileSync("./BackEnd/Receta/data.json", newRecipes);
}

function firltRecipes(time, type, rate) {
    let firlteredArray = Array.from(recipes);
    if (time != undefined && (time > 0 && time < 4)) {
        let ti = "Time" + time;
        firlteredArray = firlteredArray.filter(el => {
            return el._estimatedTime == Receta.Times[ti]
        });
    }
    if (type != undefined && (type > 0 && type < 6)) {
        let ty = "type" + type;
        firlteredArray = firlteredArray.filter(el => {
            return el._category == Receta.Category[ty]
        });
    }
    if (rate != undefined) {
        firlteredArray = firlteredArray.filter(el => {
            return el._rating == rate
        });
    }
    return firlteredArray;
}
exports.createRecipe = createRecipe;
exports.getRecipeById = getRecipeById;
exports.getRecipes = getRecipes;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;
exports.firltRecipes = firltRecipes;