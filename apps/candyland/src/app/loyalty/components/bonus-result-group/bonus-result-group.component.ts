import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-bonus-result-group',
  templateUrl: './bonus-result-group.component.html',
  styleUrls: ['./bonus-result-group.component.scss']
})
export class BonusResultGroupComponent {
  @Input() public group: FormGroup;
  @Input() public config: any;

  public get amount(): AbstractControl {
    return this.group && this.group.get('amount') ?  this.group.get('amount') : null;
  }
}
