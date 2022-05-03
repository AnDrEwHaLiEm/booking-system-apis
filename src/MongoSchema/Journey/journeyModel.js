const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const requiredString = {
    type: String,
    required: true,
}

const Stations = new Schema({
    stationId: ObjectId,
    reachedTime: Number,
    takeOffTiem: Number,
    cost: Number
});

const Ticket = new Schema({
    ticketDate: Number,
    ticketId: ObjectId,
})

const JourneyModel = mongoose.Schema({
    lineNumber: requiredString,
    stopStations: [Stations],
    TrainId: ObjectId,
    ticketDate: [Ticket],
})


module.exports = mongoose.model('Journey', JourneyModel);