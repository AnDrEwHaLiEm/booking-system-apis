const {Employee} = require('../Employee/Employee');
const UserModel = require('../../MongoSchema/User/userModel');

class User extends Employee {
    
    constructor(Model) {
        super(Model)
    }

    async getOneuser(req, res) {
        try {
            const { _id } = req.params;
            const getOneModel = await this.Model.findById(_id);
            if (!getOneModel) return res.sendStatus(404);
            const {
                firstName, lastName, phoneNumber, nationalId,
                avatar, age, gender, email, isaPartner, workAr, ticketsHistory
            } = getOneModel;
            return res.json({
                result: {
                    firstName, lastName, phoneNumber, nationalId,
                    avatar, age, gender, email, isaPartner, workAr, ticketsHistory
                }
            });
        } catch (error) {
            return res.sendStatus(400);
        }
    }
}

const user = new User(UserModel);
module.exports = user;