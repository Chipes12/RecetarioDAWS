"use strict"

const express = require('express');
const router = express.Router();
const userHandler = require('../../BackEnd/Usuario/user_handler');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

router.route('/')
    .post((req, res) => {
        userHandler.createUser(req, res);



        /*let user = req.body;
        try {
            user = userHandler.createUser(user);
            res.status(201).json(user);
        } catch (e) {
            res.status(400).send(e.errorMessage);
        }*/
    })
    .get((req, res) => {

        userHandler.getUsers(req, res);

        /*if (req.query.filter == undefined) {
            res.status(200).json(userHandler.getUsers());

        }*/
    });

router.route('/:uid').get((req, res) => {
        let uid = req.params.uid;
        userHandler.getUserById(uid, res);
        /*let uid = req.params.uid;
        let user = userHandler.getUserById(uid);
        if (typeof user != 'undefined') res.status(200).json(user);
        else {
            res.status(404).type('text/plain').send(`Error 404 User with id: ${uid} not found`);
        }*/
    })
    .put((req, res) => {
        userHandler.updateUser(req, res);
        /*let uid = req.params.uid;
        let userUpdated = req.body;
        if (typeof userHandler.getUserById(uid) != 'undefined') {
            userHandler.updateUser(uid, userUpdated);
            res.status(200).json(userHandler.getUserById(uid));
        } else {
            res.status(404).type('text/plain').send(`User with id: ${uid} doesn't exist`);
        }*/
    })
    .delete((req, res) => {
        userHandler.deleteUser(req, res);
        /*let uid = req.params.uid;
        if (typeof userHandler.getUserById(uid) != 'undefined') {
            userHandler.deleteUser(uid);
            res.status(200).type('text/plain').send(`User with id: ${uid} was successfully deleted`);
        } else {
            res.status(404).type('text/plain').send(`User with id: ${uid} doesn't exist`);
        }*/
    });

router.route('/:uid/favourites').post((req, res) => {
        let recipeId = req.body;
        let uid = req.params.uid;
        let user = userHandler.getUserById(uid);


        let recipe = recipeHandler.getRecipeById(recipeId[0].rid);
        if (recipe != undefined) {
            user.addItem(recipeId[0].rid);

        } else {
            res.status(404)
                .type('text/plain')
                .send(`No recipe with ID  ${recipeId[0].rid} found`);
            return;
        }

        res.status(200).json(user._favouriteRecipes);
    })
    .get((req, res) => {
        let uid = req.params.uid;
        let user = userHandler.getUserById(uid);
        let recipes = []


        for (let recipeID of user._favouriteRecipes) {

            let recipe = recipeHandler.getRecipeById(recipeID.rid);
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

        let idToFind = user._favouriteRecipes.find(favRecipe => favRecipe.rid == recId)

        if (idToFind != undefined) {
            let recipe = recipeHandler.getRecipeById(recId);
            res.type('text/plain; charset=utf-8');
            res.status(200).json(recipe);
        } else {
            res.status(404).send(`Error 404 Recipe with id: ${recId} not found`)
        }
    })
    .delete((req, res) => {
        let uid = req.params.uid;
        let user = userHandler.getUserById(uid);
        let recId = req.params.rid;

        let idToDelete = user._favouriteRecipes.find(favRecipe => favRecipe.rid == recId)

        if (idToDelete != undefined) {
            res.type('text/plain; charset=utf-8');
            res.status(200).send(`Recipe ${recId} was deleted :c`);
            user.removeItem(recId);
        } else {
            res.status(404).send("Recipe not found, impossible to delete")
        }

    });


module.exports = router;