"use strict"

const express = require('express');
const router = express.Router();
const userHandler = require('../../BackEnd/Usuario/user_handler');

router.route('/')
    .post((req, res) => {
        let user = req.body;
        try {
            user = userHandler.createUser(user);
            res.status(201).json(user);
        } catch (e) {
            res.status(400).send(e.errorMessage);
        }
    });

router.route('/:uid').get((req, res) => {
        let uid = req.params.uid;
        let user = userHandler.getUserById(uid);
        if (typeof user != 'undefined') res.status(200).json(user);
        else {
            res.status(404).type('text/plain').send(`Error 404 User with id: ${uid} not found`);
        }
    })
    .put((req, res) => {
        let uid = req.params.uid;
        let userUpdated = req.body;
        if (typeof userHandler.getUserById(uid) != 'undefined') {
            userHandler.updateUser(uid, userUpdated);
            res.status(200).json(userHandler.getUserById(uid));
        } else {
            res.status(404).type('text/plain').send(`User with id: ${uid} doesn't exist`);
        }
    })
    .delete((req, res) => {
        let uid = req.params.uid;
        if (typeof userHandler.getUserById(uid) != 'undefined') {
            userHandler.deleteUser(uid);
            res.status(200).type('text/plain').send(`User with id: ${uid} was successfully deleted`);
        } else {
            res.status(404).type('text/plain').send(`User with id: ${uid} doesn't exist`);
        }
    })