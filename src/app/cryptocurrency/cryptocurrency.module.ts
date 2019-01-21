import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NavigationModule } from '../ui/navigation/navigation.module';
import { CryptocurrencyRoutingModule } from './cryptocurrency-routing.module';
import { CryptocurrencyComponent } from './pages/cryptocurrency/cryptocurrency.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ListComponent } from './pages/list/list.component';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  declarations: [
    CryptocurrencyComponent,
    ListComponent,
    DetailComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    CryptocurrencyRoutingModule,
    NavigationModule
  ]
})
export class CryptocurrencyModule { }
