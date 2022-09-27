import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ErrorService } from 'app/core/service/error.service';
import { ExchangeRateService } from 'app/core/service/exchange-rate.service';
import {
  ExtendedRate,
  Rates,
  RatesResponse,
} from 'app/shared/models/exchange-rate.mode';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { COMMON_RATES, MAIN_RATE } from './rates.const';
import { CURRENCY_MAPPING } from 'app/shared/consts/currency-mapping';

@Component({
  selector: 'app-exchange-rates-table',
  templateUrl: './exchange-rates-table.component.html',
  styleUrls: ['./exchange-rates-table.component.scss'],
})
export class ExchangeRatesTableComponent implements OnInit {
  filteredRates: ExtendedRate[] = [];
  allRates!: Rates;
  selectedOneCurrency: string = '';
  randomRates: string[] = [];
  exchangeListDate: string = '';
  currencyInHeadline = MAIN_RATE;
  styleContainer = false;
  hideColumn = false;
  styleBtns = false;
  currencyInitial = '';

  constructor(
    private exchangeRateService: ExchangeRateService,
    private errorService: ErrorService,
    private breakpointService: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.breakpointService
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        this.styleContainer = false;
        this.hideColumn = false;
        this.styleBtns = false;
        if (result.breakpoints[Breakpoints.Small]) {
          this.styleContainer = true;
          this.hideColumn = true;
          this.styleBtns = true;
        }
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.styleContainer = true;
          this.hideColumn = true;
          this.styleBtns = true;
        }
      });
  }

  loadData() {
    this.exchangeRateService.getCurrency(MAIN_RATE).subscribe(
      (data) => {
        this.allRates = data.rates;
        this.exchangeListDate = data.date;
        this.filteredRates = this.getExtendedFilteredRates(
          data.rates,
          COMMON_RATES
        );
      },
      (error) => {
        this.errorService.handleError(error);
      }
    );
    this.currencyInHeadline = MAIN_RATE;
    this.currencyInitial = '';
  }

  private getExtendedFilteredRates(
    rates: Rates,
    filteredCurrenciesNames: string[]
  ): ExtendedRate[] {
    let extendedRates: ExtendedRate[] = [];

    Object.entries(rates).forEach((item) => {
      const currentCurrency = item[0];
      if (filteredCurrenciesNames.includes(currentCurrency)) {
        const findMapping = CURRENCY_MAPPING[currentCurrency];
        extendedRates.push({
          rate: rates[currentCurrency],
          currency: currentCurrency,
          currencyFullName: findMapping
            ? findMapping.currencyFullName
            : 'Unknown currency full name',
          country: findMapping ? findMapping.country : 'Unknown country',
        } as ExtendedRate);
      }
    });
    return extendedRates;
  }

  randomData() {
    this.exchangeRateService.getCurrency('RSD').subscribe(
      (data) => {
        let randomData: string[] = [];
        randomData = this.getMultipleRandom(Object.keys(data.rates), 12);
        this.filteredRates = this.getExtendedFilteredRates(
          data.rates,
          randomData
        );
        this.randomRates = randomData;
      },
      (error) => {
        this.errorService.handleError(error);
      }
    );
    this.currencyInHeadline = MAIN_RATE;
    this.currencyInitial = '';
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
        this.filteredRates = this.getExtendedFilteredRates(
          data.rates,
          this.randomRates
        );
      },
      (error) => {
        this.errorService.handleError(error);
      }
    );
  }
}
