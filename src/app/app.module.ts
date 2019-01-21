import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CryptocurrencyModule } from './cryptocurrency/cryptocurrency.module';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CryptocurrencyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
