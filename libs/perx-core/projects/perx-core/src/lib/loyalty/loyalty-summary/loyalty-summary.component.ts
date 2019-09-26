import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { LoyaltyService } from '../loyalty.service';
import { ProfileService } from '../../profile/profile.service';
import { IProfile } from '../../profile/profile.model';
import { ILoyalty } from '../models/loyalty.model';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'perx-core-loyalty-summary',
  templateUrl: './loyalty-summary.component.html',
  styleUrls: ['./loyalty-summary.component.scss']
})
export class LoyaltySummaryComponent implements OnInit {
  @Input()
  public loyaltyId: number;

  @Input('profile')
  public profile$: Observable<IProfile> | undefined;

  @Input('loyalty')
  public loyalty$: Observable<ILoyalty> | undefined;

  @Input()
  public subTitleFn: (loyalty: ILoyalty) => string;

  @Input()
  public titleFn: (profile: IProfile) => string;

  @Input()
  public summaryExpiringFn: (loyalty: ILoyalty) => string;
  constructor(
    private profileService: ProfileService,
    private loyaltyService: LoyaltyService,
    private datePipe: DatePipe
  ) { }

  public ngOnInit(): void {
    if (!this.subTitleFn) {
      this.subTitleFn = (loyalty: ILoyalty) => `Your total points as of ${this.datePipe.transform(loyalty.endDate || new Date(), 'ddMMMyy').toUpperCase()}`;
    }

    if (!this.titleFn) {
      this.titleFn = (profile?: IProfile): string => {
        if (profile && profile.firstName) {
          return `Welcome ${profile.firstName}`;
        }
        if (profile && profile.lastName) {
          return `Welcome ${profile.lastName}`;
        }
        return 'Welcome';
      };
    }

    if (!this.summaryExpiringFn) {
      this.summaryExpiringFn = (loyalty: ILoyalty): string => {
        const expiringPoints = loyalty && loyalty.expiringPoints && loyalty.expiringPoints.length ? loyalty.expiringPoints[0] : null;
        return expiringPoints && expiringPoints.expireDate && expiringPoints.points !== 0 ?
          `${expiringPoints.points} points will expire on ${this.datePipe.transform(expiringPoints.expireDate, 'd MMM y')}` : '';
      };
    }
    if (!this.profile$) {
      this.profile$ = this.profileService.whoAmI();
    }

    if (!this.loyalty$) {
      this.loyalty$ = this.loyaltyId === undefined ?
        this.loyaltyService.getLoyalties().pipe(
          map(loyalties => loyalties && loyalties.length > 0 && loyalties[0])
        ) : this.loyaltyService.getLoyalty(this.loyaltyId);
    }
  }
}
