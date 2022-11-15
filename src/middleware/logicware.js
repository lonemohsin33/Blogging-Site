
const clientBody = function (req, res, next) {

    let bodyData = req.body

        if (Object.keys(bodyData).length == 0) {
            return res.send({ warning: "Can't create empty data !!" })
        }

    next()
}

module.exports.clientBody = clientBody