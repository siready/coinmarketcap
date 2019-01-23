import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { IAppState } from 'src/app/store/store.model';

import { AvailableCurrencies, ICurrencyItemType, ICurrencyListAPI } from './cryptocurrency-store.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private readonly uiCurrency$: Observable<AvailableCurrencies>;

  constructor(private http: HttpClient, ngRedux: NgRedux<IAppState>) {
    this.uiCurrency$ = ngRedux.select(x => x.currencyModule.settings.uiCurrency);
  }

  getList(): Observable<ICurrencyItemType> {
    return this.uiCurrency$.pipe(
      take(1),
      switchMap(uiCurrency => this.http.get<ICurrencyListAPI>('/api/currency/' + AvailableCurrencies[uiCurrency])),
      map(items => items.data)
    );
  }
}
