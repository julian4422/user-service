const router = require('express').Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
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

router.post("/register", async (req, res) => {
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


module.exports = router;