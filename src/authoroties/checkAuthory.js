const employeeModel = require("../MongoSchema/Employee/employeeModel");
const UserModel = require("../MongoSchema/User/userModel");
const authorities = {
    isPartner: {
        user: "*",
        event: "*",
        ticket: "*",
        halls: ["GET"],
    },
    isNotPartner: {
        user: "*",
        ticket: "*",
        event: ["GET"],
        halls: null,
    },
    isEmployee: {
        user: "*",
        halls: "*",
        event: "*",
        ticket: "*",
        company: "*",
        employee: "*"
    }
}

async function checkAuthorty(req, res, next) {
    try {
        const modelName = req.url.split('/')[1];
        const { method } = req
        const { _id } = req.body.decodedToken
        const user = await UserModel.findById({ _id })
        const employee = await employeeModel.findById({ _id });
        if (!user && !employee) {
            return res.sendStatus(401);
        }
        const userAuthoritiesInAllModels = authorities[(employee ? "isEmployee" : user.isaPartner === true ? 'isPartner' : 'isNotPartner')];
        const userAuthoritiesInOneModel = userAuthoritiesInAllModels[modelName]
        if (!userAuthoritiesInOneModel)
            return res.sendStatus(401);
        if (userAuthoritiesInOneModel === "*" || userAuthoritiesInOneModel.includes(method))
            return next()
        else
            return res.sendStatus(401);
    } catch (error) {
        return res.status(400).send(error)
    }
}

module.exports = checkAuthorty;