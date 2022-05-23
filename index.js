require('dotenv').config();

const express = require("express");
const cors = require("cors");
const formidableMiddleware = require("express-formidable");

const app = express();
app.use(cors());
app.use(formidableMiddleware());

app.listen(parseInt(process.env.PORT_NUMBER), () => {
    console.log(`Server running on port: ${process.env.PORT_NUMBER}`);
});