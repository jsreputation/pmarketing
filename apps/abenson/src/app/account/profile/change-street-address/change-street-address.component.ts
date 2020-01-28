import {
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';

import {
  ICustomProperties,
  ProfileService,
} from '@perx/core';

@Component({
  selector: 'app-change-street-address',
  templateUrl: './change-street-address.component.html',
  styleUrls: ['./change-street-address.component.scss']
})
export class ChangeStreetAddressComponent implements OnInit {
  public streetAddressChangeForm: FormGroup;
  private customProperties: ICustomProperties;

  public get newStreetAddress(): AbstractControl | null {
    return this.streetAddressChangeForm.get('newStreetAddress');
  }

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private location: Location,
  ) {
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.streetAddressChangeForm = this.fb.group({
      newStreetAddress: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    this.customProperties = {
      addr1: this.streetAddressChangeForm.value.newStreetAddress
    };

    if (this.customProperties.addr1) {
      this.profileService.setCustomProperties(this.customProperties).subscribe(() => {
        this.location.back();
      },
      (err) => {console.log(err); });
    }
    return;
  }
}
