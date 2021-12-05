"use strict"

const User = require("../../Server/models/users");

function getUsers(req, res) {
    User.find({}).then(user => res.status(200).json(user))
        .catch(err => res.status(400).send(err));
}

function getUserById(uid, res) {
    User.find({
            "_id": uid
        }).then(user => res.status(200).json(user))
        .catch(err => {
            res.status(400).send(err)
        });
}

function getUserByEmail(mail, res) {
    User.find({
            "email": mail
        }).then(user => res.status(200).json(user))
        .catch(err => {
            res.status(400).send(err)
            // return;
        })
    //return users.find(user => user._email == mail);
}

function createUser(req, res) {
    let user = User(req);
    user.save().then(user => {
        res.set('Content-Type', 'text/plain;charset=utf8');
        res.send(`User ${user.name} was created`);
        res.status(200);
    }).catch(err => res.status(400).send('Unable to create: ' + err));
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
}

function deleteUser(req, res) {
    let uid = req.params.uid;
    User.findByIdAndRemove(uid)
        .then(user => {
            res.status(200).send('User deleted successfully');
        }).catch(err => res.status(400).send(`Unable to delete user with id ${uid}: ${err}`));
}

function login(req, res) {
    let email = req.email;
    let password = req.password;
    User.findOne({
            email: `${email}`
        })
        .then(user => {
            let token = user.generateToken(password);
            if (token != undefined) {
                res.status(200);
                res.json({
                    token,
                    idUser: user._id.toString(), role : user.status
                });
            } else {
                res.status(404);
                res.set('Content-Type', 'text/plain; charset=utf-8');
                res.send(`Wrong email or password`);
            }
        })
        .catch(err => {
            res.status(404);
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.send(`Wrong email or password`);
        });
}

exports.createUser = createUser;
exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserByEmail = getUserByEmail;
exports.logIn = login;