const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://platzi-admin:coco04@curso-platzi.5mxnd.mongodb.net/exmaple?retryWrites=true&w=majority";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); 

// registro, login