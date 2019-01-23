import { ICryptocurrencyStore } from '../cryptocurrency/store/cryptocurrency-store.model';

export interface IAppState {
  currencyModule: ICryptocurrencyStore;
}
