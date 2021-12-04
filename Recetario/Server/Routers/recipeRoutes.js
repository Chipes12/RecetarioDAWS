"user strict";

const express = require('express');
const router = express.Router();
const recipeHandler = require('../../BackEnd/Receta/recipeHandler');

router.route('/') //Post
    .post((req, res) => {
        recipeHandler.createRecipe(req, res);
    })
    .get((req, res) => {
        recipeHandler.getRecipes(req, res);
    });

router.route('/:rid', )
    .get((req, res) => {
        let rid = req.params.rid;
        recipeHandler.getRecipeById(rid, res);
    })
    .put((req, res) => {
        recipeHandler.updateRecipe(req, res);
    })
    .delete(validateAdmin, (req, res) => {
        recipeHandler.deleteRecipe(req, res);
    })



function validateAdmin(req, res, next) {
    let auth = req.header('x-auth');
    if (auth == 'admin') next();
    else res.status(403).type('text/plain').send("Access unauthorized, no admin privileges");
}

module.exports = router;