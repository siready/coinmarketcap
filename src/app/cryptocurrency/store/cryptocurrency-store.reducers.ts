import { combineReducers, Reducer } from 'redux';

import {
  CURRENCIES_INIT_STATE,
  ICryptocurrencyStore,
  ICurrencyList,
  ISettings,
  SETTINGS_INIT_STATE,
} from './cryptocurrency-store.model';
import { CurrencyActions, CurrencyActionType } from './currency-store.actions';
import { SettingsActions, SettingsActionType } from './settings-store.actions';

export const currenciesReducer: Reducer<ICurrencyList> = (
  state = CURRENCIES_INIT_STATE,
  action: CurrencyActionType,
): ICurrencyList => {
  switch (action.type) {
    case CurrencyActions.CURRENCY_LOAD_STARTED:
      return {
        ...state,
        items: {},
        loading: true,
        error: null
      };
    case CurrencyActions.CURRENCY_LOAD_FAILED:
      return {
        ...state,
        items: {},
        loading: false,
        error: action.error
      };
    case CurrencyActions.CURRENCY_LOAD_SUCCEEDED:
      return {
        ...state,
        items: action.payload || {},
        loading: false,
        error: null
      };
  }
  return state;
};

export const settingsReducer: Reducer<ISettings> = (
  state = SETTINGS_INIT_STATE,
  action: SettingsActionType,
): ISettings => {
  switch (action.type) {
    case SettingsActions.SETTINGS_SAVE:
      return Object.assign(
        {},
        { ...state },
        { ...action.payload }
      );
  }
  return state;
};

export const cryptocurrencyReducer = combineReducers<ICryptocurrencyStore>({
  currencies: currenciesReducer,
  settings: settingsReducer,
});
