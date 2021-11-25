"use strict"

const express = require('express');
const router = express.Router();
const userHandler = require('../../BackEnd/Usuario/user_handler');
const recipeHandler = require('../../BackEnd/Receta/recipeHandler');
const User = require("./user");
//console.log(userHandler.getUsers());

router.route('/')
    .post((req, res) => {
        let user = req.body;
        try {
            user = userHandler.createUser(user);
            res.status(201).json(user);
        } catch (e) {
            res.status(400).send(e.errorMessage);
        }
    });

router.route('/:uid').get((req, res) => {
        let uid = req.params.uid;
        let user = userHandler.getUserById(uid);
        if (typeof user != 'undefined') res.status(200).json(user);
        else {
            res.status(404).type('text/plain').send(`Error 404 User with id: ${uid} not found`);
        }
    })
    .put((req, res) => {
        let uid = req.params.uid;
        let userUpdated = req.body;
        if (typeof userHandler.getUserById(uid) != 'undefined') {
            userHandler.updateUser(uid, userUpdated);
            res.status(200).json(userHandler.getUserById(uid));
        } else {
            res.status(404).type('text/plain').send(`User with id: ${uid} doesn't exist`);
        }
    })
    .delete((req, res) => {
        let uid = req.params.uid;
        if (typeof userHandler.getUserById(uid) != 'undefined') {
            userHandler.deleteUser(uid);
            res.status(200).type('text/plain').send(`User with id: ${uid} was successfully deleted`);
        } else {
            res.status(404).type('text/plain').send(`User with id: ${uid} doesn't exist`);
        }
    });

router.route('/:uid/favourites').post((req, res) => {
        let recipeId = req.body;
        let uid = req.params.uid;
        let user = userHandler.getUserById(uid);


        let recipe = recipeHandler.getRecipeById(recipeId.rid);
        if (recipe != undefined) {
            user.User.addItem(recipeId.rid);

        } else {
            res.status(404)
                .type('text/plain')
                .send(`No recipe with ID  ${recipeId.rid} found`);
            return;
        }

        res.status(200).json(user.User._favouriteRecipes);
    })
    .get((req, res) => {
        let uid = req.params.uid;
        let user = userHandler.getUserById(uid);
        let recipes = []

        for (let recipeID of user.User._favouriteRecipes) {
            let recipe = recipeHandler.getRecipeById(recipeID);
            if (recipe != undefined) {
                recipes.push(recipe)
            } else {
                res.status(404)
                    .type('text/plain')
                    .send(`No recipe with ID  ${recipeID} found`);
                return;
            }
        }
        res.status(200).json(recipes);
    });

router.route('/:uid/favourites/:rid').get((req, res) => {
        let uid = req.params.uid;
        let user = userHandler.getUserById(uid);
        let recId = req.params.rid;

        for (let recipeID of user.User._favouriteRecipes) {
            let recipe = recipeHandler.getRecipeById(recipeID);
            if (typeof recipe != 'undefined' && recipeID == recId) {
                res.status(200).json(recipe);
                break;
            } else {
                res.status(404).type('text/plain').send(`Error 404 Recipe with id: ${recId} not found`);
            }
        }
    })
    .delete((req, res) => {
        let uid = req.params.uid;
        let user = userHandler.getUserById(uid);
        let recId = req.params.rid;

        let idToDelete = user.User._favouriteRecipes.find(favRecipe => favRecipe._rid == recId)

        if (idToDelete != undefined) {
            res.type('text/plain; charset=utf-8');
            res.status(200).send(`Recipe ${recId} was deleted :c`);
            user.User.removeItem(recId);
        } else {
            res.status(404).send("Recipe not found, impossible to delete")
        }

    });

module.exports = router;