const Edit = require('../Edit/Edit');
const EventsModel = require('../../MongoSchema/Events/Events');
const hallsModel = require('../../MongoSchema/Halls/Halls');
class Events extends Edit {
    constructor(Model) {
        super(Model)
    }

    async postedBy(req, res, next) {
        const { _id } = req.body.decodedToken;
        req.body.postedBy = _id;
        next();
    }

    async getAvailableSeat(req, res, next) {
        const { hallId } = req.body;
        const hall = await hallsModel.findById({ _id: hallId });
        const { chairClassA, chairClassB, chairClassC } = hall;
        let seat = [chairClassA, chairClassB, chairClassC];
        req.body.avalableSeat = seat;
        next();
    }

    async showMany(req, res) {
        try {
            const { limit } = req.params;
            const getModels = await this.Model.find().limit(parseInt(limit));
            const result = getModels.map((element) => {
                const {
                    _id
                    , eventTitle
                    , poster
                    , startTime
                    , endTime
                } = element;
                return {
                    _id
                    , eventTitle
                    , poster
                    , startTime
                    , endTime
                };
            });
            return res.json({ result });
        } catch (error) {
            return res.sendStatus(400);
        }
    }
    async showManyByDepartment(req, res) {
        try {
            const { limit, department } = req.params;
            const getModels = await this.Model.find({ department }).limit(parseInt(limit));
            const result = getModels.map((element) => {
                const {
                    _id
                    , eventTitle
                    , poster
                    , startTime
                    , endTime
                } = element;
                return {
                    _id
                    , eventTitle
                    , poster
                    , startTime
                    , endTime
                };
            });
            return res.json({ result });
        } catch (error) {
            return res.sendStatus(400);
        }
    }
    async showOne(req, res) {
        try {
            const { _id } = req.params;
            const event = await this.Model.findById(_id);
            if (event) {
                const { presenter, avalableSeat, Cost, eventTitle, poster, department, hallId, startTime, endTime } = event;
                const getOnehall = await hallsModel.findById({ _id: hallId });
                const {
                    hallName
                    , address
                    , hallType
                    , chairClassA
                    , chairClassB
                    , chairClassC } = getOnehall;
                const result = { presenter, avalableSeat, Cost, eventTitle, poster, department, hallId, startTime, endTime, hallName, address, hallType, chairClassA, chairClassB, chairClassC };
                return res.status(200).send(result);
            }
            else {
                return res.status(404);
            }

        } catch (error) {
            return res.sendStatus(400);
        }
    }
}


const event = new Events(EventsModel);
module.exports = event;