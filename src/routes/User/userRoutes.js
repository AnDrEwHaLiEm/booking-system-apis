const user = require("../../BusinessLogic/User/User");
const express = require('express');
const userRouter = express.Router();
const userRoterGuest = express.Router()
const uploadUserAvatar = require('../../uploadImages/UserAvatar/multerSetupUserAvatar');
////////////////////////  create user account //////////////////////////////

userRoterGuest.post("/new", uploadUserAvatar.single('avatarImage'), user.checkEmailAndPhoneAvailabilty, user.bcryptPassword, async (req, res) => {
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

userRouter.get("/profile", async (req, res) => {
    try {
        const { _id } = req.body.decodedToken;
        req.params._id = _id;
        return user.getOne(req, res);
    } catch (error) {
        return res.status(400).send(error);
    }
})

userRouter.get("/isPartner", async (req, res) => {
    try {
        return user.isAPartner(req, res);
    } catch (error) {
        return res.status(400).send(error);
    }
})

module.exports = { userRouter, userRoterGuest };