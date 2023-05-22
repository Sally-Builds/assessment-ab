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

exports.get = async (req, res, next) => {
    try {
        const billing = await service.getBilling(req.params.order_id)

        res.status(200).send(billing)
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}

exports.completePayment = async (req, res, next) => {
    try {
        console.log(req.body, 'body req')
        const message = await service.completeBillingPayment(req.params.id, req.body.amount)

        res.status(200).send(message)
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}
