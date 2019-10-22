import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-global-earn-rule-group',
  templateUrl: './global-earn-rule-group.component.html',
  styleUrls: ['./global-earn-rule-group.component.scss']
})
export class GlobalEarnRuleGroupComponent {
  @Input() public group: FormGroup;
  @Input() public currency: string;

}
