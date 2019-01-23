export interface ICryptocurrencyStore {
  currencies: ICurrencyList;
  settings: ISettings;
}

export interface ICurrencyItemType {
  [key: string]: ICurrency;
}

export interface IQuoteType {
  [key: string]: IQuote;
}

export interface ICurrencyListAPI {
  data: ICurrencyItemType;
}

export interface ICurrencyList {
  items: ICurrencyItemType;
  loading: boolean;
  error: any;
}

export interface ICurrency {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  circulatingSupply: number;
  totalSupply: number;
  rank: number;
  quote: IQuoteType;
}

export interface IQuote {
  price: number;
  volumeLast24Hours: number;
  percentChange1Hour: number;
  percentChange24Hours: number;
  percentChange7Days: number;
  marketCapitalization: number;
}

export enum AvailableCurrencies {
  USD,
  EUR,
  CNY
}

export interface ISettings {
  uiCurrency: AvailableCurrencies;
}

export const CURRENCIES_INIT_STATE: ICurrencyList = {
  items: {},
  loading: false,
  error: null
};

export const SETTINGS_INIT_STATE: ISettings = {
  uiCurrency: AvailableCurrencies.USD
};

export const CRYPTOCURRENCY_MODULE_INIT_STATE: ICryptocurrencyStore = {
  currencies: CURRENCIES_INIT_STATE,
  settings: SETTINGS_INIT_STATE
};
