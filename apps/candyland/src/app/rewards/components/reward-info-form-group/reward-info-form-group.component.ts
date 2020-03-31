import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { OptionConfig } from '@perxtech/candyshop';
import { Currency } from '@cl-core/models/merchant/currency';

@Component({
  selector: 'cl-reward-info-form-group',
  templateUrl: './reward-info-form-group.component.html',
  styleUrls: ['./reward-info-form-group.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RewardInfoFormGroupComponent {
  @Input() public formGroup: AbstractControl;
  @Input() public config: { [key: string]: OptionConfig[] };
  @Input() public currency$: Observable<Currency[]>;
}
