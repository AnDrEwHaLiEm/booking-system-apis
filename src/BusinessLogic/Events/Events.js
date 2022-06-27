const Edit = require('../Edit/Edit');
const EventsModel = require('../../MongoSchema/Events/Events');
class Events extends Edit {
    constructor(Model) {
        super(Model)
    }
}

const event = new Events(EventsModel);
module.exports = event;