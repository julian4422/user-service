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


app.post('/register', async (req, res) => {
    if(/*correo existe*/) {
    //error correo en uso
    } else
    //crear usuario
});


app.post('/login', async (req, res) => {
    if (/*correo existe*/) {
        //autentificar contrasena
    } else
    // error usurio no existe
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});