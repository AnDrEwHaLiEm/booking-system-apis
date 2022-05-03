const express = require('express');
const lineRouter = express.Router();
const line = require("../../BusinessLogic/Line/Line");
lineRouter.post("/new", async (req, res) => {
    try {
        return line.createModel(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});

lineRouter.put("/edit", async (req, res) => {
    try {
        return line.EditModel(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});

lineRouter.delete("/delete/:_ids", async (req, res) => {
    try {
        return line.deleteModelsById(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});

lineRouter.get("/showOne/:_id", async (req, res) => {
    try {
        return line.showOneLine(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});


lineRouter.get("/showMany/:limit", async (req, res) => {
    try {
        return line.ShowManyLine(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});

module.exports = lineRouter;


