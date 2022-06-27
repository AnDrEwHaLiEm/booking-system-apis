const Edit = require('../Edit/Edit');
const TicketModel = require('../../MongoSchema/Ticket/Ticket');
const UserModel = require('../../MongoSchema/User/userModel');
class Ticket extends Edit {
    constructor(Model) {
        super(Model)
    }

    async payACost(req, res) {
        try {
            const { _id, paid } = req.body;
            const ticket = await this.Model.findByIdAndUpdate(_id, { paid }, { new: true });
            return res.status(200).send(ticket);
        } catch (error) {
            return res.sendStatus(400);
        }
    }
    /*    {
    "chairNumber": "40A",
    "paid": false,
    "expairAt": "2022-06-27T13:34:36.611Z",
    "_id": "62b9b215c01db10016ea82be",
    "eventId": "123456789",
    "userId": "654321",
    "chairClass": "A",
    "__v": 0
},*/
    async deleteExpair(req, res) {
        const tickets = await this.Model.find({ expairAt: { $lte: Date.now() }, paid: false });
        tickets.forEach(async (item) => {
            if (Object.keys(item).length > 0) {
                const user = await UserModel.findOne({ _id: item.userId });
                if (user) {
                    await this.removeTicketFromUser(user._id, item._id);
                }
            }
        });
        return res.send(200);
    }
    async removeTicketFromUser(user_id, ticket_id) {
        await UserModel.findByIdAndUpdate({ _id: user_id }, { $pull: { ticketsHistory: ticket_id } });
    }

}

const ticket = new Ticket(TicketModel);
module.exports = ticket;