import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { WRedemptionType } from '@perxtech/whistler';
import { OptionConfig } from '@perxtech/candyshop';

@Component({
  selector: 'cl-reward-voucher-code-form-group',
  templateUrl: './reward-voucher-code-form-group.component.html',
  styleUrls: ['./reward-voucher-code-form-group.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RewardVoucherCodeFormGroupComponent {
  public DATE_FORMAT: string = 'mediumDate';
  @Input() public formGroup: AbstractControl;
  @Input() public form: AbstractControl;
  @Input() public config: { [key: string]: OptionConfig[] };
  public rt: typeof WRedemptionType = WRedemptionType;

  public codeFormatConfig: { [key: string]: { eg: string } } = {
    alphanumeric: { eg: 'HB1234' },
    numeric: { eg: '123456' },
    alphabet: { eg: 'ABCDEF' }
  };

  public get codePlaceholder(): string {
    const type = this.formGroup.get('uniqueGeneratedCode.codeFormat').value || 'alphanumeric';
    return `Prefix (eg.${this.codeFormatConfig[type].eg})`;
  }

  public get redemptionType(): WRedemptionType | null {
    return this.form.get('rewardInfo.redemptionType').value;
  }
}
