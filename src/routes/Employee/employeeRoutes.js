const express = require('express');
const employeeRouter = express.Router();
const { employee } = require("../../BusinessLogic/Employee/Employee");
const uploadEmployeeAvatar = require('../../uploadImages/EmployeeAvatar/multerSetupEmploeyeeAvatar');

employeeRouter.post("/new", uploadEmployeeAvatar.single('avatarImage'), employee.checkEmailAndPhoneAvailabilty, employee.bcryptPassword, async (req, res) => {
    try {
        req.body.avatar = req.file.filename;
        return employee.createModel(req, res);
    } catch (error) {
        return res.status(400).send(error);
    }
});

employeeRouter.put("/edit", uploadEmployeeAvatar.single('avatarImage') ,employee.checkEmailAndPhoneAvailabiltyEdit, employee.bcryptPassword, async (req, res) => {
    try {
        req.body.avatar = req.file.filename;
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


