import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-global-earn-rule',
  templateUrl: './global-earn-rule.component.html',
  styleUrls: ['./global-earn-rule.component.scss']
})
export class GlobalEarnRuleComponent {
  @Input() public group: FormGroup;

  public get globalEarnRule(): AbstractControl {
    return this.group.get('globalEarnRule');
  }

}
