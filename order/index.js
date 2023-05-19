const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const PORT = 3001
const app = express()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('testing')
})

const delay = (ms) => {
    const startPoint = new Date().getTime()
    while (new Date().getTime() - startPoint <= ms){
        if(new Date().getTime() - startPoint == ms) console.log('purchase completed!')
    }
}

const orders = []
app.post('/checkout', async(req, res) => {
    try {
        //1) verify customer from jwt
        if(!req.headers || !req.headers.authorization) return res.status(400).send({message: 'Unauthorized access'})

        let token = req.headers.authorization.split('Bearer ')[1]
        const customer = await jwt.verify(token, 'secret')
        if(!customer) throw new Error("Unauthorized access")

        //2) store customer order
        const {qty, price} = req.body

        orders.push({
            id: orders.length + 1,
            customer_id: customer.id,
            price,
            qty,
            total: price * qty,
            status: 'pending'
        })


        //3) set timeout for 5 seconds to simulate payment
        delay(5000)

        //4) add payment to billing service

        res.status(201).json({
            order: orders[orders.length - 1]
        })
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})


app.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`)
})

