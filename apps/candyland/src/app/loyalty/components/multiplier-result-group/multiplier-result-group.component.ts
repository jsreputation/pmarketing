import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-multiplier-result-group',
  templateUrl: './multiplier-result-group.component.html',
  styleUrls: ['./multiplier-result-group.component.scss']
})
export class MultiplierResultGroupComponent {
  @Input() public group: FormGroup;
  @Input() public config: any;

  public get amount(): AbstractControl {
    return this.group.get('amount') || null;
  }
}
