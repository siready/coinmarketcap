import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CurrencyActions } from '../../store/currency-store.actions';

@Component({
  selector: 'app-refresh-currency-link',
  templateUrl: './refresh-currency-link.component.html',
  styleUrls: ['./refresh-currency-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RefreshCurrencyLinkComponent {

  constructor(private currencyActions: CurrencyActions) { }

  triggerRefresh() {
    this.currencyActions.loadAll();
  }

}
