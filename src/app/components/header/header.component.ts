import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() ratesInfo: Record<string, number>;

  displayedCurrencies: Array<string> = ['USD', 'EUR'];

  getReversedCourse(amount: number): string {
    return (1 / amount).toFixed(2);
  }
}
