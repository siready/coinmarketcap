const express = require('express');
const axios = require('axios');
const R = require('ramda');

// set express main variables
const app = express();
const router = express.Router();
const port = parseInt(process.env.PORT || '3000', 10);

const coinMarketCapApiKey = '';

// verify api key
if (coinMarketCapApiKey === '') {
  console.error('ERROR - please enter CoinMarketCap API key in server.js.');
  return -1;
}

// factories to transform data structure
const quoteFactory = quote => ({
  price: quote.price,
  volumeLast24Hours: quote.volume_24h,
  percentChange1Hour: quote.percent_change_1h,
  percentChange24Hours: quote.percent_change_24h,
  percentChange7Days: quote.percent_change_7d,
  marketCapitalization: quote.market_cap
});

const currencyFactoryMap = quote => R.map(quoteFactory, quote);

const currencyFactory = currency => ({
  id: currency.id,
  name: currency.name,
  symbol: currency.symbol,
  slug: currency.slug,
  circulatingSupply: currency.circulating_supply,
  totalSupply: currency.total_supply,
  rank: currency.cmc_rank,
  quote: currencyFactoryMap(currency.quote)
});

// set header for CoinMarketCap API requests
const coinMarketCapApi = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com/v1/',
  timeout: 10000,
  headers: {'X-CMC_PRO_API_KEY': ''}
});


// set http resources
router.get('/currency/:currencyName', async(request, response) => {
  if (!request.params.currencyName || !['USD', 'EUR', 'CNY'].includes(request.params.currencyName)) {
    return response.status(400).send();
  }

  try {
    const currencyPromise = coinMarketCapApi.get('cryptocurrency/listings/latest?start=1&limit=100&convert=' + request.params.currencyName);
    const bitcoinPromise = coinMarketCapApi.get('cryptocurrency/listings/latest?start=1&limit=100&convert=BTC');
    const [currencyRequest, bitcoinRequest] = await axios.all([currencyPromise, bitcoinPromise]);

    let responseData = R.indexBy(R.prop('slug'), currencyRequest.data.data.map(currencyFactory));

    bitcoinRequest.data.data.forEach(currency =>
      responseData[currency.slug].quote = R.mergeAll([
        responseData[currency.slug].quote,
        currencyFactoryMap(currency.quote)
      ])
    );

    return response.send({ data: responseData });
  }
  catch (exception) {
    console.log(exception);
    response.status(500).send();
  }
});

// run server
app.use('/api', router).listen(port, () => console.log('Server started.'));
