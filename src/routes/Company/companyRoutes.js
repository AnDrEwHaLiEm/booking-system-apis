const express = require('express');
const company = require('../../BusinessLogic/Company/Company');
const companyRouter = express.Router();

companyRouter.post("/new", async (req, res) => {
    try {
        return company.createModel(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});

companyRouter.put("/edit", async (req, res) => {
    try {
        return company.EditModel(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});

companyRouter.delete("/delete/:_ids", async (req, res) => {
    try {
        return company.deleteModelsById(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});

companyRouter.get("/showOne/:_id", async (req, res) => {
    try {
        return company.getOne(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});


companyRouter.get("/showMany/:limit", async (req, res) => {
    try {
        return company.getMany(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});

module.exports = companyRouter;


