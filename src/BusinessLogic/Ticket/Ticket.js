const Edit = require('../Edit/Edit');
const TicketModel = require('../../MongoSchema/Ticket/Ticket');
class Ticket extends Edit {
    constructor(Model) {
        super(Model)
    }

    async payACost(req, res) {
        try {
            const { _id, paid } = req.body;
            const ticket = await this.Model.findByIdAndUpdate(_id, paid, { new: true });
            return res.status(200).send(ticket);
        } catch (error) {
            return res.sendStatus(400);
        }
    }

    async deleteExpair(req, res) {
        const tickets = await this.Model.find({
            expairAt: { $lte: new Date.now() },
            paid: false
        });
        console.log(tickets);
    }

}

const ticket = new Ticket(TicketModel);
module.exports = ticket;