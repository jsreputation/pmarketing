import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'cl-reward-voucher-code-form-group',
  templateUrl: './reward-voucher-code-form-group.component.html',
  styleUrls: ['./reward-voucher-code-form-group.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RewardVoucherCodeFormGroupComponent implements OnInit {
  public DATE_FORMAT = 'dd MMM yyyy';
  @Input() public formGroup: AbstractControl;
  @Input() public form: AbstractControl;
  @Input() public config: { [key: string]: OptionConfig[] };

  public codeFormatConfig = {
    alphanumeric: {eg: 'HB1234'},
    numeric: {eg: '123456'},
    alphabet: {eg: 'ABCDEF'}
  };

  get codePlaceholder() {
    const type = this.formGroup.get('uniqueGeneratedCode.codeFormat').value || 'alphanumeric';
    return 'Prefix (eg.' + this.codeFormatConfig[type].eg + ')';
  }

  get redemptionType() {
    return this.form.get('rewardInfo.redemptionType').value;
  }

  public setTotalVoucher(value) {
    this.formGroup.get('total').patchValue(value);
  }

}
