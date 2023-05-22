const db = require('./dbRepo')
const axios = require('axios')

exports.create = async (customer_id, qty, price,) => {
    try {
        let total = qty * price;
        let status = 'pending'
        await db.create(customer_id, qty, price, total, status)

        return 'order created'
    } catch (error) {
        throw new Error(error)
    }
}

exports.checkout = async (id, customer_id, inFull) => {
    try {
        const order = await db.findOne(id)

        if(!order) throw new Error('order not found')

        let billing_amount = order.total
        let billing_status = 1
        if(inFull && inFull == 'false') {
            billing_amount = billing_amount/2
            billing_status = 0
        }

            await axios.post('http://localhost:3003/api/billing', {
            amount: billing_amount, 
            payment_method: 'debit card', 
            payment_date: new Date(), 
            customer_id: customer_id, 
            order_id: order.id,
            isCompleted: billing_status
        })

        return 'payment successful'
    } catch (error) {
        if(error.response) throw new Error(error.response.data.message)
        throw new Error(error)
    }
}

exports.updateStatus = async (id, status) => {
    try {
        const res = await db.updateStatus(id, status);

        return res
    } catch (error) {
        throw new Error(error)
    }
}

exports.completeOrder = async (id) => {
    try {
        const order = await db.findOne(id)
        if(!order)  throw new Error("not found")

        const {data} = await axios.get(`http://localhost:3003/api/billing/${id}`)
        if(!data)  throw new Error("not found")
        if(data.isCompleted !== 0)  throw new Error("Customer already paid in full")

       const result = await axios.patch(`http://localhost:3003/api/billing/${data.id}`, {amount: order.total})
        console.log(result)
        
        return 'success'
    } catch (error) {
        throw new Error(error)
    }
}

exports.getOrder = async (id) => {
    try {
        const res = await db.findOne(id);
        if(!res) throw new Error(res)
        const {data} = await axios.get(`http://localhost:3003/api/billing/${id}`)

        return {order: {...res, billing: data}}
    } catch (error) {
        throw new Error(error)
    }
}
