"use strict"

const express = require('express');
const router = express.Router();
const userHandler = require('../../BackEnd/Usuario/user_handler');
const User = require('../models/users');
const Receta = require('../models/recipes');
const tokenUtils = require('../models/tokenUtils');

router.route('/')
    .post((req, res) => {
        console.log(req);
        userHandler.createUser(req.body, res);
    })
    .get((req, res) => {
        userHandler.getUsers(req, res);
    });

router.route('/:uid').get(tokenUtils.verifyToken, (req, res) => {
        userHandler.getUserById(req.params.uid, res);
    })
    .put((req, res) => {
        userHandler.updateUser(req, res);
    })
    .delete((req, res) => {
        userHandler.deleteUser(req, res);
    });

router.route('/:uid/favourites').put(tokenUtils.verifyToken, async (req, res) => {
    let recipeId = req.body;
    let uid = req.params.uid;
    let user = await User.findById(uid);
    if (user) {
        for (let recipes of recipeId) {
            let recipe = await Receta.findById(
                recipes.rid
            );
            if (recipe) {
                if (!user.favouriteRecipes.includes(recipe._id)) {
                    user.favouriteRecipes.push(recipe._id)
                    await User.findByIdAndUpdate(uid, {
                        favouriteRecipes: user.favouriteRecipes
                     });
                }
            } else {
                res.status(404).type('text/plain').send(`No recipe with ID  ${recipes.rid} found`);
                return;
            }
        }
        res.status(200).json(user.favouriteRecipes);
    } else {
        res.status(404).type('text/plain').send(`No user with ID  ${uid} found`);
    }
})
 .get(tokenUtils.verifyToken, async (req, res) => {
    let uid = req.params.uid;
    let user = await User.findById(uid);
    let recipes = []
    if (user) {
        for (let recipeID of user.favouriteRecipes) {
            let recipe = await Receta.findById(recipeID);
            if (recipe) {
                recipes.push(recipe)
            }
        }
        res.status(200).json(recipes);
    } else {
        res.status(404).type('text/plain').send(`No user with ID  ${uid} found`);
    }
});

router.route('/:uid/favourites/:rid').get(tokenUtils.verifyToken, async (req, res) => {
    let uid = req.params.uid;
    let user = await User.findById(uid);
    if (user) {
        let recId = req.params.rid;
        let idToFind = user.favouriteRecipes.find(favRecipe => favRecipe.toString() === recId);
        if (idToFind) {
            let recipe = await Receta.findById(recId);
            res.status(200).json(recipe);
        } else {
            res.status(404).send(`Error 404 Recipe with id: ${recId} not found`);
        }
    } else {
        res.status(404).type('text/plain').send(`No user with ID  ${uid} found`);
    }
})
.delete(tokenUtils.verifyToken, async (req, res) => {
    let uid = req.params.uid;
    let user = await User.findById(uid);
    let recId = req.params.rid;
    if (user) {
        let index = user.favouriteRecipes.findIndex(p => p.toString() === recId);
        if (index !== -1) {
            user.favouriteRecipes.splice(index, 1);
            await User.findByIdAndUpdate(uid, {favouriteRecipes: user.favouriteRecipes});
                res.status(200).send(`Recipe ${recId} was deleted :c`);
        } else {
            res.status(404).send("Recipe not found, impossible to delete")
        }
    } else {
        res.status(404).type('text/plain').send(`No user with ID  ${uid} found`);
    }
});

router.route('/login').post((req, res) => {
    userHandler.logIn(req.body, res);
});

module.exports = router;