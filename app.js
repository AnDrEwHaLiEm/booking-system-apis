const path = require('path');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { userRouter,userRoterGuest } = require('./src/routes/User/userRoutes');
const hallsRouter = require('./src/routes/Halls/hallsRoutes');
const checkAuthorty = require('./src/authoroties/checkAuthory');
const ticketRouter = require('./src/routes/Ticket/ticketRoutes');
const companyRouter = require('./src/routes/Company/companyRoutes');
const authintication = require('./src/authintication/authintication');
const employeeRouter = require('./src/routes/Employee/employeeRoutes');
const authRouter = require('./src/routes/authintication/authinticationRoutes');
const { eventsRouter, eventsRouterPartner } = require('./src/routes/Events/eventsRoutes');
require('dotenv/config')

///////////////////////////// 
const app = express()



app.use(express.json())
app.use(cors())

/////////////////////////////////

app.use('/static', express.static(path.join(__dirname, 'public')))
//app.use('/static', express.static('public'))
///////////////////////////////whithout authinticat////////////////////
app.use("/event", eventsRouter);
app.use("/user", userRoterGuest);
/////////////////////////////////////////////////////
app.use('/authintication', authRouter)
/////////////////////////////////////////////////////
app.use(authintication.authinticate)
////////////////////////////////////////////////////
app.use(checkAuthorty);
////////////////////////////////////////////////////
app.use("/user", userRouter);
app.use("/halls", hallsRouter);
app.use("/event", eventsRouterPartner);
app.use("/ticket", ticketRouter);
app.use("/company", companyRouter);
app.use("/employee", employeeRouter);
/////////////////////////////////////////////////



app.get('/', (req, res) => res.send('yes iam working on host 4000'))


mongoose.connect(
    process.env.DB_CONECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
    (err) => err ? console.log(err) : console.log("db is conected")
);

app.listen(process.env.PORT || 4000)