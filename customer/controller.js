const service = require('./service')

exports.create = async (req, res, next) => {
    try {
        const customer = await service.create(email, first_name, last_name, address, password)
    
        res.status(201).send(customer)
    } catch (error) {
        console.log(error)
        next()  
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