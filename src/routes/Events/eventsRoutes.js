const event = require('../../BusinessLogic/Events/Events');
const express = require('express');
const eventsRouter = express.Router();
const eventsRouterPartner = express.Router();
const uploadEventPoster = require('../../uploadImages/EventPoster/multerSetupEventPoster');

eventsRouterPartner.post('/new', uploadEventPoster.single('posterImage'), event.getAvailableSeat, async (req, res) => {
    try {
        req.body.poster = req.file.filename;
        req.body.Cost = req.body.Cost.split(",");
        if (req.body.startDate <= Date.now() + (24 * 60 * 60 * 1000))
            return res.status(400).send("End date must be After 24 hour");
        return event.createModel(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }
})

eventsRouter.get('/showOne/:_id', async (req, res) => {
    try {
        return event.showOne(req, res, true);
    } catch (error) {
        return res.sendStatus(400);
    }
})


eventsRouter.get('/showMany/:limit', async (req, res) => {
    try {
        return event.showMany(req, res, true)
    } catch (error) {
        return res.sendStatus(400);
    }
})


eventsRouter.get('/showMany/:limit/:department', async (req, res) => {
    try {
        return event.showManyByDepartment(req, res, true)
    } catch (error) {
        return res.sendStatus(400);
    }
})



module.exports = { eventsRouter, eventsRouterPartner };
