import { Component, OnInit } from '@angular/core';
import { IProfile, ProfileService } from '@perx/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'hkbn-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public accountData: BehaviorSubject<IProfile> = new BehaviorSubject<IProfile>(null);

  constructor(private profileService: ProfileService) {
  }

  public ngOnInit(): void {
    this.profileService.whoAmI().subscribe((profile) => {
      this.accountData.next(profile);
    });
  }
}
