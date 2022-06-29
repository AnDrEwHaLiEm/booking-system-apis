const Edit = require('../Edit/Edit');
const TicketModel = require('../../MongoSchema/Ticket/Ticket');
const UserModel = require('../../MongoSchema/User/userModel');
const eventModel = require('../../MongoSchema/Events/Events');
const userModel = require('../../MongoSchema/User/userModel');
const hallsModel = require('../../MongoSchema/Halls/Halls');
class Ticket extends Edit {
    constructor(Model) {
        super(Model)
        this.deleteExpair = this.deleteExpair.bind(this);
        this.payACost = this.payACost.bind(this);
        this.makeChairAvailable = this.makeChairAvailable.bind(this);
        this.removeTicketFromUser = this.removeTicketFromUser.bind(this);
        this.makeChairUnAvailable = this.makeChairUnAvailable.bind(this);
    }


    async makeChairUnAvailable(req, res, next) {
        const { eventId, chairClass } = req.body;
        const event = await eventModel.findById({ _id: eventId });
        let index = chairClass.charCodeAt(0) - 'A'.charCodeAt(0);
        let avalableSeat = event.avalableSeat;
        let chairNumber = avalableSeat[index] + chairClass;
        avalableSeat[index] -= 1;
        if (avalableSeat[index] >= 0) {
            await eventModel.updateOne({ _id: eventId }, { avalableSeat });
            req.body.chairNumber = chairNumber;
            next();
        }
        else {
            return res.send(400).send("There is Not Seat");
        }

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
    async deleteExpair(req, res, next) {
        const tickets = await this.Model.find({ expairAt: { $lte: Date.now() }, paid: false });
        console.log(tickets);
        let _ids = [];
        tickets.forEach(async (item) => {
            if (Object.keys(item).length > 0) {
                _ids.push(item._id);
                const user = await UserModel.findOne({ _id: item.userId });
                const event = await eventModel.findById({ _id: item.eventId });
                if (user) {
                    await this.removeTicketFromUser(user._id, item._id);
                }
                if (event) {
                    await this.makeChairAvailable(event._id, item.chairClass, event.avalableSeat);
                }
            }
        });
        console.log(_ids);
        await this.Model.deleteMany({ _id: { $in: _ids } });
        next();
    }

    async makeChairAvailable(ticket_id, chairClass, avalableSeat) {
        const chairdegree = chairClass.charCodeAt(0) - "A".charCodeAt(0);
        avalableSeat[chairdegree] += 1;
        await eventModel.findByIdAndUpdate({ _id: ticket_id }, { avalableSeat });
    }
    async removeTicketFromUser(user_id, ticket_id) {
        await UserModel.findByIdAndUpdate({ _id: user_id }, { $pull: { ticketsHistory: ticket_id } });
    }

    async getOne(req, res) {
        try {
            const { _id } = req.params;
            const ticket = await this.Model.findById(_id);
            if (ticket) {
                const event = await eventModel.findById(ticket.eventId);
                const user = await userModel.findById(ticket.userId);
                const hall = await hallsModel.findById(event.hallId);
                const { firstName, lastName, phoneNumber } = user;
                const { eventTitle, poster, presenter, startTime, endTime } = event;
                const { hallName, address } = hall;
                const { paid, expairAt } = ticket;
                const result = {
                    firstName
                    , lastName
                    , phoneNumber
                    , eventTitle
                    , poster
                    , presenter
                    , startTime
                    , endTime
                    , hallName
                    , address
                    , paid
                    , expairAt
                }
                return res.send(result);
            }
            else
                return res.sendStatus(404);
        } catch (error) {
            return res.sendStatus(400);
        }
    }
}

const ticket = new Ticket(TicketModel);
module.exports = ticket;