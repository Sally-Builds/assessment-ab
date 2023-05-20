const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('./dbRepo')
const axios = require('axios')

exports.checkout = async (customer_id, qty, price) => {
    try {
        let total = qty * price;
        let status = 'pending'
        const order_id = await db.create(customer_id, qty, price, total, status)

        const payment = await axios.post('http://localhost:3002/api/billing', {
            amount: 500, 
            payment_method: 'debit card', 
            payment_date: new Date(), 
            customer_id: customer_id, 
            order_id,
            isCompleted: true
        })

        return 'payment successful'
    } catch (error) {
        throw new Error(error)
    }
}

exports.login = async (email, password) => {
    try {
        const customer = await db.getUserWithEmail(email)
    
        if(!customer) throw new Error('incorrect email or password')
    
        if(!(await bcrypt.compare(password, customer.password))) {
            throw new Error('incorrect email or password')
        }
    
        let token =  jwt.sign({id: customer.id}, process.env.JWT_SECRET, {expiresIn: '30d'})
    
        return {customer: {...customer, password: undefined}, token}
    } catch (error) {
        throw new Error(error)
    }
}
