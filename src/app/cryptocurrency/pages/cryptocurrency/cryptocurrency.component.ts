import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { CurrencyActions } from '../../store/currency-store.actions';

@Component({
  selector: 'app-cryptocurrency',
  templateUrl: './cryptocurrency.component.html',
  styleUrls: ['./cryptocurrency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CryptocurrencyComponent {

  constructor(private router: Router, currencyActions: CurrencyActions) {
    currencyActions.loadAll();
  }

  homeButtonClicked(): void {
    this.router.navigate(['']);
  }

  settingsButtonClicked(): void {
    this.router.navigate(['settings']);
  }

}
