const Edit = require('../Edit/Edit');
const companyModel = require('../../MongoSchema/Company/companyModel');

class Company extends Edit {
    constructor(Model) {
        super(Model)
    }

    async getOne(req, res) {
        try {
            const { _id } = req.params;
            const result = await this.Model.findById(_id);
            return res.send({result})
        } catch (error) {
            return res.status(400).send(error)
        }
    }

    async getMany(req, res) {
        try {
            const { limit } = req.params;
            const getModels = await this.Model.find().limit(parseInt(limit));
            const result = getModels.map((element) => {
                const { _id, companyName, email, address, phoneNumber } = element;
                return { _id, companyName, email, address, phoneNumber };
            });
            return res.json({ result });
        } catch (error) {

        }
    }
}

const company = new Company(companyModel);
module.exports = company;