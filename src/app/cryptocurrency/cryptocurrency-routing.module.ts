import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CryptocurrencyComponent } from './pages/cryptocurrency/cryptocurrency.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ListComponent } from './pages/list/list.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {
    path: '', component: CryptocurrencyComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'currency/:slug', component: DetailComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '**', redirectTo: '' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CryptocurrencyRoutingModule { }
