import { Component, OnInit } from '@angular/core';
import {
  ProfileService,
  IProfile,
  ILoyalty,
  LoyaltyService
} from '@perxtech/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
// import { ShowTitleInHeader } from '../layout/layout.component';

@Component({
  selector: 'perx-blackcomb-pages-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit/*, ShowTitleInHeader*/ {
  public profile: IProfile;
  public loyalty: ILoyalty;

  constructor(
    private profileService: ProfileService,
    private loyaltyService: LoyaltyService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.profileService.whoAmI().subscribe(res => {
      this.profile = res;
    });

    this.loyaltyService.getLoyalties().pipe(
      map((loyalties: ILoyalty[]) => loyalties && loyalties.length && loyalties[0])
    ).subscribe((loyalty: ILoyalty) => {
      this.loyalty = loyalty;
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
