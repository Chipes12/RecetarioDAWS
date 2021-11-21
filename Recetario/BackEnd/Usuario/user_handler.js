"use strict"

const User = require("./user");

const users = [];

function getRecipes() {
    return users;
}

function getUserById(uid) {
    return users.find(user => user.uid == uid);
}

function createUser(user) {
    let p = undefined;
    if (typeof user == "string") {
        p = User.createFromJSON(user);
    } else {
        p = User.createFromObject(user);
    }
    users.push(p);
    // let newRecipes = JSON.stringify(recipe)
    //fs.writeFileSync("./app/Data/products.json" , newProducts);
    return p;
}