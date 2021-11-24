"use strict";

const mongo = require('mongodb').MongoClient;
const env = require('dotenv');
const express = require("express");
const router = require("./Routers/mainRouter");
const app = express();
const port = Number(process.env.PORT);
const cors = require('cors');



app.use(cors());
app.use(express.json());

app.use('/recipebook/', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

//conectar database
app.use(mongo.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;
    console.log('MongoDB Connection Succeeded.');
}));