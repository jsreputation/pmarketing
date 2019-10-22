import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-global-burn-rule-group',
  templateUrl: './global-burn-rule-group.component.html',
  styleUrls: ['./global-burn-rule-group.component.scss']
})
export class GlobalBurnRuleGroupComponent {
  @Input() public group: FormGroup;
  @Input() public currency: string;

}
