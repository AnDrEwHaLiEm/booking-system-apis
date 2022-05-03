const mongoose = require('mongoose');

const requiredString = {
    type: String,
    require: true,
}

const NewsModel = mongoose.Schema({
    title: requiredString,
    description: requiredString,
    caption: requiredString,
    image: requiredString,
    postDate: {
        type: Number,
        default: Date.now(),
    },
    postedBy: requiredString,
    editedBy: {
        type: Array,
        default: []
    }
})
module.exports = mongoose.model('News', NewsModel);