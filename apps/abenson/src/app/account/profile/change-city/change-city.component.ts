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
  selector: 'app-change-city',
  templateUrl: './change-city.component.html',
  styleUrls: ['./change-city.component.scss']
})
export class ChangeCityComponent implements OnInit {
  public cityChangeForm: FormGroup;
  public customProperties: ICustomProperties;

  public get newCity(): AbstractControl | null {
    return this.cityChangeForm.get('newCity');
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
    this.cityChangeForm = this.fb.group({
      newCity: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    this.customProperties = {
      city: this.cityChangeForm.value.newCity
    };

    if (this.customProperties.city) {
      this.profileService.setCustomProperties(this.customProperties).subscribe(() =>
        this.location.back(),
      (err) => { console.log(err); });
    }
    return;
  }
}
