const jwt = require('jsonwebtoken')
const EmployeeModel = require('../MongoSchema/Employee/employeeModel')
const bcrypt = require('bcryptjs')
const fs = require('fs')

class Authintication {

    constructor() {
        this.getPrivateKey = this.getPrivateKey.bind(this)
        this.logIn = this.logIn.bind(this)
        this.createMyToken = this.createMyToken.bind(this)
        this.authinticate = this.authinticate.bind(this)
    }

    getPrivateKey() {
        return fs.readFileSync(`${__dirname}/../../privateKey.key`, 'utf8')
    }

    createMyToken(decodedToken) {
        const token = jwt.sign(decodedToken, this.getPrivateKey());
        if (!token)
            throw new Error('internal server error');
        return token
    }

    async logIn(req, res) {
        const { email, phone, password } = req.body
        const user = await EmployeeModel.findOne({ $or: [{ email }, { phone }] });
        if (!user) {
            const error = new Error('email or password is error')
            return res.status(400).send(error);
        }
        const passwordIsCorrect = await bcrypt.compare(password, user.password);
        if (!passwordIsCorrect) {
            const error = new Error('email or password is error')
            return res.status(400).send(error);
        }
        await EmployeeModel.updateOne({ _id: user._id }, { resetPassword: "" });
        const token = this.createMyToken({ _id: user._id, email: user.email, phone: user.phone })
        return res.send({ token })
    }

    async authinticate(req, res, next) {
        try {
            const authorizationHeader = req.headers['authorization'];
            const token = authorizationHeader && authorizationHeader.split('=')[1]
            if (!token)
                return res.sendStatus(401)
            const privateKey = this.getPrivateKey()
            return jwt.verify(token, privateKey, async (error, decodedToken) => {
                if (error)
                    return res.status(401).send({ error });
                req.body.decodedToken = decodedToken
                return next()
            })
        } catch (error) {
            res.status(400).send({ error })
        }
    }
}


const authintication = new Authintication()


module.exports = authintication;