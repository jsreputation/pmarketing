import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'cl-voucher-validity-form-group',
  templateUrl: './voucher-validity-form-group.component.html',
  styleUrls: ['./voucher-validity-form-group.component.scss']
})
export class VoucherValidityFormGroupComponent implements OnInit {
  @Input() public formGroup: AbstractControl;
  @Input() public config: { [key: string]: OptionConfig[] };

}
