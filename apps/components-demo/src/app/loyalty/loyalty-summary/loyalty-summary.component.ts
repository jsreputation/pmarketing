import { Component, OnInit } from '@angular/core';
import { IProfile, ILoyalty, LoyaltyService, ProfileService } from '@perx/core';
import { of, Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { mockLoyalty, mockProfile } from './../loyalty-mock';

@Component({
  selector: 'app-loyalty-summary',
  templateUrl: './loyalty-summary.component.html',
  styleUrls: ['./loyalty-summary.component.scss']
})
export class LoyaltySummaryComponent implements OnInit {
  public profile: Observable<IProfile> | undefined;
  public loyalty: Observable<ILoyalty> | undefined;

  constructor(private loyaltyService: LoyaltyService, private profileService: ProfileService) { }

  public ngOnInit(): void {
    forkJoin(
      this.profileService.whoAmI(),
      this.loyaltyService.getLoyalties().pipe(
        map(loyalties => loyalties && loyalties.length > 0 && loyalties[0]))
    ).subscribe(
      ([profile, loyalty]) => {
        this.profile = of(profile);
        this.loyalty = of(loyalty);
      },
      () => {
        this.profile = of(mockProfile);
        this.loyalty = of(mockLoyalty);
      }
    );
  }
}
