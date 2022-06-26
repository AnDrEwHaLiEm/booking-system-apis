const mongoose = require('mongoose');

const requiredString = {
    type: String,
    require: true,
}

const TicketModel = mongoose.Schema({
    eventId: requiredString,
    userId:requiredString,
    chairClass: requiredString,
    chairNumber: {
        type: String,
        default:"",
    },
    paid: {
        type: Boolean,
        default: false,
    },
    expairAt: {
        type: Date,
        default: Date.now() + (3 * 60 * 60),
    }
})
module.exports = mongoose.model('Ticket', TicketModel);