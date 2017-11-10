'use strict';

/* eslint-disable no-param-reassign */

module.exports.filterticker = function (context, req) {
  const https = require('https');

  if (req.body && req.body.symbol) {
    const tickerEndpoint = "https://blockchain.info/de/ticker";

    let respAsString = '';

    https.get(tickerEndpoint, (resp) => {
      resp.on('data', (chunk) => {
        respAsString += chunk;
      });

      resp.on('end', () => {
        let r = JSON.parse(respAsString);
        let filteredForSymbol = r[req.body.symbol];

        if (filteredForSymbol === undefined || filteredForSymbol === null) {
          context.res = {
            status: 404,
            body: "No trading information for this symbol"
          }
        } else {
          context.res = {
            body: filteredForSymbol
          }
        }

        context.done();
      });
    }).on('error', (err) => {
      context.log("Error: " + err.message);
      context.res = {
        status: 400,
        body: "The resource failed with: " + err.message
      };
      context.done();
    });
  } else {
    context.res = {
      status: 400,
      body: "Please specify the symbol for which you want to have trading info."
    };
    context.done();
  }
};