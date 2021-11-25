"user strict";

const express = require('express');
const router = express.Router();
const IngredientHandler = require('../../BackEnd/Ingrediente/ingredientHandler');

router.route('/').get((req, res) => {
    res.json(IngredientHandler.getIngredients());
});

router.route('/:iid')
.get((req, res) => {
    let  iid = req.params.iid;
    let ing = IngredientHandler.getIngredientById(iid);
    if(typeof ing != 'undefined') res.status(200).json(ing);
    else{
        res.status(404).type('text/plain').send(`Error 404 Recipe with id: ${iid} not found`);
    }
});

module.exports = router;