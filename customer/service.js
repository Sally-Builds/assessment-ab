const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const customers = []

exports.create = async (email, first_name, last_name, address, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
    
        customers.push({
            id: customers.length + 1,
            email,
            last_name,
            first_name,
            password: hashedPassword,
            address,
            fullName:  first_name + " " + last_name,
            display_name: first_name[0] + last_name[0]
        })
        return {...customers[customers.length -1], password: undefined}
    } catch (error) {
        throw new Error(error)
    }
}

exports.login = async (email, password) => {
    try {
        const customer = customers.find((el) => el.email == email)
    
        if(!customer) throw new Error('incorrect email or password')
    
        if(!(await bcrypt.compare(password, customer.password))) {
            throw new Error('incorrect email or password')
        }
    
        let token =  jwt.sign({id: customer.id}, 'secret', {expiresIn: '30d'})
    
        return {customer: {...customer, password: undefined}, token}
    } catch (error) {
        throw new Error(error)
    }
}