import { Component, OnInit } from '@angular/core';
import { ProfileService, IProfile } from '@perx/core';

@Component({
  selector: 'perx-blackcomb-pages-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profile: IProfile;

  constructor(
    private profileService: ProfileService
  ) { }

  public ngOnInit(): void {
    this.profileService.whoAmI().subscribe(res => this.profile = res );
  }

  public onEditPasswordClicked(): void {
  }

}
