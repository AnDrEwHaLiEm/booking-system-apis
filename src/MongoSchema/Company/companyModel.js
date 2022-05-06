const mongoose = require('mongoose');
const requiredString = {
    type: String,
    required: true,
}

const CompanyModel = mongoose.Schema({
    companyName: requiredString,
    email: requiredString,
    phoneNumber: requiredString,
    address: requiredString,
    serves: String,
    admin: {
        type: [String],
        default: [],
    }
})


module.exports = mongoose.model('Company', CompanyModel);