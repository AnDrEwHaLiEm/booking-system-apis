const express = require('express');
const train = require('../../BusinessLogic/Train/Train');
const trainRouter = express.Router();


trainRouter.post('/new', async (req, res) => {
    try {
        return train.createModel(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }
})

trainRouter.put('/edit', async (req, res) => {
    try {
        return train.EditModel(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }

})

trainRouter.delete('/delete/:_ids', async (req, res) => {
    try {
        return train.deleteModelsById(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }
})

trainRouter.get('/showOne/:_id', async (req, res) => {
    try {
        return train.getOneModelById(req, res, true);
    } catch (error) {
        return res.sendStatus(400);
    }
})


trainRouter.get('/showMany/:limit', async (req, res) => {
    try {
        return train.showAllTrain(req, res, true)
    } catch (error) {
        return res.sendStatus(400);
    }
})


module.exports = trainRouter;
