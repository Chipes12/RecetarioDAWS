"user strict";

const express = require('express');
const router = express.Router();
const recipeHandler = require('../../BackEnd/Receta/recipeHandler');
const tokenUtils = require('../models/tokenUtils');

router.route('/') //Post
    .post(tokenUtils.verifyToken, (req, res) => {
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
    .put(tokenUtils.verifyToken, (req, res) => {
        recipeHandler.updateRecipe(req, res);
    })
    .delete(tokenUtils.verifyToken, (req, res) => {
        recipeHandler.deleteRecipe(req, res);
    });

module.exports = router;