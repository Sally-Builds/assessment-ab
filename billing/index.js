const express = require('express')
const cors = require('cors')

const PORT = 3002
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('testing')
})


const payments = []

app.post('/', async (req, res) => {
try {
    const {order_id, amount, payment_method, payment_date, customer_id, isComplete} = req.body

    payments.push({
        id: payments.length + 1,
        customer_id,
        order_id,
        amount,
        payment_date,
        payment_method,
        isComplete
    })

    console.log(req.body)
    console.log(payments)
    res.status(201).json({payment: payments[payments.length - 1]})
} catch (error) {
    console.log(error)
    res.status(500).json(error)
}
})


app.listen(PORT, () => {
    console.log(`Billing service running on port ${PORT}`)
})

