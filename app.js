// require('dotenv').config();

// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

// app.use(bodyParser.json());   

// app.listen(3000, () => {
//     console.log('listening on port 3000');
// })


var express = require('express')
var app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());   


// respond with "hello world" when a GET request is made to the homepage
app.get('/hola', function (req, res) {
    res.send('hello world')
})

app.post('/createUser', function (req, res) {
    const user = req.body;

    

})

app.listen(3000, () => {
    console.log('listening on port 3000');
}) 