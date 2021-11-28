"use strict"

//const User = require("./user");
const User = require("../../Server/models/users");
//const fs = require("fs");
//let content = fs.readFileSync("./BackEnd/Usuario/data.json");
//const users = JSON.parse(content).map(User.User.createFromObject);


function getUsers(req, res) {
    //return users;
    User.find({}).then(user => res.status(200).json(user))
        .catch(err => res.status(400).send(err));
}

function getUserById(uid, res) {
    User.find({
            "_id": uid
        }).then(user => res.status(200).json(user))
        .catch(err => {
            res.status(400).send(err)
            // return;
        })
    //return users.find(user => user._uid == uid);
}

function createUser(req, res) {
    let user = User(req.body);
    user.save().then(user => {
        res.set('Content-Type', 'text/plain;charset=utf8');
        res.send(`User ${user.name} was created`);
        res.status(200);
    }).catch(err => res.status(400).send('Unable to create: ' + err));


    /*let p = undefined;
    if (typeof user == "string") {
        p = User.User.createFromJSON(user);
    } else {
        p = User.User.createFromObject(user);
    }
    users.push(p);
    let newUser = JSON.stringify(users)
    fs.writeFileSync("./BackEnd/Usuario/data.json", newUser);
    return p;*/
}

function updateUser(req, res) {
    let uid = req.params.uid;
    let userUpdated = req.body;
    //clean object
    for (let property in userUpdated) {
        if (['uid', 'name', 'lastName', 'email', 'password', 'registerDate', 'sex', 'status', 'favouriteRecipes'].includes(property)) continue;
        delete userUpdated[property];
    }
    //find and update
    User.findOneAndReplace({
            "_id": uid
        }, userUpdated)
        .then(user => {
            user.save();
            res.status(200).send('Updated successfully')
        })
        .catch(err => res.status(400).send(`Unable to update user with id ${uid}: ${err}`));



    /*if (getUserById(uid) != undefined) {
        User.User.cleanObject(updatedUser);
        let index = users.findIndex(user => user._uid == uid);
        if (index > -1) {
            Object.assign(users[index], updatedUser);
            users[index]._status = typeof users[index]._status == "number" ? User.userTypes[`User${users[index]['_status']}`] : users[index]._status;
            let newUser = JSON.stringify(users);
            fs.writeFileSync("./BackEnd/Usuario/data.json", newUser);
        }
    }*/
}

function deleteUser(req, res) {
    let uid = req.params.uid;
    User.findByIdAndRemove(uid)
        .then(user => {
            res.status(200).send('User deleted successfully');
        }).catch(err => res.status(400).send(`Unable to delete user with id ${uid}: ${err}`));

    /*let index = users.findIndex(user => user._uid == uid);
    if (index > -1) users.splice(index, 1);
    let newUser = JSON.stringify(users)
    fs.writeFileSync("./BackEnd/Usuario/data.json", newUser);*/
}

exports.createUser = createUser;
exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;