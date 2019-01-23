import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { ICurrencyItemType } from './cryptocurrency-store.model';

// Flux-standard-action gives us stronger typing of our actions.
export type CurrencyActionType = FluxStandardAction<ICurrencyItemType>;

@Injectable({
  providedIn: 'root'
})
export class CurrencyActions {

  static readonly CURRENCY_LOAD_ALL = 'CURRENCY_LOAD_ALL';
  static readonly CURRENCY_LOAD_STARTED = 'CURRENCY_LOAD_STARTED';
  static readonly CURRENCY_LOAD_SUCCEEDED = 'CURRENCY_LOAD_SUCCEEDED';
  static readonly CURRENCY_LOAD_FAILED = 'CURRENCY_LOAD_FAILED';

  @dispatch()
  loadAll = (): CurrencyActionType => ({
    type: CurrencyActions.CURRENCY_LOAD_ALL,
    payload: undefined,
  })

  loadStarted = (): CurrencyActionType => ({
    type: CurrencyActions.CURRENCY_LOAD_STARTED,
    payload: undefined,
  })

  loadSucceeded = (
    payload: ICurrencyItemType,
  ): CurrencyActionType => ({
    type: CurrencyActions.CURRENCY_LOAD_SUCCEEDED,
    payload,
  })

  loadFailed = (error: any): CurrencyActionType => ({
    type: CurrencyActions.CURRENCY_LOAD_FAILED,
    payload: undefined,
    error: !!error,
  })

}
