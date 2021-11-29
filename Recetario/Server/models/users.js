"use strict";

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const schemaUser = new mongoose.Schema({
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

schemaUser.pre('save', function(next){
    if(this.isNew || this.isModified('password')){
        const document = this;
        bcrypt.hash(document.password, saltRounds, (err, hashedPassword)=>{
            if(err) next(err);
            else document.password = hashedPassword;
            next();
        });
    }
    else next();
});

schemaUser.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same){
        if(err) callback(err);
        else callback(err, same);
    });
}
schemaUser.methods.generateToken = function() {
    let user = this;
    let token = jwt.sign({
        id: user.id.toHexString(),
        status: user.status},
        'claveSecreta',
        {expiresIn: 60*60}).toString();
    return token;
}


let User = mongoose.model('userSch',schemaUser);

module.exports = User;
