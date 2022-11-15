// const jwt = require('jsonwebtoken')

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
            res.status(500).send({ warning: err.message })
        }
    }
}


module.exports.createAuthor = createAuthor