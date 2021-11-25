"use strict";

const mongo = require('mongodb').MongoClient;
const dotenv = require('dotenv').config();
const express = require("express");
const router = require("./Routers/mainRouter");
const app = express();
// const port = process.env.PORT;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.set('port', process.env.PORT || 3000);
app.use('/recipebook/', router);

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });

//conect database
mongo.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;
    console.log('MongoDB Connection Succeeded.');
});