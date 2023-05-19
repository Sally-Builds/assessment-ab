const express = require('express')
const cors = require('cors')
const Route = require('./routes');

const PORT = 3000
const app = express()

app.use(express.json())
app.use(cors())


app.use('/api/customers', Route)


app.listen(PORT, () => {
    console.log(`Customer service running on port ${PORT}`)
})

