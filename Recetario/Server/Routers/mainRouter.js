"use strict";

const express = require("express");
const router = express.Router();
const recipeRouter = require("./recipeRoutes");
const userRouter = require("./userRouter");
const ingredientRouter = require("./ingredientRouter");
const path = require('path');

router.use('/recipes', recipeRouter);
router.use('/user', userRouter);
router.use('/ingredients', ingredientRouter);

router.use(express.static(path.join(__dirname,'../../FrontEnd/views/'))); //to use css
router.use(express.static(path.join(__dirname,'../../FrontEnd/views/admin'))); //to use css


router.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'../../FrontEnd/views/home.html'));
});

router.get('/home',(req,res) => {
    res.sendFile(path.join(__dirname,'../../FrontEnd/views/home.html'));
});

router.get('/favoritos',(req,res) => {
    res.sendFile(path.join(__dirname,'../../FrontEnd/views/favoritos.html'));
});

router.get('/receta',(req,res) => {
    res.sendFile(path.join(__dirname,'../../FrontEnd/views/recetas.html'));
});

router.get('/new-recipe',(req,res) => {
    res.sendFile(path.join(__dirname,'../../FrontEnd/views/admin/nueva_receta.html'));
});

router.get('/edit-recipe',(req,res) => {
    res.sendFile(path.join(__dirname,'../../FrontEnd/views/admin/editar_receta.html'));
});

module.exports = router;