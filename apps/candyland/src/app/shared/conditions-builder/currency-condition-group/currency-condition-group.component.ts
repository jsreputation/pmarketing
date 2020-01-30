import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-currency-condition-group',
  templateUrl: './currency-condition-group.component.html',
  styleUrls: ['./currency-condition-group.component.scss']
})
export class CurrencyConditionGroupComponent {
  @Input() public group: FormGroup;
  @Input() public config: any;
}
