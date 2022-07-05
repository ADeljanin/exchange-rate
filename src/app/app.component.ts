import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'ex-rate';
  ratesData: string = '';

  constructor(private ratesdata: DataService) {}
  ngOnInit(): void {
    this.ratesdata.getCurrency().subscribe((data) => {
      this.ratesData = JSON.stringify(Object.entries(data));
      console.log(typeof this.ratesData);
    });
  }
}
function res(res: any) {
  throw new Error('Function not implemented.');
}
