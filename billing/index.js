const express = require('express')
const cors = require('cors')

const PORT = 3002
const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send('testing')
})


app.listen(PORT, () => {
    console.log(`Billing service running on port ${PORT}`)
})

