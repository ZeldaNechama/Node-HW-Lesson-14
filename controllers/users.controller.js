const userService = require('../../services/users.services');
const { Router } = require('express');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = Router();


//return password
app.post('/signUp', async (req, res) => {

    try {
        const { userId, userName, userPhone, userEmail } = req.body;
        const _user = await userService.createUser(userId, userName, userPhone, userEmail)
        res.status(200).send(' user signed up sucessfully!');

    } catch (error) {
        res.status(500).send('something went wrong');
    }

});

app.post('/login', async (req, res) => {
    try {
        const { userId, userName, password, type } = req.body;
        const token = await userService.login(userId, userName, password, type);
        res.send('token: ' + token.toString());
    } catch (error) {
        res.status(500).send(error.message);

    }

});



module.exports = app;