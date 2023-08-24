//NPM packages
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');

//js files
const auth = require('./auth');
const searchBox = require('./searchBox');
const getMediaList = require('./getMediaList');

//Code.
const app = express();
app.use(cors({
  origin: ['http://localhost:5173','https://filmyradar.netlify.app'] // Replace with your frontend's origin
}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
let port=process.env.PORT
app.listen(8000||port);

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);
client.connect();

auth(app);
searchBox(app);
getMediaList(app);
