const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('./dbRepo')

exports.create = async (email, name, address, password) => {
    try {
        if(await db.getUserWithEmail(email)) {
            throw new Error("email exist")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const res = await db.create(email, hashedPassword, name, address)
        return res
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