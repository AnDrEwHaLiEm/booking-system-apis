const event = require('../../BusinessLogic/Events/Events');
const express = require('express');
const eventsRouter = express.Router();

eventsRouter.post('/new', event.postedBy, event.getAvailableSeat, async (req, res) => {
    try {
        if (req.body.postDate)
            delete req.body.postDate;
        if (req.body.endDate <= Date.now() + (24 * 60 * 60 * 1000))
            return res.sendStatus(400);
        return event.createModel(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }
})

eventsRouter.put('/edit', async (req, res) => {
    try {
        if (req.body.postDate)
            delete req.body.postDate;
        if (req.body.endDate <= Date.now())
            return res.sendStatus(400);
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



module.exports = eventsRouter;
