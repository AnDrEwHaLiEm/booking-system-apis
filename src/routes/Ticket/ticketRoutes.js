const ticket = require('../../BusinessLogic/Ticket/Ticket');
const express = require('express');
const ticketRouter = express.Router();


ticketRouter.post('/new', ticket.deleteExpair, ticket.makeChairUnAvailable, async (req, res) => {
    try {
        return ticket.createModel(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }
})


ticketRouter.put('/edit', async (req, res) => {
    try {
        return ticket.payACost(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }

})


ticketRouter.get('/showOne/:_id', ticket.deleteExpair, async (req, res) => {
    try {

        return ticket.getOne(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }

})





module.exports = ticketRouter;
