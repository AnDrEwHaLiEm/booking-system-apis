const Edit = require('../Edit/Edit');
const lineModel = require('../../MongoSchema/Line/lineModel');
const trainModel = require('../../MongoSchema/Train/trainModel');

class Line extends Edit {
    constructor(Model) {
        super(Model)
        this.calculateTotal_Cost_Time = this.calculateTotal_Cost_Time.bind(this)

    }


    calculateTotal_Cost_Time(stations, trainCostPercent, trainTimePercent) {
        let totalTime = 0, totalCost = 0;
        stations.map((element) => {
            const { minCost, minTime } = element;
            ////// will change operation but now use it as Multiple
            totalCost = totalCost + (minCost); // trainCostPercent 
            totalTime = totalTime + (minTime); //trainTimePercent 
        });
        return { totalCost, totalTime };
    }

    async ShowManyLine(req, res) {
        try {
            const { limit } = req.params;
            const getLines = await this.Model.find().limit(parseInt(limit));
            const result = await Promise.all(getLines.map(async (element) => {
                const { _id, lineNumber, stopStations, train_id } = element;
                const trainInformation = await trainModel.findById({ _id: train_id });
                if (trainInformation) {
                    const { totalCost, totalTime } = this.calculateTotal_Cost_Time(stopStations, trainInformation.percentCost, trainInformation.percentSpeed);
                    const train_degree = trainInformation.trainType;
                    const startStation = stopStations[0].stationName;
                    const endStation = stopStations[stopStations.length - 1].stationName;
                    return { _id, lineNumber, startStation, endStation, totalCost, totalTime, train_degree };
                } else
                    return;

            }));
            return res.status(200).json({ result });
        }
        catch (error) {
            return res.status(400).send(`error when get all model ${error}`);
        }
    }

    async showOneLine(req, res) {
        try {
            const { _id } = req.params;
            const selectedLine = await this.Model.findById(_id);
            if (!selectedLine)
                return res.status(404).send("line not found");
            const { lineNumber, stopStations, train_id } = selectedLine;
            const getTrain = await trainModel.find({ _id: train_id });
            if (!getTrain)
                return res.json({ result: { lineNumber, stopStations } });
            const { trainNumber, trainType } = getTrain;
            const trainInformations = { train_id, trainNumber, trainType };
            const result = { lineNumber, stopStations, trainInformations };
            return res.status(200).json({ result });
        } catch (error) {
            return res.status(400).send("error when get One model");

        }
    }
}
const line = new Line(lineModel);
module.exports = line;