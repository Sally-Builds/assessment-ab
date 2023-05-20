const jwt = require('jsonwebtoken')


exports.protect =  async (req, res, next) => {
    if(!req.headers || !req.headers.authorization) return res.status(401).send({message: 'Unauthorized access'})
    let token = req.headers.authorization.split('Bearer ')[1]
    try {
        const customer = await jwt.verify(token, process.env.JWT_SECRET)
        if(!customer) return res.status(400).send({message: 'Unauthorized access'})

        req.body.customer_id = customer.id
        next()
    } catch (error) {
        res.status(401).send({message: "Unauthorized access"})
    }
}