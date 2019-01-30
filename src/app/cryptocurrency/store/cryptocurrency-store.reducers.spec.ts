import { currencyItemTypeMock } from './cryptocurrency-store.mocks';
import { ICurrencyItemType, AvailableCurrencies } from './cryptocurrency-store.model';
import { currenciesReducer, settingsReducer } from './cryptocurrency-store.reducers';
import { CurrencyActions } from './currency-store.actions';
import { SettingsActions } from './settings-store.actions';

describe('Cryptocurrency reducers', () => {

  it('should handle CURRENCY_LOAD_STARTED', () => {
    expect(
      currenciesReducer(undefined, { type: CurrencyActions.CURRENCY_LOAD_STARTED })
    ).toEqual({
      items: {},
      loading: true,
      error: null
    });
  });

  it('should handle CURRENCY_LOAD_FAILED', () => {
    expect(
      currenciesReducer(undefined, {
        type: CurrencyActions.CURRENCY_LOAD_FAILED,
        payload: new Error('testing'),
        error: true
      })
    ).toEqual({
      items: {},
      loading: false,
      error: new Error('testing')
    });
  });

  it('should handle CURRENCY_LOAD_SUCCEEDED', () => {
    expect(
      currenciesReducer(undefined, {
        type: CurrencyActions.CURRENCY_LOAD_SUCCEEDED,
        payload: (currencyItemTypeMock as ICurrencyItemType)
      })
    ).toEqual({
      items: (currencyItemTypeMock as ICurrencyItemType),
      loading: false,
      error: null
    });
  });

  it('should handle SETTINGS_SAVE', () => {
    expect(
      settingsReducer(undefined, {
        type: SettingsActions.SETTINGS_SAVE,
        payload: { uiCurrency: AvailableCurrencies.EUR }
      })
    ).toEqual({
      uiCurrency: AvailableCurrencies.EUR
    });
  });

});
