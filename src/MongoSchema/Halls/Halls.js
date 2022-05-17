const mongoose = require('mongoose');

const requiredString = {
    type: String,
    require: true,
}

const HallsModel = mongoose.Schema({
    hallName: requiredString,
    address: requiredString,
    hallType: requiredString,
    chairClassA: {
        type: Number,
        require: true
    },
    chairClassB: {
        type: Number,
        require: true
    },
    chairClassC: {
        type: Number,
        require: true
    },
    company_id: requiredString,
})
module.exports = mongoose.model('Halls', HallsModel);