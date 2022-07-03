import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRates } from './exchange-rate';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private exchangeUrl = 'https://api.exchangerate.host/latest?base';
  constructor(private http: HttpClient) {}

  getCurrency(): Observable<IRates[]> {
    return this.http.get<IRates[]>(this.exchangeUrl);
  }
}
