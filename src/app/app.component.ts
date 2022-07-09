import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from './core/service/exchange-rate.service';
import { ErrorService } from './core/service/error.service';
import { Rates, RatesResponse } from './shared/models/exchange-rate.mode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  filteredRates!: Rates;

  constructor(
    private exchangeRateService: ExchangeRateService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.exchangeRateService.getCurrency().subscribe(
      (data) => {
        this.filteredRates = this.filterRates(data.rates, [
          'USD',
          'GBP',
          'EUR',
          'RSD',
        ]);
      },
      (error) => {
        this.errorService.handleError(error);
      }
    );
  }

  private filterRates(rates: Rates, filteredNames: string[]): Rates {
    let filteredRates: Rates = {};

    Object.entries(rates).forEach((item) => {
      if (filteredNames.includes(item[0])) {
        filteredRates[item[0]] = item[1];
      }
    });
    return filteredRates;
  }
}
