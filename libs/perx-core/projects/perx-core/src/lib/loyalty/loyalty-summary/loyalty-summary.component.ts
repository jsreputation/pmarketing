import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LoyaltyService } from '../loyalty.service';
import { ProfileService } from '../../profile/profile.service';
import { IProfile } from '../../profile/profile.model';
import { ILoyalty } from '../models/loyalty.model';
import { DatePipe } from '@angular/common';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'perx-core-loyalty-summary',
  templateUrl: './loyalty-summary.component.html',
  styleUrls: ['./loyalty-summary.component.scss']
})
export class LoyaltySummaryComponent implements OnInit {
  @Input()
  public loyaltyId: number | undefined;

  @Input('profile')
  public profile$: Observable<IProfile> | undefined;

  @Input('loyalty')
  public loyalty$: Observable<ILoyalty>;
  public loyalty: ILoyalty;

  @Input()
  public subTitleFn: (loyalty: ILoyalty) => string;

  @Input()
  public titleFn: (profile: IProfile) => string;

  @Input()
  public summaryExpiringFn: (loyalty: ILoyalty) => string;

  @Input()
  public showLoyaltyProgress: boolean = true;

  public loyaltyProgramExists: boolean = true;

  constructor(
    private profileService: ProfileService,
    private loyaltyService: LoyaltyService,
    private datePipe: DatePipe
  ) {
  }

  public ngOnInit(): void {
    if (!this.subTitleFn) {
      this.subTitleFn = () => `Your total points as of ${this.datePipe.transform(new Date(), 'mediumDate')}`;
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
          `${expiringPoints.points} points will expire on ${this.datePipe.transform(expiringPoints.expireDate, 'mediumDate')}` : '';
      };
    }
    if (!this.profile$) {
      this.profile$ = this.profileService.whoAmI();
    }

    if (!this.loyalty$) {
      this.loyaltyService.getLoyalty(this.loyaltyId)
        .pipe(
          catchError(val => {
            if (val.status === 401) {
              this.loyaltyProgramExists = true;
            }
            return of();
          })
        )
        .subscribe(
          (loyalty: ILoyalty) => {
            this.loyalty = loyalty;
          }
        );
    } else {
      this.loyalty$.subscribe(
        (loyalty: ILoyalty) => {
          this.loyalty = loyalty;
        }
      );
    }
  }

  public getPercentageToNext(currentPoints: number, nextPoints: number | undefined): number {
    if (currentPoints && nextPoints) {
      return Math.round((currentPoints / nextPoints) * 100);
    }
    return 0;
  }
}
