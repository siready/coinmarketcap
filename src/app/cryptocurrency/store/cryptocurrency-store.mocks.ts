import { ICurrencyItemType, IQuoteType } from './cryptocurrency-store.model';

export const quoteTypeMock: IQuoteType = {
  USD: {
    price: 1,
    volumeLast24Hours: 1,
    percentChange1Hour: 0.25,
    percentChange24Hours: 0.15,
    percentChange7Days: 0.1,
    marketCapitalization: 1
  }
};

export const currencyItemTypeMock: ICurrencyItemType = {
  bitcoin: {
    id: 0,
    name: 'bitcoin',
    symbol: 'BTC',
    slug: 'bitcoin',
    circulatingSupply: 1,
    totalSupply: 1,
    rank: 1,
    quote: quoteTypeMock
  }
};
