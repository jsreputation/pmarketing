import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-amount-condition-group',
  templateUrl: './amount-condition-group.component.html',
  styleUrls: ['./amount-condition-group.component.scss']
})
export class AmountConditionGroupComponent {
  @Input() public group: FormGroup;
  @Input() public config: any;
}
