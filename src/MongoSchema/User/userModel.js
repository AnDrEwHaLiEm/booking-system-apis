const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true,
}
const UserModel = mongoose.Schema({
    firstName: requiredString,
    lastName: requiredString,
    phoneNumber: requiredString,
    nationalId: requiredString,
    avatar: requiredString,
    password: requiredString,
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: [
            "Male",
            "Female",
            "Other",
        ],
        required: true,
    },
    email: requiredString,
    isaPartner: {
        type: Boolean,
        default: false,
    },
    resetPassword: {
        type: String,
        default: ""
    },
    workAt: {
        type: String,
        default: ""
    },
    ticketsHistory: {
        type: [String],
        default: [],
    }
})


module.exports = mongoose.model('User', UserModel)