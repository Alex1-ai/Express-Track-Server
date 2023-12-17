require('./models/Users')
require('./models/Track')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express();

const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoute')

const requireAuth = require('./middleware/requireAuth')

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)


const mongoUri = "your mongodb api key"
mongoose.connect(mongoUri)


mongoose.connection.on('connected', ()=>{
    console.log('Connected to mongo instance')
})

mongoose.connection.on('error', (err)=>{
    console.error("Error connecting to mongo", err)
})


app.get('/', requireAuth, (req,res)=>{
    res.send(`Your email: ${req.user.email}`)
})


// app.listen(3000, "192.183.190.3");
app.listen(3000,"192.168.43.93", ()=>{
    console.log("Listening on port 3000")
})