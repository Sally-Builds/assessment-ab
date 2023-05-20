const service = require('./service')

exports.checkout = async (req, res, next) => {
    try {
        const {qty, price, customer_id} = req.body
        const order = await service.checkout(customer_id, qty, price)
    
        res.status(201).send(order)
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body
    
        const data = await service.login(email, password)
    
        res.status(200).json({
            token: data.token,
            customer: data.customer,
        })
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
}