"use strict";

const mongoose = require('mongoose');
mongoose.connect(process.env.URI,{ useNewUrlParser: true, useUnifiedTopology: true });


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

let Receta = mongoose.model('recipeSch',schemaRecipe,'recipes');

module.exports = Receta;
