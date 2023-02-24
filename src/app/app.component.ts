import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ratesInfo: Record<string, number>;

  constructor(private currencyService: CurrencyService){}

  ngOnInit(): void {
    this.currencyService.getCurrencyRates().subscribe((response) => {
      this.ratesInfo = response.rates;
      console.log(this.ratesInfo);
    });
  }
}

