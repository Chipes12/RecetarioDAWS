"use strcit";

const Receta = require("../../Server/models/recipes"); 

function getRecipes(req, res) {
    Receta.find({}).then(recipe => res.status(200).json(recipe))
        .catch(err => res.status(400).send(err));
}

function getRecipeById(rid, res) {
    Receta.find({
            "_id": rid
        }).then(recipe => res.status(200).json(recipe))
        .catch(err => {
            res.status(400).send(err)});
}

function createRecipe(req, res) {
    let recipe = Receta(req.body);
    recipe.save().then(recipe => {
        res.set('Content-Type', 'text/plain;charset=utf8');
        res.send(`Receta ${recipe.name} was created`);
        res.status(200);
    }).catch(err => res.status(400).send('Unable to create: ' + err));

}

function updateRecipe(req, res) {
    let rid = req.params.rid;
    let recipeUpdated = req.body;
    //clean object
    for (let property in recipeUpdated) {
        if (['name', 'description', 'estimatedTime', 'ingredients', 'category', 'rating', 'preparation', 'portions', 'imageUrl', 'video'].includes(property)) continue;
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
        .catch(err => {
            res.status(400).send(`Unable to update recipe with id ${rid}: ${err}`)
        });
}

function deleteRecipe(req, res) {
    let rid = req.params.rid;
    Receta.findByIdAndRemove(rid)
        .then(recipe => {
            res.status(200).send('Recipe deleted successfully');
        }).catch(err => res.status(400).send(`Unable to update recipe with id ${rid}: ${err}`));
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