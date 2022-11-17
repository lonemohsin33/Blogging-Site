
const clientBody = function (req, res, next) {

    try {
        let bodyData = req.body

        if (Object.keys(bodyData).length == 0) {
            return res.send({ warning: "Can't create empty data !!" })
        }

        next()
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.clientBody = clientBody