import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HkbnValidators } from '../../../helpers/hkbn-validators';
import { ProfileService } from '@perx/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'hkbn-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss']
})
export class UpdateEmailComponent implements OnInit {

  public updateEmailGroup: FormGroup = new FormGroup({
    email: new FormControl(null, [HkbnValidators.required, HkbnValidators.email])
  });

  constructor(private profileService: ProfileService) {
  }

  public ngOnInit(): void {
    this.profileService.whoAmI().pipe(
      map((profile) => profile.email)
    ).subscribe((email: string) => {
      this.updateEmailGroup.setValue({email});
    });
  }

}
