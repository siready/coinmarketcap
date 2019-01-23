import { Injectable } from '@angular/core';
import { CurrencyEpics } from '../cryptocurrency/store/currency-store.epics';

@Injectable({
  providedIn: 'root'
})
export class RootEpics {
  constructor(private currencyEpics: CurrencyEpics) {}

  createEpics() {
    return [
      this.currencyEpics.loadCurrencyEpic,
      this.currencyEpics.currencyChangedEpic
    ];
  }
}
