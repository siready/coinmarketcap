import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ErrorFluxStandardAction, FluxStandardAction } from 'flux-standard-action';

import { ICurrencyItemType } from './cryptocurrency-store.model';

// Flux-standard-action gives us stronger typing of our actions.
/**
 * TODO: Wait until https://github.com/redux-utilities/flux-standard-action/pull/114
 *  is implemented, as currently it is not supported to enforce action to specific type
 * - as in: ErrorFluxStandardAction is restricted only to action type CURRENCY_LOAD_FAILED
 */
export type CurrencyActionType = FluxStandardAction<ICurrencyItemType> | ErrorFluxStandardAction<Error>;

@Injectable({
  providedIn: 'root'
})
export class CurrencyActions {

  static readonly CURRENCY_LOAD_ALL = 'CURRENCY_LOAD_ALL';
  static readonly CURRENCY_LOAD_STARTED = 'CURRENCY_LOAD_STARTED';
  static readonly CURRENCY_LOAD_SUCCEEDED = 'CURRENCY_LOAD_SUCCEEDED';
  static readonly CURRENCY_LOAD_FAILED = 'CURRENCY_LOAD_FAILED';

  @dispatch()
  loadAll(): CurrencyActionType {
    return {
      type: CurrencyActions.CURRENCY_LOAD_ALL,
      payload: undefined
    };
  }

  loadStarted(): CurrencyActionType {
    return {
      type: CurrencyActions.CURRENCY_LOAD_STARTED,
      payload: undefined,
    };
  }

  loadSucceeded(payload: ICurrencyItemType): CurrencyActionType {
    return {
      type: CurrencyActions.CURRENCY_LOAD_SUCCEEDED,
      payload,
    };
  }

  loadFailed(error: Error): CurrencyActionType {
    return {
      type: CurrencyActions.CURRENCY_LOAD_FAILED,
      payload: error,
      error: true
    };
  }

}
