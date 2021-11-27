"use strcit";

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

function getRecipeById(rid, res) {
    Receta.find({
            "_rid": rid
        }).then(recipe => res.status(200).json(recipe))
        .catch(err => {
            res.status(400).send(err)
            // return;
        })
    // Receta.findOne({_rid: rid}).then(recipe => res.status(200).json(recipe))
    //     .catch(err => res.status(400).send(err));
    // return recipes.find(recipe => recipe._rid == rid);
}

function createRecipe(req, res) {
    let recipe = Receta(req.body);
    recipe.save().then(recipe => {
        res.set('Content-Type', 'text/plain;charset=utf8');
        res.send(`Receta ${recipe.name} was created`);
        res.status(200);
    }).catch(err => res.status(400).send('Unable to create: ' + err));
    // let p = undefined;
    // if (typeof recipe == "string") p = Receta.Recipe.createFromJSON(recipe);
    // else p = Receta.Recipe.createFromObject(recipe);
    // recipes.push(p);
    // let newRecipes = JSON.stringify(recipes)
    // fs.writeFileSync("./BackEnd/Receta/data.json", newRecipes);
    // return p;
}

function updateRecipe(req, res) {
    let rid = req.params.rid;
    let recipeUpdated = req.body;
    //clean object
    for (let property in recipeUpdated) {
        if (['rid', 'name', 'estimatedTime', 'ingredients', 'category', 'rating', 'preparation', 'portions', 'imageUrl', 'videoUrl'].includes(property)) continue;
        delete recipeUpdated[property];
    }
    //find and update
    Receta.findOneAndReplace({
            "_id": rid
        }, recipeUpdated)
        .then(recipe => {
            recipe.save();
            res.status(200).send('Updated successfully')
        })
        .catch(err => res.status(400).send(`Unable to update recipe with id ${rid}: ${err}`));

    // if (getRecipeById(rid) != undefined) {
    //     Receta.Recipe.cleanObject(updatedRecipe);
    //     let index = recipes.findIndex(recipe => recipe._rid == rid);
    //     if (index > -1) {
    //         Object.assign(recipes[index], updatedRecipe);
    //         recipes[index]._estimatedTime = typeof recipes[index]._estimatedTime == "number" ? Receta.Times[`Time${recipes[index]['_estimatedTime']}`] : recipes[index]._estimatedTime;
    //         recipes[index]._category = typeof recipes[index]._category == "number" ? Receta.Category[`type${recipes[index]['_category']}`] : recipes[index]._category;
    //         let newRecipes = JSON.stringify(recipes);
    //         fs.writeFileSync("./BackEnd/Receta/data.json", newRecipes);
    //     }
    // }
}

function deleteRecipe(req, res) {
    let rid = req.params.rid;
    Receta.findByIdAndRemove(rid)
    .then(recipe => {
        res.status(200).send('Recipe deleted successfully');
    }).catch(err => res.status(400).send(`Unable to update recipe with id ${rid}: ${err}`));

    // let index = recipes.findIndex(recipe => recipe._rid == rid);
    // if (index > -1) recipes.splice(index, 1);
    // let newRecipes = JSON.stringify(recipes);
    // fs.writeFileSync("./BackEnd/Receta/data.json", newRecipes);
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