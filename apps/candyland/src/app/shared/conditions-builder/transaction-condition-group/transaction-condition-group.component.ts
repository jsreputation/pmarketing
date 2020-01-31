import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-transaction-condition-group',
  templateUrl: './transaction-condition-group.component.html',
  styleUrls: ['./transaction-condition-group.component.scss']
})
export class TransactionConditionGroupComponent {
  @Input() public group: FormGroup;
  @Input() public config: any;
}
