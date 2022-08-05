import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeRateCalculatorComponent } from './exchange-rate-calculator/exchange-rate-calculator.component';
import { ExchangeRatesTableComponent } from './exchange-rates-table/exchange-rates-table.component';

const routes: Routes = [
  {
    path: '',
    component: ExchangeRatesTableComponent,
  },
  {
    path: 'calculator',
    component: ExchangeRateCalculatorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
