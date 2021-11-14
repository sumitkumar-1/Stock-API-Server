const express = require('express')
const stock = require('./stock')
const app = express()
const config = require('./config')

stock.initializeStockData();
app.use(config.baseHref, stock.router);

app.listen(config.port, function () {
    console.log("statejs listening at http://localhost: " + config.port)
})