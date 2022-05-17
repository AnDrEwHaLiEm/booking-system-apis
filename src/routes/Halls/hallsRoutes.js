const halls = require('../../BusinessLogic/Halls/Halls');
const express = require('express');
const hallsRouter = express.Router();

hallsRouter.post('/new', async (req, res) => {
    try {
        return halls.createModel(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }
})

hallsRouter.put('/edit', async (req, res) => {
    try {
        return halls.EditModel(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }

})

hallsRouter.delete('/delete/:_ids', async (req, res) => {
    try {
        return halls.deleteModelsById(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }
})

hallsRouter.get('/showOne/:_id', async (req, res) => {
    try {
        return halls.getOneHalls(req, res, true);
    } catch (error) {
        return res.sendStatus(400);
    }
})


hallsRouter.get('/showMany/:limit', async (req, res) => {
    try {
        return halls.getAllHalls(req, res, true)
    } catch (error) {
        return res.sendStatus(400);
    }
})


module.exports = hallsRouter;
