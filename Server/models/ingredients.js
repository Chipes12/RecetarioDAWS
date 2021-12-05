"use strict"

const mongoose = require('mongoose');
require('dotenv').config({
    path: 'env'
});
mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const schemaIngredient = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

let Ingredient = mongoose.model('ingredienteSch', schemaIngredient, 'ingredients');

module.exports = Ingredient;