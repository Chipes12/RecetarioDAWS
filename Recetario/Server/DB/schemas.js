"use strict";

const mongoose = require('mongoose');

const schemaRecipe = mongoose.Schema({
    rid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    estimatedTime: {
        type: Number,
        enum: ["Time1","Time2","Time3"],
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    category: {
        type: Number,
        enum: ["type1","type2","type3","type4","type5"],
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    portions: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    preparation: {
        type: String,
        required: true
    }
});

const schemaUser = mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registerDate: {
        type: Date,
    },
    sex: {
        type: String,
        enum: ['H','M']
    },
    status: {
        type: String,
        enum: ['User1','User2'],
        required: true
    },
    favouriteRecipes: {
        type: Array,
    }
});

let Receta = mongoose.model('recipeSch',schemaRecipe);
let User = mongoose.model('userSch',schemaUser);

module.exports = Receta;
module.exports = User;
