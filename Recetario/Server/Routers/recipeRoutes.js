"user strict";

const express = require('express');
const router = express.Router();
const recipeHandler = require('../../BackEnd/Receta/recipeHandler');

router.route('/') //Post
    .post((req, res) => {
        recipeHandler.createRecipe(req, res);

        // try{
        //     recipe =  recipeHandler.createRecipe(recipe);
        //     res.status(201).json(recipe);
        // }
        // catch(e) {
        //     res.status(400).send(e.errorMessage);
        // }
    })
    .get((req, res) => {
        //  if(req.query.time == undefined && req.query.type == undefined && req.query.rate == undefined){
        recipeHandler.getRecipes(req, res);
        //  }
        //  else{
        //       let filteredArray = recipeHandler.firltRecipes(req.query.time,  req.query.type,  req.query.rate);
        //       res.status(200).json(filteredArray);
        //  }
    })

router.route('/:rid', )
    .get((req, res) => {
        let rid = req.params.rid;
        recipeHandler.getRecipeById(rid, res);
        //   let recipe = recipeHandler.getRecipeById(rid,req,res);
        //   if(typeof recipe != 'undefined') res.status(200).json(recipe);
        //   else{
        //       res.status(404).type('text/plain').send(`Error 404 Recipe with id: ${rid} not found`);
        //   }
    })
    .put((req, res) => {
        recipeHandler.updateRecipe(req, res);
        //  if(typeof recipeHandler.getRecipeById(rid)  != 'undefined'){
        //       recipeHandler.updateRecipe(rid, recipeUpdated);
        //       res.status(200).json(recipeHandler.getRecipeById(rid));
        //   }
        //   else{
        //       res.status(404).type('text/plain').send(`Recipe with id: ${rid} don't exist`);
        //   }
    })
    .delete(validateAdmin, (req, res) => {
        recipeHandler.deleteRecipe(req, res);
        //  let rid = req.params.rid;
        //  if(typeof recipeHandler.getRecipeById(rid) != 'undefined'){
        //       recipeHandler.deleteRecipe(rid);
        //      res.status(200).type('text/plain').send(`Recipe with id: ${rid} was successfully deleted`);
        //  }
        //  else{
        //      res.status(404).type('text/plain').send(`Recipe with id: ${rid} don't exist`);
        //  }
    })



function validateAdmin(req, res, next) {
    let auth = req.header('x-auth');
    if (auth == 'admin') next();
    else res.status(403).type('text/plain').send("Access unauthorized, no admin privileges");
}

module.exports = router;