const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true,
}
const EmployeeModel = mongoose.Schema({
    firstName: requiredString,
    lastName: requiredString,
    email: requiredString,
    gender: {
        type: String,
        enum: [
            "Male",
            "Female",
            "Other",
        ],
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    phoneNumber: requiredString,
    nationalId: requiredString,
    avatar: requiredString,
    password: requiredString,
    resetPassword: {
        type: String,
        default: ""
    }
})


module.exports = mongoose.model('Employee', EmployeeModel)