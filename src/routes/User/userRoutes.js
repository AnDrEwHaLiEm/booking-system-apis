const user = require("../../BusinessLogic/User/User");
const express = require('express');
const userRouter = express.Router();
const userRoterGuest = express.Router()
const uploadUserAvatar = require('../../uploadImages/UserAvatar/multerSetupUserAvatar');
////////////////////////  create user account //////////////////////////////

userRoterGuest.post("/new", uploadUserAvatar.single('avatarImage'),user.checkEmailAndPhoneAvailabilty, user.bcryptPassword, async (req, res) => {
    try {
        req.body.avatar = req.file.filename;
        return user.createModel(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});
userRouter.put("/edit", user.checkEmailAndPhoneAvailabiltyEdit, user.bcryptPassword, async (req, res) => {
    try {
        return user.EditModel(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});
userRouter.delete("/delete/:_ids", async (req, res) => {
    try {
        return user.deleteModelsById(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});

userRouter.get("/showOne/:_id", async (req, res) => {
    try {
        return user.getOneuser(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});


userRouter.get("/showMany/:limit/:isaPartner", async (req, res) => {
    try {
        return user.getMany(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});

module.exports = { userRouter, userRoterGuest };