"use strict";

const express = require("express");
const router = require("./Routers/mainRouter");
const app = express();
const port = 8080;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/recipebook/', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});