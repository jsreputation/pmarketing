import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Mask } from '../../../helpers/mask';

@Component({
  selector: 'hkbn-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountSummaryComponent implements OnChanges {

  @Input() public accountData: any;

  public phoneMask: any = Mask.PHONE_WITHOUT_EXT;

  public accountSummary: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    phone: new FormControl(''),
    email: new FormControl(),
    pass: new FormControl(),
    customProperties: new FormControl()
  });

  public ngOnChanges(): void {
    this.accountSummary.patchValue(this.accountData);
  }

}
