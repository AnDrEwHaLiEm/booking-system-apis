const express = require('express');
const mongoose = require('mongoose');
const employeeRouter = require('./src/routes/Employee/employeeRoutes');
const authintication = require('./src/authintication/authintication');
const userRouter = require('./src/routes/User/userRoutes');
const authRouter = require('./src/routes/authintication/authinticationRoutes');
const { newsRouter } = require('./src/routes/News/newsRoutes');
const cors = require('cors');
require('dotenv/config')

///////////////////////////// mongodb+srv://skill-counter-api:<password>@cluster0.figsh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const path = require('path');
const companyRouter = require('./src/routes/Company/companyRoutes');

const app = express()


app.use(express.json())
app.use(cors())

/////////////////////////////////

app.use('/static', express.static(path.join(__dirname, 'public')))
//app.use('/static', express.static('public'))
/////////////////////////////////////////////////////
app.use('/authintication', authRouter)
/////////////////////////////////////////////////////

app.use(authintication.authinticate)
////////////////////////////////////////////////////
app.use("/company", companyRouter);
app.use("/user", userRouter);
app.use("/employee", employeeRouter);
app.use("/news", newsRouter);

/////////////////////////////////////////////////



app.get('/', (req, res) => res.send('yes iam working on host 4000'))


mongoose.connect(
    process.env.DB_CONECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
    (err) => err ? console.log(err) : console.log("db is conected")
);

app.listen(process.env.PORT || 4000)