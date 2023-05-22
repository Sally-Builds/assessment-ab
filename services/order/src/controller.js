const service = require('./service')

exports.create = async (req, res, next) => {
    try {
        const {qty, price, customer_id} = req.body

        const order = await service.create(customer_id, qty, price)
    
        res.status(201).send(order)
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}

exports.checkout = async (req, res, next) => {
    try {
        //query params inFull signifies whether the customer will pay in full
        const inFull = `${req.query.inFull}`

        const {customer_id} = req.body

        const order = await service.checkout(req.params.id, customer_id, inFull)
    
        res.status(201).send(order)
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}

exports.updateStatus = async (req, res, next) => {
    try {
        const {status} = req.body
    
        const data = await service.updateStatus(req.params.id, status)
    
        res.status(200).json({
            data,
        })
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
}

exports.getOrder = async (req, res, next) => {
    try {
        const data = await service.getOrder(req.params.id)
    
        res.status(200).json({
            data,
        })
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
}


exports.completeOrder = async (req, res, next) => {
    try {
        const data = await service.completeOrder(req.params.id)
    
        res.status(200).json({
            data,
        })
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
}