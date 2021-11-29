"use strict"

const express = require('express');
const router = express.Router();
const userHandler = require('../../BackEnd/Usuario/user_handler');
const Receta = require("../../Server/models/recipes");
const User = require("../../Server/models/users");
User.find({}, res => console.log(res))

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

router.route('/:uid/favourites').put(async (req, res) => {
        let recipeId = req.body;
        let uid = req.params.uid;
        let user = await User.findById(
            uid
        )

        if (user) {
            for (let recipes of recipeId) {
                let recipe = await Receta.findById(
                    recipes.rid
                )


                if (recipe) {

                    //user.addItem(recipes.rid);
                    if (!user.favouriteRecipes.includes(recipe._id)) {
                        user.favouriteRecipes.push(recipe._id)
                        await User.findByIdAndUpdate(uid, {
                            favouriteRecipes: user.favouriteRecipes
                        })
                    }

                } else {
                    res.status(404)
                        .type('text/plain')
                        .send(`No recipe with ID  ${recipes.rid} found`);
                    return;
                }
            }
            res.status(200).json(user.favouriteRecipes);

        } else {
            res.status(404).type('text/plain')
                .send(`No user with ID  ${uid} found`);
        }

        /*let recipe = recipeHandler.getRecipeById(recipeId[0].rid);
        let recipe = JSON.parse(Receta.find({
            "_rid": recipeId[0].rid
        }))

        if (recipe != undefined) {
            user.addItem(recipeId[0].rid);

        } else {
            res.status(404)
                .type('text/plain')
                .send(`No recipe with ID  ${recipeId[0].rid} found`);
            return;
        }*/
    })
    .get(async (req, res) => {
        let uid = req.params.uid;
        let user = await User.findById(
            uid
        )
        let recipes = []
        let notFoundRecipes = 0

        if (user) {
            for (let recipeID of user.favouriteRecipes) {

                let recipe = await Receta.findById(
                    recipeID
                )
                if (recipe) {
                    recipes.push(recipe)
                } else {
                    notFoundRecipes++;
                }
            }
            res.status(200).json({
                recipes,
                notFoundRecipes
            });

        } else {
            res.status(404).type('text/plain')
                .send(`No user with ID  ${uid} found`);
        }
    });

router.route('/:uid/favourites/:rid').get(async (req, res) => {
        let uid = req.params.uid;
        let user = await User.findById(
            uid
        )
        if (user) {
            let recId = req.params.rid;


            let idToFind = user.favouriteRecipes.find(favRecipe => favRecipe.toString() === recId)



            if (idToFind) {
                let recipe = await Receta.findById(
                    recId
                )

                res.status(200).json(recipe);
            } else {
                res.status(404).send(`Error 404 Recipe with id: ${recId} not found`)
            }
        } else {
            res.status(404).type('text/plain')
                .send(`No user with ID  ${uid} found`);
        }
    })
    .delete(async (req, res) => {
        let uid = req.params.uid;
        let user = await User.findById(
            uid
        )
        let recId = req.params.rid;
        console.log(user.favouriteRecipes)


        let index = user.favouriteRecipes.findIndex(p => p.toString() === recId);

        if (index !== -1) {
            user.favouriteRecipes.splice(index, 1);
            await User.findByIdAndUpdate(uid, {
                favouriteRecipes: user.favouriteRecipes
            });
            res.status(200).send(`Recipe ${recId} was deleted :c`);

        } else {
            res.status(404).send("Recipe not found, impossible to delete")
        }
    });


module.exports = router;