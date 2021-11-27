"use strict";

const mongoose = require('mongoose');

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

let User = mongoose.model('userSch',schemaUser);

module.exports = User;
