"use strict";

const mongoose = require('mongoose');
require('dotenv').config({path: 'env'});
mongoose.connect(process.env.URI,{ useNewUrlParser: true, useUnifiedTopology: true });


const schemaRecipe = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    portions: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ["type1","type2","type3","type4","type5"],
        required: true
    },
    estimatedTime: {
        type: String,
        enum: ["Time1","Time2","Time3"],
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    preparation: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    } 
});

let Receta = mongoose.model('recipeSch',schemaRecipe,'recipes');

module.exports = Receta;
