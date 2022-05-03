const mongoose = require('mongoose');


const requiredString = {
    type: String,
    require: true,
}


const TrainModel = mongoose.Schema({
    trainNumber: requiredString,
    carsNumber: {
        type: [String],
        require: true,
    },
    carsChairNumber: {
        type: [Number],
        require: true,
    },
    trainType: requiredString,
    percentSpeed: {
        type: Number,
        require: true,
    },
    percentCost: {
        type: Number,
        require: true,
    },
});

module.exports = mongoose.model('train', TrainModel);