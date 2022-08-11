import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { ErrorService } from 'app/core/service/error.service';
import { ExchangeRateService } from 'app/core/service/exchange-rate.service';
import { COMMON_RATES, MAIN_RATE } from 'app/exchange-rates-table/rates.const';
import { Rates } from 'app/shared/models/exchange-rate.mode';

@Component({
  selector: 'app-exchange-rate-calculator',
  templateUrl: './exchange-rate-calculator.component.html',
  styleUrls: ['./exchange-rate-calculator.component.scss'],
})
export class ExchangeRateCalculatorComponent {
  filteredRates!: Rates;
  allRates!: Rates;
  selectedFromCurrency: string = '';
  selectedToCurrency: string = '';
  randomRates: string[] = [];
  amount: number = 1;
  fromCurrency: number = 0;
  toCurrency: number = 0;
  convertedAmount: number = 0;

  constructor(
    private exchangeRateService: ExchangeRateService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.exchangeRateService.getCurrency(MAIN_RATE).subscribe(
      (data) => {
        this.allRates = data.rates;
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

  selectFirstCurrency(even: MatSelectChange): void {
    this.selectedFromCurrency = even.value;
  }
  selectSecondCurrency(even: MatSelectChange): void {
    this.selectedToCurrency = even.value;
  }

  convertCurrencies() {
    this.fromCurrency = this.allRates[this.selectedFromCurrency];
    this.toCurrency = this.allRates[this.selectedToCurrency];

    this.convertedAmount =
      ((this.amount * 1) / this.fromCurrency) * this.toCurrency;
  }
  clearAllValues(): void {
    this.amount = 1;
    this.selectedFromCurrency = '';
    this.selectedToCurrency = 'AED';
    this.convertedAmount = 0;
  }

  // onBack(): void {
  //   this.router.navigate(['']);
  // }
}
