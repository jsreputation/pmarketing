import { Component, OnInit } from '@angular/core';
import { ProfileService } from '@perx/core';

@Component({
  selector: 'hkbn-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public accountData: any;

  constructor(private profileService: ProfileService) {
  }

  public ngOnInit(): void {
    this.profileService.whoAmI().subscribe((profile) => {
      this.accountData = profile || {};
    });
  }
}
