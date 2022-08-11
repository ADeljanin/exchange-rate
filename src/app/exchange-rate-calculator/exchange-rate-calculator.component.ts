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
  allRates!: Rates;
  selectedFromCurrency = 'RSD';
  selectedToCurrency = 'RSD';
  amount: number = 1;
  convertedAmount: number = 0;
  showSpinner: boolean = false;

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
    setTimeout(() => {
      this.showSpinner = false;
    }, 1000);
    this.exchangeRateService.getCurrency(MAIN_RATE).subscribe(
      (data) => {
        this.allRates = data.rates;
      },
      (error) => {
        this.errorService.handleError(error);
      }
    );
  }

  convertCurrencies() {
    const fromCurrency = this.allRates[this.selectedFromCurrency];
    const toCurrency = this.allRates[this.selectedToCurrency];

    this.convertedAmount = ((this.amount * 1) / fromCurrency) * toCurrency;
  }
}
