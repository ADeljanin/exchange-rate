import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  objectKeys = Object.keys;
  exchanges: any;

  constructor(private _data: DataService) {}
  ngOnInit() {
    this._data.getCurrency().subscribe((res: any) => (this.exchanges = res));
    console.log(res);
  }
}
function res(res: any) {
  throw new Error('Function not implemented.');
}
