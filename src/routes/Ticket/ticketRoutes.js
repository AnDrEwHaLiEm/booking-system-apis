const ticket = require('../../BusinessLogic/Ticket/Ticket');
const express = require('express');
const ticketRouter = express.Router();


ticketRouter.post('/new', async (req, res) => {
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

ticketRouter.delete('/delete/:_ids', async (req, res) => {
    try {
        return ticket.deleteExpair(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }
})


module.exports = ticketRouter;
