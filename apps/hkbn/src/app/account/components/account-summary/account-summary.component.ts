import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IProfile } from '@perx/core';

@Component({
  selector: 'hkbn-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountSummaryComponent implements OnChanges {
  @Input() public accountData: IProfile;

  public accountSummary: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    phone: new FormControl(''),
    email: new FormControl(),
    pass: new FormControl(),
    customProperties: new FormControl()
  });

  public ngOnChanges(): void {
    if (this.accountData) {
      this.accountSummary.patchValue(this.accountData);
    }
  }
}
