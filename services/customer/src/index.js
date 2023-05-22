require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Route = require('./routes');
const db = require('./utils/dbConfig')

const app = express()

app.use(express.json())
app.use(cors())


app.use('/api/customers', Route)

db.createDB(process.env.DATABASE)
app.listen(process.env.PORT, () => {
    console.log(`Customer service running on port ${process.env.PORT}`)
})

