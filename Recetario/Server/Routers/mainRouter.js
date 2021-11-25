"use strict";

const express = require("express");
const router = express.Router();
const recipeRouter = require("./recipeRoutes");
const userRouter = require("./userRouter");
const ingredientRouter = require("./ingredientRouter");

router.use('/recipes', recipeRouter);
router.use('/user', userRouter);
router.use('/ingredients', ingredientRouter);

module.exports = router;