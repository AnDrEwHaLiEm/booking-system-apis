const event = require('../../BusinessLogic/Events/Events');
const express = require('express');
const eventsRouter = express.Router();

eventsRouter.post('/new', async (req, res) => {
    try {
        return event.createModel(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }
})

eventsRouter.put('/edit', async (req, res) => {
    try {
        return event.EditModel(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }

})

eventsRouter.delete('/delete/:_ids', async (req, res) => {
    try {
        return event.deleteModelsById(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }
})

eventsRouter.get('/showOne/:_id', async (req, res) => {
    try {
        //return event.getOneevent(req, res, true);
    } catch (error) {
        return res.sendStatus(400);
    }
})


eventsRouter.get('/showMany/:limit', async (req, res) => {
    try {
        //return event.getAllevent(req, res, true)
    } catch (error) {
        return res.sendStatus(400);
    }
})


module.exports = eventsRouter;
