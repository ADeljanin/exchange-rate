import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExchangeRateService } from './core/service/exchange-rate.service';
import { HttpClientModule } from '@angular/common/http';
import { ExchangeRatesTableComponent } from './exchange-rates-table/exchange-rates-table.component';
import { ExchangeRateCalculatorComponent } from './exchange-rate-calculator/exchange-rate-calculator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ExchangeRatesTableComponent,
    ExchangeRateCalculatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [ExchangeRateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
