const express = require('express');
const authintication = require('../../authintication/authintication');
const authRouter = express.Router();
const authinticationUser = require("../../authintication/authinticationUsers");
authRouter.post('/loginEmployee', async (req, res) => {
    try {
        return authintication.logIn(req, res);
    } catch (error) {
        return res.status(400).send(error);
    }
})

authRouter.post('/loginUser', async (req, res) => {
    try {
        return authinticationUser.logIn(req, res);
    } catch (error) {
        return res.status(400).send(error);
    }
})

authRouter.post('/authinticate', authintication.authinticate, async (req, res, next) => {
    try {
        return res.send(req.body.decodedToken)
    } catch (error) {
        return res.status(400).send(error);
    }
})

module.exports =  authRouter;


