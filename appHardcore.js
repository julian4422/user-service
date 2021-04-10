const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://platzi-admin:coco04@curso-platzi.5mxnd.mongodb.net/exmaple?retryWrites=true&w=majority";

// registro, login
const getClient = () => { // forma sistema de conexion al cluster
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // parsea url y la trae en una sola linea
        return client;
    } catch (e) {
        throw new Error('connection error'); // es una clase
    }
}

const isConnected = async () => {
    try {
        const client = await getClient();
        if (client) {
            return client;
        }
        return undefined;// si no existe la conexion
    } catch (error) {
        throw new Error(error.message);
    }
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/Register', async (req, res) => {
    const user = req.body;

    const verifyClient = await isConnected();
    await verifyClient.connect();
    const database = verifyClient.db('example')
    const collectionUser = await database.collection("users");
    const result = await collectionUser.insertOne(user);
    verifyClient.close();
    res.json(result);
});

/*app.post('/Login', async (req, res) => {
    const user = req.body;

    const verifyClient = await isConnected();
    await verifyClient.connect();
    const database = verifyClient.db('example')
    const collectionUser = await database.collection("users");
    const result = await collectionUser.insertOne(user);
    verifyClient.close();
    res.json(result);
});*/

app.post('/login', function (req, res) {
    var username = res.body.username;
    var password = req.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/home');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});