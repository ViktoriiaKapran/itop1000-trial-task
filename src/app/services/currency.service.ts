import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  API_URL = 'https://open.er-api.com/v6/latest/UAH';

  constructor(private http: HttpClient) { }

  getCurrencyRates(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}
