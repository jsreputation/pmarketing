import { Component, OnInit } from '@angular/core';
import { IProfile, ProfileService } from '@perx/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'hkbn-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public accountData: Observable<IProfile>;

  constructor(private profileService: ProfileService) {
  }

  public ngOnInit(): void {
    this.accountData = this.profileService.whoAmI();
  }
}
