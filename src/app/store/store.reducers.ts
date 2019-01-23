import { combineReducers } from 'redux';

import { cryptocurrencyReducer } from '../cryptocurrency/store/cryptocurrency-store.reducers';
import { IAppState } from './store.model';

// Define the global store shape
export const rootReducer = combineReducers<IAppState>({
  currencyModule: cryptocurrencyReducer
});
