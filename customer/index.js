const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const PORT = 3000
const app = express()

app.use(express.json())
app.use(cors())

let customers = [];

app.post('/', async (req, res) => {
    const {email, first_name, last_name, address, password} = req.body

    const hashedPassword = await bcrypt.hash(password, 10)//This is the hashed password

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

    res.send({...customers[customers.length -1], password: undefined})
})

app.post('/login', async(req, res) => {
    try {
    const {email, password} = req.body

    const customer = customers.find((el) => el.email == email)

    if(!customer) throw new Error('incorrect email or password')

    if(!(await bcrypt.compare(password, customer.password))) {
        throw new Error('incorrect email or password')
    }

    let token =  jwt.sign({id: customer.id}, 'secret', {expiresIn: '30d'})

    res.status(200).json({
        token,
        customer: {...customer, password: undefined},
    })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message,
        })
    }
})


app.listen(PORT, () => {
    console.log(`Customer service running on port ${PORT}`)
})

