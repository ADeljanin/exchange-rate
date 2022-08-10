import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RatesResponse } from '../../shared/models/exchange-rate.mode';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private exchangeUrl = 'https://api.exchangerate.host';

  constructor(private http: HttpClient) {}

  getCurrency(basedOn: string): Observable<RatesResponse> {
    return this.http.get<RatesResponse>(
      `${this.exchangeUrl}/latest?base=${basedOn}`
    );
  }
}
