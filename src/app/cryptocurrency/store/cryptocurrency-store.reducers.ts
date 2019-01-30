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

export const currenciesReducer: Reducer<ICurrencyList, CurrencyActionType> = (
  state = CURRENCIES_INIT_STATE,
  action
): ICurrencyList => {
  switch (action.type) {
    case CurrencyActions.CURRENCY_LOAD_STARTED:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CurrencyActions.CURRENCY_LOAD_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CurrencyActions.CURRENCY_LOAD_SUCCEEDED:
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: null
      };
  }
  return state;
};

export const settingsReducer: Reducer<ISettings, SettingsActionType> = (
  state = SETTINGS_INIT_STATE,
  action
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
