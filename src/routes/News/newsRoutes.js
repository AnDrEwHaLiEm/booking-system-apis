const news = require('../../BusinessLogic/News/News');
const express = require('express');
const newsRouter = express.Router();
const newsRouterClient = express.Router();

newsRouter.post('/new', news.addNewsCreator, async (req, res) => {
    try {
        if (req.body.postDate)
            delete req.body.postDate;
        return news.createModel(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }
})

newsRouter.put('/edit', news.addNewsEditor, async (req, res) => {
    try {
        if (req.body.postDate)
            delete req.body.postedDate;
        return news.EditModel(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }

})

newsRouter.delete('/delete/:_ids', async (req, res) => {
    try {
        return news.deleteModelsById(req, res);
    } catch (error) {
        return res.sendStatus(400);;
    }
})

newsRouter.get('/showOne/:_id', async (req, res) => {
    try {
        return news.getOneNews(req, res, true);
    } catch (error) {
        return res.sendStatus(400);
    }
})


newsRouter.get('/showMany/:limit', async (req, res) => {
    try {
        return news.getAllNews(req, res, true)
    } catch (error) {
        return res.sendStatus(400);
    }
})

newsRouterClient.get('/client/showOne/:_id', async (req, res) => {
    try {
        return news.getOneNews(req, res, false);
    } catch (error) {
        return res.sendStatus(400);
    }
})

newsRouterClient.get('/client/showMany/:limit', async (req, res) => {
    try {
        return news.getAllNews(req, res, false);
    } catch (error) {
        return res.sendStatus(400);
    }
})

module.exports = { newsRouter, newsRouterClient };
