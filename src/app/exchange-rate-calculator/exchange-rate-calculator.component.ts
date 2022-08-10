import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'app/core/service/error.service';
import { ExchangeRateService } from 'app/core/service/exchange-rate.service';
import { Rates } from 'app/shared/models/exchange-rate.mode';

@Component({
  selector: 'app-exchange-rate-calculator',
  templateUrl: './exchange-rate-calculator.component.html',
  styleUrls: ['./exchange-rate-calculator.component.scss'],
})
export class ExchangeRateCalculatorComponent {
  filteredRates!: Rates;
  allRates!: Rates;
  selectedOneCurrency: string = '';
  randomRates: string[] = [];
  amount: string = '';

  constructor(
    private exchangeRateService: ExchangeRateService,
    private errorService: ErrorService,
    private router: Router
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
    console.log(this.filteredRates);
  }

  convertCurrencies() {
    console.log(this.amount);
    return this.amount;
  }

  clickCurrency(value: string) {
    console.log(value);
  }

  onBack(): void {
    this.router.navigate(['']);
  }
}
