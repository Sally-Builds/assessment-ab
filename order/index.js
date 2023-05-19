const express = require('express')
const cors = require('cors')

const PORT = 3001
const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send('testing')
})


app.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`)
})
