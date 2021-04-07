const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://platzi-admin:coco04@curso-platzi.5mxnd.mongodb.net/exmaple?retryWrites=true&w=majority";

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
        return undefined;
    } catch (error) {
        throw new Error(error.message);
    }
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

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

//CRUD

// create
app.post('/newUser', async (req, res) => {
    const user = req.body;

    const verifyClient = await isConnected(); 
    await verifyClient.connect();
    const database = verifyClient.db('example')
    const collectionUser = await database.collection("users");
    const result = await collectionUser.insertOne(user);
    verifyClient.close(); 
    res.json(result);
});
//read
app.get('/getUser', async (req, res) => {
    const user = req.body;

    const verifyClient = await isConnected();
    await verifyClient.connect();
    const database = verifyClient.db('example')
    const collectionUser = await database.collection("users");
    const result = await collectionUser.findOne(user);
    verifyClient.close();
    res.json(result);
});
//update
app.put('/updateUser/:userId', async (req, res) => {
    try {
        const user = req.body;
        const userId = req.params.userId;
        const verifyClient = await isConnected();
        await verifyClient.connect();
        const database = verifyClient.db('example')
        const collectionUser = await database.collection("users");
        const result = await collectionUser.updateOne({ _id: new ObjectId(userId) }, {
           $set: {
                name: user.name
           }
        });
        verifyClient.close();
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
//delete
app.delete('/deleteUser/:userId', async (req, res) => {
    try {
        const user = req.body;
        const userId = req.params.userId;
        const verifyClient = await isConnected();
        await verifyClient.connect();
        const database = verifyClient.db('example')
        const collectionUser = await database.collection("users");
        const result = await collectionUser.deleteOne({ _id: new ObjectId(userId) });
        verifyClient.close();
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});