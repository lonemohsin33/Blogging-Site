const jwt = require('jsonwebtoken')

const authorModel = require("../models/authormodel")


// --------------------✅-------------------------

const createAuthor = async function (req, res) {

    try {
        let authorData = req.body
        let emailId = req.body.email

        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (emailId.match(regex)) {

            let savedData = await authorModel.create(authorData)
            res.status(201).send({ message: savedData })
        }
        res.send({ warning: "Enter a valid email !" })
    }
    catch (err) {

        if (err.name == "ValidationError") {
            res.status(400).send({ warning: err.message })
        }
        else {
            res.status(500).send({ status: false, message: err.message })
        }
    }
}

// --------------------✅-------------------------

const loginAuthor = async function (req, res) {

    try {
        let userName = req.body.email
        let userPass = req.body.password
    
        let user = await authorModel.findOne({ email: userName, password: userPass })
    
        if (!user)
            return res.send({ status: false, warning: "email-id or password is not correct !" })
    
        let token = jwt.sign(
            {
                authorId: user._id,
                email: userName,
                password: userPass
            },
            "fake password"
        )
    
        res.setHeader("x-api-key", token)
        res.send({ status: true, token: token })
    }
    catch(err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


module.exports.createAuthor = createAuthor
module.exports.loginAuthor = loginAuthor