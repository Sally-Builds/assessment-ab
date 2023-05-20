const db = require('./dbRepo')


const delay = (ms) => {
    const startPoint = new Date().getTime()
    while (new Date().getTime() - startPoint <= ms){
        if(new Date().getTime() - startPoint == ms) console.log('purchase completed!')
    }
}

exports.create = async (customer_id, order_id, amount, isCompleted, payment_method, payment_date) => {
    try {
        delay(5000)
        const billing = await db.create(customer_id, order_id, amount, isCompleted, payment_method, payment_date)

        console.log(billing)
        return billing
    } catch (error) {
        console.log(error)
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