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
const mongoose = require('mongoose');

app.use(bodyParser.json());

/*app.post('/Register', async (req, res) => {
    const user = req.body;

    const verifyClient = await isConnected();
    await verifyClient.connect();
    const database = verifyClient.db('example')
    const collectionUser = await database.collection("users");
    const result = await collectionUser.insertOne(user);
    verifyClient.close();
    res.json(result);
});*/

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

app.post("/login", async (req, res) => {
    try {
        //Checking if User Exists in dB
        const userExists = await User.findOne({ email: req.body.email });
        //If no User Present send Error
        if (!userExists) {
            return res.status(400).send("Either Email or Password is wrong");
        }

        //Compare paasword using bcrypts inbuilt function
        const compare = bcrypt.compareSync(req.body.password, userExists.password);

        //If password is wrong send Error
        if (!compare) {
            return res.status(400).send("Either Email or Password is wrong");
        }

        // Create a JWT token
        const token = jwt.sign({ _id: userExists._id }, "thisisasecretcode");
        res.header('auth-token', token);

        res.json({
            message: "Login successful",
            token: token
        });

    }
    catch (error) {
        return res.status(400).send(error);
    }

});

app.post("/register", async (req, res) => {
    try {
        //Check if Email Already Exists
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) return res.status(400).send("Email already exists");

        //Check if Username Already Exists
        const usernameExists = await User.findOne({ username: req.body.username });
        if (usernameExists) return res.status(400).send("Username already exists");

        //Hash the password using bcrypt
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        //Create a user object with all the details
        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: hash
        });

        //Create thhe User
        User.create(newUser, function (err, user) {
            if (err) {
                res.status(400).send(err);
            }
            else {
                res.send(user);
            }
        });

    }
    catch (error) {
        res.send(error);
    }

});


app.listen(3000, () => {
    console.log('listening on port 3000');
});