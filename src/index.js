require('dotenv').config()
const express = require('express')

const {ROUTES} = require("./routes");

const {setupProxies} = require("./proxy");

const app = express()


setupProxies(app, ROUTES);

app.listen(process.env.PORT, () => {
    console.log(`Assessment-ab_inbev listening at http://localhost:${process.env.PORT}`)
})