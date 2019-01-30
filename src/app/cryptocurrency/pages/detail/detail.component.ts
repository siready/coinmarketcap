import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IAppState } from 'src/app/store/store.model';

import { AvailableCurrencies, ICurrency } from '../../store/cryptocurrency-store.model';

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
    this.item$ = ngRedux.select(x => x.currencyModule.currencies.items).pipe(
      map(items => items[route.snapshot.params.slug]),
      filter(Boolean)
    );
  }

  ngOnInit(): void {
    this.uiCurrency = AvailableCurrencies[this.ngRedux.getState().currencyModule.settings.uiCurrency];
  }

}
