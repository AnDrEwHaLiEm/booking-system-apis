const ticket = require('../../BusinessLogic/Ticket/Ticket');
const express = require('express');
const ticketRouter = express.Router();

ticketRouter.put('/edit', async (req, res) => {
    try {
        return halls.EditModel(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }

})

ticketRouter.delete('/delete/:_ids', async (req, res) => {
    try {
        return halls.deleteModelsById(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }
})


module.exports = ticketRouter;
