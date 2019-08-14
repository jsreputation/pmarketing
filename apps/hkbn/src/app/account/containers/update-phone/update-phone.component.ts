import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ProfileService } from '@perx/core';
import { HkbnValidators } from '../../../helpers/hkbn-validators';

@Component({
  selector: 'hkbn-update-phone',
  templateUrl: './update-phone.component.html',
  styleUrls: ['./update-phone.component.scss']
})
export class UpdatePhoneComponent implements OnInit {
  public updatePhoneGroup: FormGroup = new FormGroup({
    phone: new FormControl(null, [
      HkbnValidators.required,
      HkbnValidators.pattern('^[0-9]+$'),
      HkbnValidators.minLength(8),
      HkbnValidators.maxLength(8)])
  });

  constructor(private profileService: ProfileService) {
  }

  public ngOnInit(): void {
    this.profileService.whoAmI().pipe(
      map((profile) => profile.phone)
    ).subscribe((phone: string) => {
      this.updatePhoneGroup.setValue({phone});
    });
  }
}
