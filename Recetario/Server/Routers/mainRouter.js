"use strict";

const express = require("express");
const router = express.Router();
const recipeRouter = require("./recipeRoutes");
const userRouter = require("./userRouter")

router.use('/recipes', recipeRouter);
router.use("/user", userRouter);

module.exports = router;