const db = require('./dbRepo')


const delay = (ms) => {
    const startPoint = new Date().getTime()
    while (new Date().getTime() - startPoint <= ms){
        if(new Date().getTime() - startPoint == ms) console.log('purchase completed!')
    }
}

exports.create = async (customer_id, order_id, amount, isCompleted, payment_method, payment_date) => {
    try {
        const isBilling = await db.getBillingInfo(order_id)
        if(isBilling) throw new Error("order already payed")
        delay(5000)
        const billing = await db.create(customer_id, order_id, amount, isCompleted, payment_method, payment_date)

        return billing
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

exports.getBilling = async (order_id) => {
    try {
        const billing = await db.getBillingInfo(order_id)
    
        return billing
    } catch (error) {
        throw new Error(error)
    }
}

exports.completeBillingPayment = async (id, amount) => {
    try {
        const message = await db.update(id, amount)
    
        return message
    } catch (error) {
        throw new Error(error)
    }
}