const Edit = require('../Edit/Edit');
const HallsModel = require('../../MongoSchema/Halls/Halls');
const companyModel = require('../../MongoSchema/Company/companyModel');
const userModel = require('../../MongoSchema/User/userModel');
class Halls extends Edit {
    constructor(Model) {
        super(Model)
    }

    async getOneHalls(req, res) {
        try {
            const { _id } = req.params;
            const getOne = await this.Model.findById(_id);
            if (!getOne)
                return res.status(404).send("Hall not Found")
            let companyName = null;
            const company = await companyModel.findById({ _id: getOne.company_id });
            if (company != null)
                companyName = company.companyName;

            const {
                hallName, address, hallType, chairClassA,
                chairClassB, chairClassC, company_id } = getOne;
            return res.json({
                result: {
                    hallName, address, hallType, chairClassA,
                    chairClassB, chairClassC, companyName, company_id
                }
            });
        } catch (error) {
            return res.sendStatus(400);
        }
    }

    async getAllHalls(req, res) {
        const { limit } = req.params;
        const getAll = await this.Model.find().limit(parseInt(limit));
        if (getAll == null)
            return res.status(404).send("Models Not Found");
        const result = getAll.map((element) => {
            const { _id, hallName, address, hallType, chairClassA, chairClassB, chairClassC } = element;
            const numberOfChair = parseInt(chairClassA) + parseInt(chairClassB) + parseInt(chairClassC);
            return { _id, hallName, address, hallType, numberOfChair };

        });
        return res.json({ result });
    }

    async getAllHallsInOneCompany(req, res) {
        try {
            const { _id } = req.body.decodedToken;
            const partner = await userModel.findById(_id);
            const company_id = partner.workAt;
            const getAll = await this.Model.find({ company_id }).limit(100);
            const result = getAll.map((element) => {
                const { _id, hallName } = element;
                return { _id, hallName };

            });
            return res.json({ result });
        } catch (error) {
            return res.sendStatus(400);
        }

    }

}

const halls = new Halls(HallsModel);
module.exports = halls;