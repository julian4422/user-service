const { MongoClient, ObjectId } = require('mongodb');
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
    if (client) {
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

app.post('/newUser', async (req, res) => {
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

app.get('/queryUser', async (req, res) => {
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

app.put('/updateUser/:userId', async (req, res) => {
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

app.delete('/deleteUser/:userId', async (req, res) => {
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




app.listen(3000, () => {
    console.log('listening on port 3000');
});



