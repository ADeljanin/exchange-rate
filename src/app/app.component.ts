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
  ratesData!: RatesResponse;

  constructor(private exchangeRateService: ExchangeRateService,
    private errorService: ErrorService) { }

  ngOnInit(): void {
    this.loadData();
  }


  private loadData() {
    this.exchangeRateService.getCurrency().subscribe(data => {
      this.ratesData = data;
    }, error => {
      this.errorService.handleError(error);
    });
  }
}