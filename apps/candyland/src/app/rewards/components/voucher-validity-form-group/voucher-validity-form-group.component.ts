import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'cl-voucher-validity-form-group',
  templateUrl: './voucher-validity-form-group.component.html',
  styleUrls: ['./voucher-validity-form-group.component.scss']
})
export class VoucherValidityFormGroupComponent implements OnInit {
  @Input() formGroup: AbstractControl;
  @Input() config: { [key: string]: OptionConfig[] };

  constructor() {
  }

  ngOnInit() {
  }

}
