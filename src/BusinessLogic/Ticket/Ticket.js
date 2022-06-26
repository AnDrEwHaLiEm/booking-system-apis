const Edit = require('../Edit/Edit');
const TicketModel = require('../../MongoSchema/Ticket/Ticket');
class Ticket extends Edit {
    constructor(Model) {
        super(Model)
    }

    async payACost(req, res) {
        try {
            const { _id, paid } = req.body;
            await this.Model.findByIdAndUpdate(_id, paid, { new: true });
            return res.sendStatus(200);
        } catch (error) {
            return res.sendStatus(400);
        }
    }

    async deleteExpair(req, res) {
        await this.Model.remove({
            expairAt: { $lte: new Date.now() },
            paid: false
        });
    }

}

const ticket = new Ticket(TicketModel);
module.exports = ticket;