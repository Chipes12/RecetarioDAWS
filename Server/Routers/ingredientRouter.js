"user strict";

const express = require('express');
const router = express.Router();
const IngredientHandler = require('../../BackEnd/Ingrediente/ingredientHandler');
const tokenUtils = require("../models/tokenUtils");

router.route('/').post(tokenUtils.verifyToken, (req, res) => {
        IngredientHandler.createIngredient(req, res);
    })
.get((req, res) => {
    IngredientHandler.getIngredients(req, res);
});

router.route('/:name')
.get((req, res) => {
    let name = req.params.name;
    IngredientHandler.getIngredientByName(name, res);
 })
 .put(tokenUtils.verifyToken, (req, res) => {
    IngredientHandler.updateIngredient(req, res);
})
.delete(tokenUtils.verifyToken, (req, res) => {
    IngredientHandler.deleteIngredient(req, res);
});

module.exports = router;