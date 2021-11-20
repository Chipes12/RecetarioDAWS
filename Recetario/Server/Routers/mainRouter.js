"use strict";

const express = require("express");
const router = express.Router();
const recipeRouter  = require("./recipeRoutes");

router.use('/recipes', recipeRouter);

module.exports = router;