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
        this.addTicketToUser = this.addTicketToUser.bind(this);
    }

    async createnewTicket(req, res) {
        try {
            const newModel = new this.Model(req.body);
            await this.addTicketToUser(newModel.userId, newModel._id);
            const model = await newModel.save();
            return res.json({ model });
        } catch (error) {
            return res.status(400).send(error);
        }
    }


    async makeChairUnAvailable(req, res, next) {
        try {
            const { eventId, chairClass } = req.body;
            const event = await eventModel.findById({ _id: eventId });
            let index = chairClass.charCodeAt(0) - 'A'.charCodeAt(0);
            let avalableSeat = event.avalableSeat;
            let chairNumber = avalableSeat[index] + chairClass;
            avalableSeat[index] -= 1;
            if (avalableSeat[index] >= 0) {
                await eventModel.updateOne({ _id: eventId }, { avalableSeat });
                req.body.chairNumber = chairNumber;
                req.body.userId = req.body.decodedToken._id;
                next();
            }
            else {
                return res.send(400).send("There is Not Seat");
            }
        } catch (error) {
            return res.sendStatus(400);
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
        const tickets = await this.Model.find({ expairAt: { $lte: Date.now().valueOf() }, paid: false });
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

    async addTicketToUser(user_id, ticket_id) {
        console.log(user_id, ticket_id);
        await userModel.findByIdAndUpdate({ _id: user_id }, { $addToSet: { ticketsHistory: ticket_id } }, { new: true });
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
                const { eventTitle, poster, presenter, startTime, endTime, Cost } = event;
                const { hallName, address } = hall;
                const { paid, expairAt, chairNumber, chairClass } = ticket;
                const index = chairClass.charCodeAt(0) - 'A'.charCodeAt(0);
                const costTicket = Cost[index];
                const result = {
                    _id,
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
                    , chairNumber
                    , Cost: costTicket
                }
                return res.send(result);
            }
            else
                return res.sendStatus(404);
        } catch (error) {
            return res.sendStatus(400);
        }
    }

    async getMay(req, res) {
        try {
            const { _id } = req.body.decodedToken;
            const ticket = await this.Model.findById(_id);
            if (ticket) {
                const event = await eventModel.findById(ticket.eventId);
                const hall = await hallsModel.findById(event.hallId);
                const { eventTitle, poster, startTime, endTime, Cost } = event;
                const { hallName, address } = hall;
                const { paid, expairAt, chairNumber, chairClass } = ticket;
                const index = chairClass.charCodeAt(0) - 'A'.charCodeAt(0);
                const costTicket = Cost[index];
                const result = {
                    eventTitle
                    , poster
                    , presenter
                    , startTime
                    , endTime
                    , hallName
                    , address
                    , paid
                    , expairAt
                    , chairNumber
                    , Cost: costTicket
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