const { MongoClient } = require('mongodb');
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
app.use(bodyParser.json());

app.post('/newUser', async (req, res) => {
    try { 
        const user = req.body;
        const verifyClient = await isConnected();
        await verifyClient.connect();
        const Db = verifyClient.db("example");
        const collectionUser = await Db.collection("users");
        const result = collectionUser.insertOne(user);
        await verifyClient.close();
        verifyClient.close();
        res.json(result);

    } catch(e) { 
    console.error(e); 
    }
});


app.listen(3000, () => {
    console.log('listening on port 3000');
});



