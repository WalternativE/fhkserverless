# FHK Bitcoin "Calculator"

## Team
- Carmen Sommer
- Gregor Beyerle

## Why so many files?

One folder includes the files for a 'vanilla' Azure Function deployment, the other is set up as a [serverless framework](https://serverless.com/framework/) deployment.

In both cases the same functionality is deployed.

## How to call it

Direct a HTTP POST request to the Azure Function endpoint with a body of the following form.

```json
{
  "symbol": "EUR"
}
```

The function is going to return a `HTTP OK` with the __BTC__ trading information related to this symbol in the following form.

```json
{
  "15m": 5971.37,
  "last": 5971.37,
  "buy": 5972.46,
  "sell": 5970.27,
  "symbol": "€"
}
```

The function works as a combined proxy and filter for the [blockchain info](https://blockchain.info/api/exchange_rates_api) ticker API.