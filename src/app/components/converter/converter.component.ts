import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  @Input() ratesInfo: Record<string, number>;

  form: FormGroup;

  currencyOptions: Array<string> = ['UAH', 'USD', 'EUR', 'PLN'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      startingAmount: [null, [Validators.required]],
      startingCurrency: [null, [Validators.required]],
      resultAmount: [null, [Validators.required]],
      resultCurrency: [null, [Validators.required]],
    });
    this.form.get('startingAmount').valueChanges.subscribe(value => {
      this.calculate();
    });
    this.form.get('startingCurrency').valueChanges.subscribe(value => {
      this.calculate();
    });
    this.form.get('resultAmount').valueChanges.subscribe(value => {
      this.calculate(true);
    });
    this.form.get('resultCurrency').valueChanges.subscribe(value => {
      this.calculate();
    });
  }

  calculate(reversed?: boolean) {
    const startingAmountValue = this.form.get('startingAmount').value;
    const startingCurrencyValue = this.form.get('startingCurrency').value;
    const resultAmountValue = this.form.get('resultAmount').value;
    const resultCurrencyValue = this.form.get('resultCurrency').value;
    if (!reversed) {
      if (startingAmountValue && startingCurrencyValue && resultCurrencyValue) {
        const amount = +(startingAmountValue / this.ratesInfo[startingCurrencyValue] 
        * this.ratesInfo[resultCurrencyValue]).toFixed(2);
        this.form.get('resultAmount').setValue(amount, {emitEvent: false});
      }
    } else {
      if (resultAmountValue && startingCurrencyValue && resultCurrencyValue) {
        const amount = +(resultAmountValue / this.ratesInfo[resultCurrencyValue]
        * this.ratesInfo[startingCurrencyValue]).toFixed(2);
        this.form.get('startingAmount').setValue(amount, {emitEvent: false});
      }
    }
  }
}
