const fs = require('fs')
const path = require('path')
const csv = require('csv-parser');
const router = require('express').Router()
const web = require('./web.js')

let StockData = []
let ProfitStocks = []

/* Initialize Stock Data */
initializeStockData = function() {
    console.log("[Stock] Initialize called")
    fs.createReadStream('intraday_data.csv')
        .pipe(csv())
        .on('data', (row) => {
            StockData.push(row);
			let pfactor = Number(row.Close) - Number(row.Open);
			if(pfactor > 0) {
				let profit = pfactor * row.Volume;
				ProfitStocks.push({Symbol: row.Symbol, Profit: profit})
			}
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        });
}

router.get('/allStocks/', (request, response) => {
    console.log("[Stock] handling " + request.url)
    web.displayJson(response, StockData)
})

router.get('/topStocks/:records', (request, response) => {
    console.log("[Stock] handling " + request.url)
    const records = Number(request.params.records)
    //sort data by close value of the stock
    var byProfit = ProfitStocks.slice(0);
    byProfit.sort((a, b) => {
        return Number(b.Profit) - Number(a.Profit);
    })
    web.displayJson(response, byProfit.slice(0, records))
})

router.get('/allStocks/:symbol', (request, response) => {
    console.log("[Stock] handling " + request.url)
    const symbol = request.params.symbol
    web.displayJson(response, StockData.filter(obj => obj.Symbol == symbol))
})

module.exports = {
    router:router,
    initializeStockData:initializeStockData
}