const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const requiredString = {
    type: String,
    require: true,
}
const Stations = new mongoose.Schema({
    stationId: Number,
    stationName: String,
    minCost: Number,
    minTime: Number,
})


const LineModel = mongoose.Schema({
    lineNumber: {
        type: Number,
        require: true,
    },
    stopStations: {
        type: [Stations],
        require: true,
    },
    train_id: ObjectId
})

module.exports = mongoose.model('Line', LineModel);