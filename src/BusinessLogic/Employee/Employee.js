const Edit = require('../Edit/Edit');
const bcrypt = require('bcryptjs');
const EmployeeModel = require('../../MongoSchema/Employee/employeeModel');

class Employee extends Edit {
    constructor(Model) {
        super(Model)
        this.checkEmailAndPhoneAvailabilty = this.checkEmailAndPhoneAvailabilty.bind(this)
        this.checkEmailAndPhoneAvailabiltyEdit = this.checkEmailAndPhoneAvailabiltyEdit.bind(this)
    }

    async bcryptPassword(req, res, next) {
        try {
            const { password } = req.body;
            if (password) {
                const hashPassword = await bcrypt.hashSync(password, 10);
                req.body.password = hashPassword;
            }
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
        try {
            const { _id, email, phoneNumber, nationalId } = req.body;
            const employee = await this.Model.exists({ _id: { $ne: _id }, $or: [{ email }, { phoneNumber }, { nationalId }] });
            console.log(employee)
            if (employee) {
                res.status(406).send("this email,phone,nationalId use by some one else");
            }
            else {
                next();
            }
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }


    async getMany(req, res) {
        const { limit, isaPartner } = req.params;
        const getModels = await this.Model.find({ isaPartner }).limit(parseInt(limit));
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