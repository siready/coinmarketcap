import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { pipe as ramdaPipe, prop, sortBy, values } from 'ramda';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAppState } from 'src/app/store/store.model';

import { AvailableCurrencies, ICurrency, ICurrencyItemType } from '../../store/cryptocurrency-store.model';

export const sortItems = (items$: Observable<ICurrencyItemType>) =>
  items$.pipe(
    map(
      ramdaPipe(
        values,
        sortBy(prop('rank')),
      )
    )
  );

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  items$: Observable<ICurrency[]>;
  loading$: Observable<boolean>;
  uiCurrency: string;

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.items$ = sortItems(ngRedux.select(x => x.currencyModule.currencies.items));
    this.loading$ = ngRedux.select(x => x.currencyModule.currencies.loading);
  }

  ngOnInit(): void {
    this.uiCurrency = AvailableCurrencies[this.ngRedux.getState().currencyModule.settings.uiCurrency];
  }

  trackByFn(_index: number, item: ICurrency): number {
    return item.id;
  }

}
