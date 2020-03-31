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
} from '@perxtech/core';

@Component({
  selector: 'app-change-barangay',
  templateUrl: './change-barangay.component.html',
  styleUrls: ['./change-barangay.component.scss']
})
export class ChangeBarangayComponent implements OnInit {
  public barangayChangeForm: FormGroup;
  public customProperties: ICustomProperties;

  public get newBarangay(): AbstractControl | null {
    return this.barangayChangeForm.get('newBarangay');
  }

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private location: Location
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.barangayChangeForm = this.fb.group({
      newBarangay: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    this.customProperties = {
      barangay: this.barangayChangeForm.value.newBarangay
    };

    if (this.customProperties.barangay) {
      this.profileService.setCustomProperties(this.customProperties).subscribe(() => {
        this.location.back();
      },
      (err) => { console.error(err); });
    }
    return;
  }
}
