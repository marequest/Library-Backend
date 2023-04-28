const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: 'http://127.0.0.1:8000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.post('/register', (req, res) => {

    const obj = {
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10),
        admin: req.body.admin,
        email: req.body.email,
    };

    Users.create(obj).then( rows => {      
        const usr = {
            userId: rows.id,
            user: rows.name
        };
        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        res.json({ token: token });
    }).catch( err => {
      res.status(500).json(err)} );
});

app.post('/login', (req, res) => {

    Users.findOne({ where: { email: req.body.name } })
        .then( usr => {
            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.name
                };
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => {
          res.status(500).json({msg: "No user found."}) 
        });
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});