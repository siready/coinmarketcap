import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cryptocurrency',
  templateUrl: './cryptocurrency.component.html',
  styleUrls: ['./cryptocurrency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CryptocurrencyComponent {

  constructor(private router: Router) { }

  homeButtonClicked(): void {
    this.router.navigate(['']);
  }

  settingsButtonClicked(): void {
    this.router.navigate(['settings']);
  }

}
