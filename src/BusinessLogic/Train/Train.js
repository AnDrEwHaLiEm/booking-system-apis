const TrainModel = require('../../MongoSchema/Train/trainModel');
const Edit = require('../Edit/Edit');

class Train extends Edit {
    constructor(Model) {
        super(Model)
    }
    async showAllTrain(req, res) {
        try {
            const { limit } = req.params;
            const getAllTrain = await this.Model.find().limit(parseInt(limit));
            if (getAllTrain == null)
                return res.status(404).send("There are no trains yet");
            const resualt = getAllTrain.map((element) => {
                const { _id, trainNumber, trainType } = element;
                return { _id, trainNumber, trainType };
            });
            return res.status(200).json({ resualt });
        } catch (error) {
            return res.status(400).send(" error when get all train")
        }
    }
}
const train = new Train(TrainModel);
module.exports = train;