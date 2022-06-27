const mongoose = require('mongoose');

const requiredString = {
    type: String,
    require: true,
}

const EventsModel = mongoose.Schema({
    eventTitle: requiredString,
    poster: requiredString,
    department: requiredString,
    presenter: {
        type: [String],
        require: true

    },
    hallId: requiredString,
    postedBy: requiredString,
    startTime: {
        type: Number,
        require: true
    },
    endTime: {
        type: Number,
        require: true
    },
    avalableSeat: {
        type: [Number],
        require: true
    },
    Cost: {
        type: [String],
        require: true
    },
})
module.exports = mongoose.model('Events', EventsModel);