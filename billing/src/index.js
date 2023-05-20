require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Route = require('./routes')
const db = require('./utils/dbConfig')

const PORT = 3002
const app = express()

app.use(cors())
app.use(express.json())


app.use('/api/billing', Route)

db.createDB(process.env.DATABASE)
app.listen(PORT, () => {
    console.log(`Billing service running on port ${PORT}`)
})

