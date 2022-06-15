import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {
  result: any;
  constructor(private _http: HttpClient) {}

  getCurrency() {
    return this._http
      .get('https://api.exchangerate.host/latest?base=USD')
      .pipe(map((result) => (this.result = result.json())));
  }
}
