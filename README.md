# CoinMarketCap application

Show top 100 cryptocurrencies via CoinMarketCap API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

CoinMarketCap API key has to be set in server.js.

```
const coinMarketCapApiKey = 'your-API-key-goes-here';
```

### Installing

Install npm packages with the command:

```
npm install
```

After all packages are installed, start the development environment with command:

```
npm start
```
It will start node server and angular-cli development environment in parallel.

## Running tests

Run the following command:

```
npm test
```

## Deployment

Apart from angular-cli build system, please make sure to serve _server.js_ node application.

## Technologies used

1. Client
* [Angular](https://github.com/angular/angular)
* [Angular CLI](https://github.com/angular/angular-cli)
* [RxJS](https://github.com/ReactiveX/RxJS)
* [Redux](https://github.com/reduxjs/redux)
* [angular-redux](https://github.com/angular-redux/platform)
* [redux-observable](https://github.com/redux-observable/redux-observable)
* [Bootstrap](https://github.com/twbs/bootstrap)
* [angular-fontawesome](https://github.com/FortAwesome/angular-fontawesome)
* [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action)
* [Ramda](https://github.com/ramda/ramda)
2. Server
* [express](https://github.com/expressjs/express)
* [axios](https://github.com/axios/axios)
3. Tests
* [Spectator](https://github.com/NetanelBasal/spectator)
* [ng-mocks](https://github.com/ike18t/ng-mocks)
* [jasmine-marbles](https://github.com/synapse-wireless-labs/jasmine-marbles)
 
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
