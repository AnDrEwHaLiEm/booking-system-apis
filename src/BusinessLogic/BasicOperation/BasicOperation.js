class BasicOperation {
    Model;
    constructor(Model) {
        this.Model = Model;
    }

    async createModel(req, res) {
        try {
            const newModel = new this.Model(req.body);
            const model = await newModel.save();
            return res.json({ model });
        } catch (error) {
            return res.sendStatus(400);
        }
    }

    async deleteModelsById(req, res) {
        try {
            const { _ids } = req.params;
            const deleteModels = await this.Model.deleteMany({
                _id: { $in: _ids.split(",") },
            });
            return res.json({ deleteModels });
        } catch (error) {
            return res.sendStatus(400);
        }
    }

    async getOneModelById(req, res) {
        try {
            const { _id } = req.params;
            const getOneModel = await this.Model.findById(_id);
            if (!getOneModel) return res.sendStatus(404);
            return res.json({ getOneModel });
        } catch (error) {
            return res.sendStatus(400);
        }
    }
    async getManyModels(req, res) {
        try {
            const { limit } = req.params;
            const getLimitedModle = await this.Model.find().limit(parseInt(limit));
            if (getLimitedModle == null) return res.sendStatus(404);
            return res.json({ getLimitedModle });
        } catch (error) {
            return res.sendStatus(400);
        }
    }
}
module.exports = BasicOperation;