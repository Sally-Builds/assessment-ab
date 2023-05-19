const express = require('express')
const cors = require('cors')

const PORT = 3002
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('testing')
})


app.post('/', async (req, res) => {
    console.log(req.body)

    res.send('done')
})


app.listen(PORT, () => {
    console.log(`Billing service running on port ${PORT}`)
})

