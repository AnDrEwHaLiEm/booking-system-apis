const { Employee } = require('../Employee/Employee');
const UserModel = require('../../MongoSchema/User/userModel');
const companyModel = require('../../MongoSchema/Company/companyModel');

class User extends Employee {

    constructor(Model) {
        super(Model)
    }





    async getOneuser(req, res) {
        try {
            const { _id } = req.params;
            const getOneModel = await this.Model.findById(_id);
            if (!getOneModel)
                return res.sendStatus(404);
            let companyName = null;
            if (getOneModel.isaPartner === true && getOneModel.workAt !== '') {
                const company = await companyModel.findById({ _id: getOneModel.workAt });
                companyName = company.companyName;
            }
            const {
                firstName, lastName, phoneNumber, nationalId,
                avatar, age, gender, email, isaPartner, ticketsHistory, workAt
            } = getOneModel;
            return res.json({
                result: {
                    firstName, lastName, phoneNumber, nationalId,
                    avatar, age, gender, email, isaPartner, workAt, companyName, ticketsHistory
                }
            });
        } catch (error) {
            return res.sendStatus(400);
        }
    }

    async isAPartner(req, res) {
        const { _id } = req.body.decodedToken;
        const user = await this.Model.findById(_id);
        if (user) {
            const { isaPartner } = user;
            return res.send(isaPartner);
        }
        else {
            return res.send(false);
        }
    }
}

const user = new User(UserModel);
module.exports = user;