import { Component, OnInit } from '@angular/core';
import { ProfileService } from '@perx/core/dist/perx-core';

const MOCK = {
  firstName: 'John',
  lastName: 'Doe',
  phone: '85291231234',
  email: 'user1234@email.com',
  pass: 'qwerty123',
  customProperties: false
};

@Component({
  selector: 'hkbn-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  // TODO: remove mock when get access to API
  public accountData: any = MOCK;

  constructor(private profileService: ProfileService) {
  }

  public ngOnInit(): void {
    this.profileService.whoAmI().subscribe((profile) => {
      this.accountData = profile || {};
    });
  }
}
