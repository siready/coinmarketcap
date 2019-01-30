import { Injectable } from '@angular/core';
import { ActionsObservable, Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, ignoreElements, map, startWith, switchMap, tap } from 'rxjs/operators';
import { IAppState } from 'src/app/store/store.model';

import { CurrencyActions, CurrencyActionType } from './currency-store.actions';
import { CurrencyService } from './currency.service';
import { SettingsActions, SettingsActionType } from './settings-store.actions';

@Injectable({
  providedIn: 'root'
})
export class CurrencyEpics {

  constructor(private currencyService: CurrencyService, private actions: CurrencyActions) { }

  loadCurrencyEpic: Epic<CurrencyActionType, CurrencyActionType, IAppState> = (action$) => {
    return action$.pipe(
      ofType(CurrencyActions.CURRENCY_LOAD_ALL),
      switchMap(() =>
        this.currencyService.getList().pipe(
          map(data => this.actions.loadSucceeded(data)),
          catchError(response => of(
            this.actions.loadFailed(new Error(response.status))
          )),
          startWith(this.actions.loadStarted())
        )
      )
    );
  }

  currencyChangedEpic = (action$: ActionsObservable<SettingsActionType>) => {
    return action$.pipe(
      ofType(SettingsActions.SETTINGS_SAVE),
      tap(() => this.actions.loadAll()),
      ignoreElements()
    );
  }

}
