import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ErrorService } from 'app/core/service/error.service';
import { ExchangeRateService } from 'app/core/service/exchange-rate.service';
import { Rates, RatesResponse } from 'app/shared/models/exchange-rate.mode';
import { COMMON_RATES, MAIN_RATE } from './rates.const';
import { CURRENCY_MAPPING } from 'app/shared/consts/currency-mapping';

@Component({
  selector: 'app-exchange-rates-table',
  templateUrl: './exchange-rates-table.component.html',
  styleUrls: ['./exchange-rates-table.component.scss'],
})
export class ExchangeRatesTableComponent implements OnInit {
  filteredRates!: Rates;
  allRates!: Rates;
  selectedOneCurrency: string = '';
  randomRates: string[] = [];
  exchangeListDate: string = '';
  countryNames: {} = CURRENCY_MAPPING;
  currencyInHeadline = MAIN_RATE;

  constructor(
    private exchangeRateService: ExchangeRateService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.exchangeRateService.getCurrency(MAIN_RATE).subscribe(
      (data) => {
        this.allRates = data.rates;
        this.exchangeListDate = data.date;
        this.filteredRates = this.filterRates(data.rates, COMMON_RATES);
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

  selectCurrency(even: MatSelectChange): void {
    this.selectedOneCurrency = even.value;
    this.currencyInHeadline = even.value;
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
