const Edit = require('../Edit/Edit');
const bcrypt = require('bcryptjs');
const EmployeeModel = require('../../MongoSchema/Employee/employeeModel');

class Employee extends Edit {
    constructor(Model) {
        super(Model)
        this.checkEmailAndPhoneAvailabilty = this.checkEmailAndPhoneAvailabilty.bind(this)
    }

    async bcryptPassword(req, res, next) {
        try {
            const { password } = req.body;
            const hashPassword = await bcrypt.hashSync(password, 10);
            req.body.password = hashPassword;
            next();
        } catch (error) {
            res.sendStatus(400);

        }
    }

    async checkEmailAndPhoneAvailabilty(req, res, next) {
        const { email, phoneNumber, nationalId } = req.body;
        const employee = await this.Model.exists({ $or: [{ email }, { phoneNumber }, { nationalId }] });
        if (employee) {
            res.status(406).send("this user already exist");
        }
        else
            next();
    }
    async checkEmailAndPhoneAvailabiltyEdit(req, res, next) {
        const { _id, email, phoneNumber, nationalId } = req.body;
        const employee = await this.Model.exists({ _id: _id, $or: [{ email }, { phoneNumber }, { nationalId }] });
        if (employee && employee._id !== _id) {
            res.status(406).send("this user already exist");
        }
        else
            next();
    }


    async getMany(req, res) {
        const { limit } = req.params;
        const getModels = await this.Model.find().limit(parseInt(limit));
        const result = getModels.map((element) => {
            const { _id, firstName, lastName, avatar, gender, email } = element;
            return { _id, firstName, lastName, avatar, gender, email };
        });
        return res.json({ result });
    }

    async getOne(req, res) {
        try {
            const { _id } = req.params;
            const getOneModel = await this.Model.findById(_id);
            if (!getOneModel) return res.sendStatus(404);
            const {
                firstName, lastName, phoneNumber, nationalId,
                avatar, age, gender, email
            } = getOneModel;
            return res.json({
                result: {
                    firstName, lastName, phoneNumber, nationalId,
                    avatar, age, gender, email
                }
            });
        } catch (error) {
            return res.sendStatus(400);
        }
    }

    async getModels(_id) {
        const model = this.Model.find({ _id: _id });
        if (model)
            return model;
        return [];
    }
}

const employee = new Employee(EmployeeModel);
module.exports = { employee, Employee };