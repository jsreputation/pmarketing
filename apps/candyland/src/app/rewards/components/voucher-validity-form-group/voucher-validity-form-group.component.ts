import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cl-voucher-validity-form-group',
  templateUrl: './voucher-validity-form-group.component.html',
  styleUrls: ['./voucher-validity-form-group.component.scss']
})
export class VoucherValidityFormGroupComponent implements OnInit {
  @Input() public formGroup: AbstractControl;
  @Input() public config: { [key: string]: OptionConfig[] };

  public ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(value => {
      if (value.type === 'period') {
        Object.values((this.formGroup.get('period') as FormGroup).controls)
          .forEach((control: FormControl, index: number) => {
            // know that the last control is the checkbox never end, dw it required
            // length of control is 5 : start(date,time) x2 , end(date,time)*2, checkbox
            if (index !== 4) {
              control.setValidators(Validators.required);
            }
          });
      }
      this.formGroup.markAsUntouched();
    });
    this.formGroup.get('period.startDate').valueChanges.subscribe(data => console.log('start date: ', data));
  }
}
