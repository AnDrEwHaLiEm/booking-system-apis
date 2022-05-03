const BasicOperation = require('../BasicOperation/BasicOperation');

class Edit extends BasicOperation {
    constructor(Model) {
        super(Model)
    }
    async EditModel(req, res) {
        try {
            const modelEdits = req.body;
            const editdModel = await this.Model.findByIdAndUpdate(modelEdits._id, modelEdits, { new: true });
            return res.send({ editdModel });
        } catch (error) {
            return res.sendStatus(400);
        }
    }
}

module.exports = Edit;