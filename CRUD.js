const { MongoClient, ObjectId } = require('mongodb');
const { 
    loginValidator, 
    queryValidator, 
    updateValidator, 
    deleteValidator,
 } = require('./joiValidation');
const uri = 'mongodb+srv://platzi-admin:coco04@curso-platzi.5mxnd.mongodb.net/test'

const getClient = () => {
    try { 
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    return client
    } catch (e) {
        console.error(e)
    }
};

const isConnected = async () => {
    const client = await getClient();
    if (client) {  // valida si existe el cluster
        return client;
    }
    return undefined;
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Db } = require('mongodb');
const { get } = require('mongoose');
const { ObjectID } = require('bson');
app.use(bodyParser.json());

app.post('/newUser', loginValidator, async (req, res) => {
    try { 
        const user = req.body;
        const verifyClient = await isConnected();
        await verifyClient.connect();
        const Db = verifyClient.db("example");
        const collectionUser = await Db.collection("users");
        const result = await collectionUser.insertOne(user);
        verifyClient.close();
        res.json(result);

    } catch(e) { 
    console.error(e);  
    }
});

app.get('/queryUser', queryValidator ,async (req, res) => {
    try {
        const user = req.body;
        const verifyClient = await isConnected();
        await verifyClient.connect();
        const Db = verifyClient.db("example");
        const collectionUser = await Db.collection("users");
        const result = await collectionUser.findOne(user);
        verifyClient.close();
        res.json(result);

    } catch (e) {
        console.error(e);
    }
});

app.put('/updateUser/:userId', updateValidator, async (req, res) => {
    try {
        const user = req.body;
        const { userId }= req.params;
        const verifyClient = await isConnected();
        await verifyClient.connect();
        const Db = verifyClient.db("example");
        const collectionUser = await Db.collection("users");
        const result = await collectionUser.updateOne({ _id: new ObjectId(userId) }, {
            $set: {
                name: user.name,
                age: user.age
            }
        });
        verifyClient.close();
        res.json(result);

    } catch (e) {
        console.error(e);
    }
});

app.delete('/deleteUser/:userId', deleteValidator ,async (req, res) => {
    try {
        const { userId } = req.params;
        const verifyClient = await isConnected();
        await verifyClient.connect();
        const Db = verifyClient.db("example");
        const collectionUser = await Db.collection("users");
        const result = await collectionUser.deleteOne({ _id: new ObjectID(userId)});
        verifyClient.close();
        res.json(result);

    } catch (e) {
        console.error(e);
    }
});

//middleware de validacion, parametros de entrada en la peticion joi => validar que si vengan datos en el objeto
// https://jasonwatmore.com/post/2020/07/22/nodejs-express-api-request-schema-validation-with-joi
// https://www.youtube.com/watch?v=8eg4w8v076w

app.listen(3000, () => {
    console.log('listening on port 3000');
});



