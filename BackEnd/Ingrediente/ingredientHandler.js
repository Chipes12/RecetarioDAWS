"use strict";

const Ingredient = require("../../Server/models/ingredients");
// const fs = require("fs");
// const Ingrediente = require("./ingredient");
// let content = fs.readFileSync("./BackEnd/Ingrediente/data.json");
// const ingredients = JSON.parse(content).map(Ingrediente.createFromObject);

function getIngredients(req, res) {
    Ingredient.find({}).then(ingre => res.status(200).json(ingre))
        .catch(err => res.status(400).send(err));

    //return ingredients;
}

function getIngredientByName(name, res) {
    Ingredient.find({
            "name": name
        }).then(ingre => res.status(200).json(ingre))
        .catch(err => {
            res.status(400).send(err)
            // return;
        })

    //return ingredients.find(ing => ing._name == name);
}

function createIngredient(req, res) {
    let ingredient = Ingredient(req.body);
    ingredient.save().then(ingre => {
        res.set('Content-Type', 'text/plain;charset=utf8');
        res.send(`Ingredient ${ingre.name} was created`);
        res.status(200);
    }).catch(err => res.status(400).send('Unable to create: ' + err));
    /*let p = undefined;
    if (typeof ingredient == "string") p = Ingrediente.createFromJSON(ingredient);
    else p = Ingrediente.createFromObject(ingredient);
    ingredients.push(p);
    let newIngredients = JSON.stringify(ingredients)
    fs.writeFileSync("./BackEnd/Ingrediente/data.json", newIngredients);
    return p;*/
}

function updateIngredient(req, res) {
    let name = req.params.name;
    let ingreUpdated = req.body;
    //clean object
    for (let property in ingreUpdated) {
        if (["name", "imageUrl"].includes(property)) continue;
        delete ingreUpdated[property];
    }
    //find and update
    Ingredient.findOneAndReplace({
            "name": name
        }, ingreUpdated)
        .then(ingre => {
            ingre.save();
            res.status(200).send('Updated successfully')
        })
        .catch(err => res.status(400).send(`Unable to update ingredient with name ${name}: ${err}`));
    /*if (getIngredientByName(name) != undefined) {
        Ingrediente.cleanObject(updatedIngredient);
        let index = ingredients.findIndex(ing => ing._name == name);
        if (index > -1) {
            Object.assign(ingredients[index], updatedIngredient);
            let newIngredients = JSON.stringify(ingredients);
            fs.writeFileSync("./BackEnd/Ingrediente/data.json", newIngredients);
        }
    }*/
}

function deleteIngredient(req, res) {
    let name = req.params.name;
    Ingredient.findByIdAndRemove(name)
        .then(ingre => {
            res.status(200).send('Ingredient deleted successfully');
        }).catch(err => res.status(400).send(`Unable to delete ingredient with name ${name}: ${err}`));

    /*let index = ingredients.findIndex(ing => ing._name == name);
    if (index > -1) ingredients.splice(index, 1);
    let newIngredients = JSON.stringify(ingredients);
    fs.writeFileSync("./BackEnd/Ingrediente/data.json", newIngredients);*/
}

exports.deleteIngredient = deleteIngredient;
exports.updateIngredient = updateIngredient;
exports.createIngredient = createIngredient;
exports.getIngredientByName = getIngredientByName;
exports.getIngredients = getIngredients;