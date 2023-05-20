const service = require('./service')

exports.create = async (req, res, next) => {
    try {
        const {customer_id, order_id, amount, isCompleted, payment_method, payment_date} = req.body
        const billing = await service.create(customer_id, order_id, amount, isCompleted, payment_method, payment_date)
    
        res.status(201).send(billing)
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}