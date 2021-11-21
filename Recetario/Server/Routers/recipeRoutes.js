"user strict";

const express = require('express');
const router = express.Router();
const recipeHandler = require('../../BackEnd/Receta/recipeHandler');

router.route('/')
.get((req, res) => {
     if(req.query.filter == undefined){
          res.status(200).json(recipeHandler.getRecipes());
     }
});

 router.route('/:rid',)
 .get((req, res) => {
      let id = req.params.rid;
      let recipe = recipeHandler.getRecipeById(id);
      if(typeof recipe != 'undefined') res.status(200).json(recipe);
      else{
          res.status(404).type('text/plain').send(`Error 404 Recipe with id: ${id} not found`);
      }
 });


module.exports = router;