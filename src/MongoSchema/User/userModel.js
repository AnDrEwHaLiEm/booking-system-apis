const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true,
}
const EmployeeModel = mongoose.Schema({
    firstName: requiredString,
    lastName: requiredString,
    phone_number: requiredString,
    nationalIdNumber: requiredString,
    nationalId: requiredString,
    personalPicture: requiredString,
    authority: requiredString,
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
    address: requiredString,
    email: requiredString,
    jobTitle: requiredString,
    resetPassword: {
        type: String,
        default: ""
    },

})


module.exports = mongoose.model('Employee', EmployeeModel)