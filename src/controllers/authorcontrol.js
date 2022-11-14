const jwt = require('jsonwebtoken')

const authorModel = require("../models/authormodel")


// ---------------------------------------------

const createAuthor = async function (req, res) {

    try {
        let data = req.body
        let emailId = req.body.email

        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (emailId.match(regex)) {
            let savedData = await authorModel.create(data)
            res.status(201).send({ message: savedData })
        } else {
            res.send({warning: "Enter a valid email !"})
        }
    }
    catch (err) {
        res.status(400).send(err)
    }
}


module.exports.createAuthor = createAuthor