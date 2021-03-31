// require('dotenv').config();

// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

// app.use(bodyParser.json());   

// app.listen(3000, () => {
//     console.log('listening on port 3000');
// })


const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://platzi-admin:coco04@curso-platzi.5mxnd.mongodb.net/exmaple?retryWrites=true&w=majority";
// client.connect( async (err) => {
//     if (err) process.exit();
//     console.log('conecto');
//     const collection = await client.db("example").collection("users");
//     const users = await collection.find({
//         user: 'julian'
//     }).toArray();
//     console.log(users);
//     // perform actions on the collection object
//     client.close();
// })

const getClient = () => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        return client;
    } catch (e) {
        throw new Error('connection error');
    }
}

const isConnected = async () => {
    try {
        const client = await getClient();
        if (client) {
            return client;
        }
        return undefined;
    } catch (error) {
        throw new Error(error.message);
    }
}

var express = require('express')
var app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());   


// respond with "hello world" when a GET request is made to the homepage
app.get('/hola', function (req, res) {
    res.send('hello world')
})

// app.post('/createUser', async (req, res) => {
//     const user = req.body;

//     await client.connect();
//     const collectionUser = await client.db("example").collection("users");
//     // const users = await collection.find({
//     //     name: 'julian'
//     // }).toArray();

//     const result = await collectionUser.insertOne(user);
//     await client.close();

//     res.status(200).json(result.ops);
    
// })

app.get('/getUser/:id', async (req, res) => {
    const { id } = req.params;
console.log(id);
    await client.connect();
    const collectionUser  = await client.db("example").collection("users");
    const result = await collectionUser.findOne({ "_id": new ObjectId(id) })
    await client.close();

    res.status(200).json(result);

});

app.post('/busqueLoQueQuiera', async (req, res) => {
    const user = req.body;

    const verifyClient = await isConnected(); // traer sistema de conexion con el closter
    await verifyClient.connect(); // se genera la conexion con el closter
    const database = verifyClient.db('example') // verificacion y conexion con la base de datos de mongo db que esta dentro del closter
    const collectionUser = await database.collection("users");// conexion con la colexion de usuarios que esta dentro de la base de datos
    const result = await collectionUser.findOne(user);// fenera la operacion dentro de la coleccion de ususarios que en este caso es buscar ususario
    verifyClient.close(); // cerrar la conexxion con closter y base de datos
    

    res.status(200).json(result);

});


app.listen(3000, () => {
    console.log('listening on port 3000');
}) 