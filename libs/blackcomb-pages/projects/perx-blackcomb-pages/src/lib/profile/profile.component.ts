import {
  Component,
  OnInit
} from '@angular/core';
import {
  IFlags,
  ILoyalty,
  IProfile,
  LoyaltyService,
  ProfileService,
  SettingsService
} from '@perxtech/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { oc } from 'ts-optchain';

// import { ShowTitleInHeader } from '../layout/layout.component';

@Component({
  selector: 'perx-blackcomb-pages-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit/*, ShowTitleInHeader*/ {
  public profile: IProfile;
  public loyalty: ILoyalty;
  public loyaltyMembershipExpiry: string | null;
  public editablePassword: boolean = true;

  constructor(
    private profileService: ProfileService,
    private loyaltyService: LoyaltyService,
    private settingsService: SettingsService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  public ngOnInit(): void {
    this.profileService.whoAmI().subscribe(res => {
      this.profile = res;
    });
    this.settingsService.getRemoteFlagsSettings().subscribe(
      (flags: IFlags) => {
        this.editablePassword = !oc(flags).systemSetsPassword(false);
      }
    );
    this.loyaltyService.getLoyalties().pipe(
      map((loyalties: ILoyalty[]) => loyalties && loyalties.length && loyalties[0])
    ).subscribe((loyalty: ILoyalty) => {
      this.loyalty = loyalty;
      if (this.loyalty && this.loyalty.membershipExpiry) {
        this.loyaltyMembershipExpiry = this.datePipe.transform(loyalty.membershipExpiry, 'mediumDate');
      }
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
