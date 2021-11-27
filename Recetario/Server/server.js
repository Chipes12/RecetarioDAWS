"use strict";

const cors = require('cors');
const dotenv = require('dotenv').config();
const express = require("express");
const router = require("./Routers/mainRouter");
const app = express();
// const port = process.env.PORT;
// const port = 8080;

app.use(cors());
app.use(express.json());

app.set('port', process.env.PORT || 3000);
app.use('/recipebook/', router);
app.listen(app.get('port'),process.env.HOST)

// app.listen(app.get('port')), () => {
//     console.log(`Example app listening on port ${app.get('port')}`);
//  });

