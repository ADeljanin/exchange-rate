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
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  filteredRates!: Rates;
  allRates!: Rates;
  selectedOneCurrency: string = '';
  randomRates: string[] = [];

  constructor(
    private exchangeRateService: ExchangeRateService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.exchangeRateService.getCurrency('RSD').subscribe(
      (data) => {
        this.allRates = data.rates;
        this.filteredRates = this.filterRates(data.rates, [
          'USD',
          'GBP',
          'EUR',
          'AUD',
          'CAD',
          'CHF',
          'BAM',
          'NOK',
          'JPY',
          'TRY',
          'HRK',
          'HUF',
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

  randomData() {
    this.exchangeRateService.getCurrency('RSD').subscribe(
      (data) => {
        let randomData: string[] = [];
        randomData = this.getMultipleRandom(Object.keys(data.rates), 12);
        this.filteredRates = this.filterRates(data.rates, randomData);
        this.randomRates = randomData;
      },
      (error) => {
        this.errorService.handleError(error);
      }
    );
  }

  getMultipleRandom(arr: any, num: number | undefined) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  }

  selectCurrency(value: string): void {
    this.selectedOneCurrency = value;
    this.exchangeRateService.getCurrency(this.selectedOneCurrency).subscribe(
      (data) => {
        this.filteredRates = this.filterRates(data.rates, this.randomRates);
      },
      (error) => {
        this.errorService.handleError(error);
      }
    );
  }
}
