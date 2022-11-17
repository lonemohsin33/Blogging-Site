const jwt = require('jsonwebtoken')

const authorModel = require("../models/authormodel")


// --------------------✅-------------------------

const createAuthor = async (req, res) => {

    try {
        let authorData = req.body

        let savedData = await authorModel.create(authorData)
        res.status(201).send({ message: savedData, status: true })
    }
    catch (err) {
            res.status(500).send({ status: false, message: err.message })
    }
}

// --------------------✅-------------------------

const loginAuthor = async (req, res) => {

    try {
        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ message: "No data Present", status: false })
        }
        let userName = req.body.email
        if(!userName) return res.status(400).send({status:false, message:"Username is required"})
        let userPass = req.body.password
        if(!userPass) return res.status(400).send({status:false, message:"Password is required"})

        let user = await authorModel.findOne({ email: userName, password: userPass })

        if (!user)
            return res.status(404).send({ status: false, warning: "email-id or password is not matched or user doesn't exist !" })

        let token = jwt.sign(
            {
                authorId: user._id,
                email: userName,
                password: userPass
            },
            "fake password"
        )

        res.setHeader("x-api-key", token)
        res.status(200).send({ status: true, token: token })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


module.exports.createAuthor = createAuthor
module.exports.loginAuthor = loginAuthor