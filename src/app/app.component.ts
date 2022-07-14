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
  randomRates!: Rates;
  showTable: boolean = true;

  constructor(
    private exchangeRateService: ExchangeRateService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.exchangeRateService.getCurrency().subscribe(
      (data) => {
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
    this.exchangeRateService.getCurrency().subscribe(
      (data) => {
        console.log(Object.keys(data.rates));
        let randomData: string[] = [];
        randomData = this.getMultipleRandom(Object.keys(data.rates), 12);
        this.filteredRates = this.filterRates(data.rates, randomData);
      },
      (error) => {
        this.errorService.handleError(error);
      }
    );
  }
  // delete this later
  toggleTable(): void {
    this.showTable = !this.showTable;
  }
  //probably delete this later
  getRandomNumber() {
    return Math.floor(Math.random() * 168);
  }

  getMultipleRandom(arr: any, num: number | undefined) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  }
}
