import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter as ramdaFilter, nth, pipe as ramdaPipe, values } from 'ramda';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IAppState } from 'src/app/store/store.model';

import { AvailableCurrencies, ICurrency, ICurrencyItemType } from '../../store/cryptocurrency-store.model';

export const matchCurrentItem = (items$: Observable<ICurrencyItemType>, slug: string) =>
  items$.pipe(
    map(
      ramdaPipe(
        ramdaFilter((currency: ICurrency) => currency.slug === slug),
        values,
        nth(0)
      )
    ),
    filter(Boolean)
  );

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit {

  item$: Observable<ICurrency>;
  uiCurrency: string;

  constructor(private ngRedux: NgRedux<IAppState>, route: ActivatedRoute) {
    this.item$ = matchCurrentItem(
      ngRedux.select(x => x.currencyModule.currencies.items),
      route.snapshot.params.slug
    );
  }

  ngOnInit(): void {
    this.uiCurrency = AvailableCurrencies[this.ngRedux.getState().currencyModule.settings.uiCurrency];
  }

}
