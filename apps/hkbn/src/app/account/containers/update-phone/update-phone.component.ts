import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ProfileService } from '@perx/core';

@Component({
  selector: 'hkbn-update-phone',
  templateUrl: './update-phone.component.html',
  styleUrls: ['./update-phone.component.scss']
})
export class UpdatePhoneComponent implements OnInit {
  public updatePhoneGroup: FormGroup = new FormGroup({
    phone: new FormControl()
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
