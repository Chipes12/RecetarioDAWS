"use strict";

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let privateKey = process.env.TOKEN_KEY;

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

schemaUser.pre('save', function(next) {
    let user = this;
    user.password = bcrypt.hashSync(user.password, 10);
    next();
})

userSchema.methods.generateToken = function(password) {
    let user = this;
    let payload = {_id: user._id, role: user.role};
    let options = { expiresIn: 60 * 60 }
    if (bcrypt.compareSync(password, user.password)) {
        try {
            user.token = jwt.sign(payload, privateKey, options);
            return user.token;
        } catch (err) {
            console.log(err);
        }
    }
}

let User = mongoose.model('userSch',schemaUser);

module.exports = User;
