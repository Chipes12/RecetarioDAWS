"use strict"

const User = require("./user");
const fs = require("fs");
let content = fs.readFileSync("./BackEnd/Usuario/data.json");
const users = JSON.parse(content).map(User.User.createFromObject);


function getUsers() {
    return users;
}

function getUserById(uid) {
    return users.find(user => user.uid == uid);
}

function createUser(user) {
    let p = undefined;
    if (typeof user == "string") {
        p = User.User.createFromJSON(user);
    } else {
        p = User.User.createFromObject(user);
    }
    users.push(p);
    let newUser = JSON.stringify(user)
    fs.writeFileSync("./BackEnd/Usuario/data.json", newUser);
    return p;
}

function updateUser(uid, updatedUser) {
    if (getUserById(uid) != undefined) {
        User.User.cleanObject(updatedUser);
        let index = users.findIndex(user => user._uid == uid);
        if (index > -1) {
            Object.assign(users[index], updateUser);
            let newUser = JSON.stringify(users);
            console.log(users);
            fs.writeFileSync("./BackEnd/Usuario/data.json", newUser);
        }
    }
}

function deleteUser(uid) {
    let index = users.findIndex(user => user._uid == uid);
    if (index > -1) users.splice(index, 1);
    let newUser = JSON.stringify(users)
    fs.writeFileSync("./BackEnd/Usuario/data.json", newUser);
}

exports.createUser = createUser;
exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;