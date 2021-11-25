"user strict";

const express = require('express');
const router = express.Router();
const IngredientHandler = require('../../BackEnd/Ingrediente/ingredientHandler');

router.route('/').post(validateAdmin, (req, res) => {
    let ing = req.body;
    try {
        ing = IngredientHandler.createIngredient(ing);
        res.status(201).json(ing);
    }
    catch (e){
        res.status(400).type('text/plain').send(e.errorMessage);
    }
});

router.route('/:name')
.get((req, res) => {
    let  name = req.params.name;
    let ing = IngredientHandler.getIngredientByName(name);
    if(typeof ing != 'undefined') res.status(200).json(ing);
    else{
        res.status(404).type('text/plain').send(`Error 404 Ingredient with name: ${name} not found`);
    }
})
.put(validateAdmin, (req, res) => {
    let name = req.params.name;
    let updatedIngredient = req.body;
    if(typeof IngredientHandler.getIngredientByName(name)  != 'undefined'){
        IngredientHandler.updateIngredient(name, updatedIngredient);
        res.status(200).json(IngredientHandler.getIngredientByName(name));
    }
    else res.status(404).type('text/plain').send(`Ingredient with name: ${name} don't exist`);
})
.delete(validateAdmin, (req, res) => {
    let name = req.params.name;
    if(typeof IngredientHandler.getIngredientByName(name) != 'undefined'){
        IngredientHandler.deleteIngredient(name);
        res.status(200).type('text/plain').send(`Ingredient with name: ${name} was successfully deleted`);
    }
    else res.status(404).type('text/plain').send(`Ingredient with name: ${name} don't exist`);
});

function validateAdmin(req, res, next)  {
    let auth = req.header('x-auth');
    if(auth == 'admin') next();
    else res.status(403).type('text/plain').send("Access unauthorized, no admin privileges");
}

module.exports = router;