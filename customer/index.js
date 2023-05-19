const express = require('express')
const cors = require('cors')

const PORT = 3000
const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send('testing')
})


app.listen(PORT, () => {
    console.log(`Customer service running on port ${PORT}`)
})

