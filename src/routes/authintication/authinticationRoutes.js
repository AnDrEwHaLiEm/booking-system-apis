const express = require('express');
const authintication = require('../../authintication/authintication');
const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    try {
        return authintication.logIn(req, res);
    } catch (error) {
        return res.status(400).send({ error });
    }
})


authRouter.post('/authinticate', authintication.authinticate, async (req, res, next) => {
    try {
        return res.send(req.body.decodedToken)
    } catch (error) {
        return res.status(400).send({ error });
    }
})

module.exports =  authRouter;


