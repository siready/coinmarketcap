import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ErrorFluxStandardAction, FluxStandardAction } from 'flux-standard-action';

import { ICurrencyItemType } from './cryptocurrency-store.model';

// Flux-standard-action gives us stronger typing of our actions.
// TODO: https://github.com/redux-utilities/flux-standard-action/pull/114 will simplify interfaces below.
interface CurrencyActionsWithoutPayload extends FluxStandardAction<ICurrencyItemType> {
  type: typeof CurrencyActions.CURRENCY_LOAD_ALL
  | typeof CurrencyActions.CURRENCY_LOAD_STARTED;
}
interface CurrencyActionsWithPayload extends FluxStandardAction<ICurrencyItemType> {
  type: typeof CurrencyActions.CURRENCY_LOAD_SUCCEEDED;
  payload: ICurrencyItemType;
}
interface CurrencyActionsWithError extends ErrorFluxStandardAction<Error> {
  type: typeof CurrencyActions.CURRENCY_LOAD_FAILED;
  payload: Error;
}
export type CurrencyActionType = CurrencyActionsWithoutPayload | CurrencyActionsWithPayload | CurrencyActionsWithError;

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
    };
  }

  loadStarted(): CurrencyActionType {
    return {
      type: CurrencyActions.CURRENCY_LOAD_STARTED,
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
