import { Component, OnInit } from '@angular/core';
import { ProfileService, IProfile } from '@perxtech/core';
import { Router } from '@angular/router';
// import { ShowTitleInHeader } from '../layout/layout.component';

@Component({
  selector: 'perx-blackcomb-pages-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit/*, ShowTitleInHeader*/ {
  public profile: IProfile;

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.profileService.whoAmI().subscribe(res => {
      this.profile = res;
      console.log(this.profile, 'what does profile give me?')
    });
  }

  public onEditPasswordClicked(): void {
    this.router.navigateByUrl('change-password');
  }

  public onEditEmailClicked(): void {
    this.router.navigateByUrl('edit-profile/email');
  }

  public onEditPostcodeClicked(): void {
    this.router.navigateByUrl('edit-profile/postcode');
  }

  // public getTitle(): string {
  //   return 'Profile';
  // }
}
