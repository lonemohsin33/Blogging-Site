const express = require('express')
const { default: mongoose } = require('mongoose')
const route = require("./routes/route")

const app = express()

app.use(express.json())
app.use('/', route)


mongoose.connect("mongodb+srv://lonemohsin33:Diabetes7889%40@functionup.aq5cty2.mongodb.net/Project1")
    .then(() => console.log("MDB is connected"))
    .catch(err => console.log(err))



app.listen(3000, () => console.log("Server is running !"))