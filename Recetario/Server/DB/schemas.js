"use strict";

const mongoose = require('mongoose');
const schema = mongoose.Schema;

schema = {
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
        type: String,
        enum: [1,2,3,4,5],
        required: true
    },
    rating: {
        type: Number,
        enum: [0,1,2,3,4,5]
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
}

module.exports = recipeSchema;