import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { ErrorService } from 'app/core/service/error.service';
import { ExchangeRateService } from 'app/core/service/exchange-rate.service';
import { COMMON_RATES, MAIN_RATE } from 'app/exchange-rates-table/rates.const';
import { Rates } from 'app/shared/models/exchange-rate.mode';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-exchange-rate-calculator',
  templateUrl: './exchange-rate-calculator.component.html',
  styleUrls: ['./exchange-rate-calculator.component.scss'],
})
export class ExchangeRateCalculatorComponent {
  allRates!: Rates;
  selectedFromCurrency = 'RSD';
  selectedToCurrency = 'RSD';
  amount: number = 1;
  showSpinner: boolean = false;
  convertedMessage = '';

  constructor(
    private exchangeRateService: ExchangeRateService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.showSpinner = true;
    this.exchangeRateService.getCurrency(MAIN_RATE).subscribe(
      (data) => {
        this.allRates = data.rates;
        this.showSpinner = false;
      },
      (error) => {
        this.errorService.handleError(error);
        this.showSpinner = false;
      }
    );
  }

  convertCurrencies() {
    const fromCurrency = this.allRates[this.selectedFromCurrency];
    const toCurrency = this.allRates[this.selectedToCurrency];

    const exchangedValue = ((this.amount * 1) / fromCurrency) * toCurrency;
    this.convertedMessage = `${this.amount} ${this.selectedFromCurrency} = ${exchangedValue} ${this.selectedToCurrency}`;
  }

  switchCurrencies() {
    const selectedBackupCurrency = this.selectedToCurrency;
    this.selectedToCurrency = this.selectedFromCurrency;
    this.selectedFromCurrency = selectedBackupCurrency;
  }
}
