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
}
module.exports = BasicOperation;