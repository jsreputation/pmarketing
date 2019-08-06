import { Component, OnInit } from '@angular/core';
import { IProfile, ILoyalty, LoyaltyService, ProfileService } from '@perx/core';
import { of, Observable } from 'rxjs';
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
    this.profileService.whoAmI().subscribe(
      (profile) => this.profile = of(profile),
      () => this.profile = of(mockProfile)
    );
    this.loyaltyService.getLoyalties().pipe(
      map(loyalties => loyalties && loyalties.length > 0 && loyalties[0])).subscribe(
        (loyalty) => this.loyalty = of(loyalty),
        () => this.loyalty = of(mockLoyalty)
      );
  }
}
