const express = require('express');
const employeeRouter = express.Router();
const {employee} = require("../../BusinessLogic/Employee/Employee");

employeeRouter.post("/new", employee.checkEmailAndPhoneAvailabilty, employee.bcryptPassword, async (req, res) => {
    try {
        return employee.createModel(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});

employeeRouter.put("/edit", employee.checkEmailAndPhoneAvailabiltyEdit, employee.bcryptPassword, async (req, res) => {
    try {
        return employee.EditModel(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});

employeeRouter.delete("/delete/:_ids", async (req, res) => {
    try {
        return employee.deleteModelsById(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});

employeeRouter.get("/showOne/:_id", async (req, res) => {
    try {
        return employee.getOne(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});


employeeRouter.get("/showMany/:limit", async (req, res) => {
    try {
        return employee.getMany(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});

module.exports = employeeRouter;


