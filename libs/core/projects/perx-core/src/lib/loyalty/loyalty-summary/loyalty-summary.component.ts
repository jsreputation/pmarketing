import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LoyaltyService } from '../loyalty.service';
import { ProfileService } from '../../profile/profile.service';
import { IProfile } from '../../profile/profile.model';
import { ILoyalty } from '../models/loyalty.model';
import { DatePipe } from '@angular/common';
import { catchError, tap, map } from 'rxjs/operators';

@Component({
  selector: 'perx-core-loyalty-summary',
  templateUrl: './loyalty-summary.component.html',
  styleUrls: ['./loyalty-summary.component.scss'],
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
  public subTitleFn: (loyalty: ILoyalty) => Observable<string>;

  @Input()
  public pointToFn: () => Observable<string>;

  @Input()
  public memberFn: (membershipTierName: string) => Observable<string>;

  @Input()
  public titleFn: (profile: IProfile) => Observable<string>;

  @Input()
  public summaryExpiringFn: (loyalty: ILoyalty) => Observable<string>;

  @Input()
  public membershipExpiryFn: (loyalty: ILoyalty) => Observable<string>;

  @Input()
  public topScoreProgressFn: () => Observable<string>;

  @Input()
  public pointDenominationFn: () => Observable<string>;

  @Input()
  public pointPretextFn: () => Observable<string>;

  @Input()
  public showLoyaltyProgress: boolean = true;

  @Input()
  public hideAdditionalLoyaltyInfo: boolean = false;

  @Input()
  public showReferralProgress: boolean = false;

  @Input()
  public showLoyaltyNextTierPointsDiff: boolean = true;

  public loyaltyProgramExists: boolean = true;
  public pointTo: Observable<string>;
  private nextTierName: string;

  constructor(
    private profileService: ProfileService,
    private loyaltyService: LoyaltyService,
    private datePipe: DatePipe
  ) { }

  public ngOnInit(): void {
    if (!this.subTitleFn) {
      this.subTitleFn = () =>
        of(
          `Your total points as of ${this.datePipe.transform(
            new Date(),
            'mediumDate'
          )}`
        );
    }

    if (!this.pointToFn) {
      this.pointToFn = () => of('Points to {nextTierName}');
    }

    if (!this.memberFn) {
      this.memberFn = (membershipTierName: string) =>
        of(`${membershipTierName} member`);
    }

    if (!this.titleFn) {
      this.titleFn = (profile?: IProfile): Observable<string> => {
        if (profile && profile.firstName) {
          return of(`Welcome ${profile.firstName}`);
        }
        if (profile && profile.lastName) {
          return of(`Welcome ${profile.lastName}`);
        }
        return of('Welcome');
      };
    }

    if (!this.summaryExpiringFn) {
      this.summaryExpiringFn = (loyalty: ILoyalty): Observable<string> => {
        const expiringPoints =
          loyalty && loyalty.expiringPoints && loyalty.expiringPoints.length
            ? loyalty.expiringPoints[0]
            : null;
        return expiringPoints &&
          expiringPoints.expireDate &&
          expiringPoints.points &&
          expiringPoints.points !== 0
          ? of(
            `${String(expiringPoints.points)} points will expire on ${this.datePipe.transform(
              expiringPoints.expireDate,
              'mediumDate'
            ) || ''
            }`
          )
          : of('');
      };
    }

    if (!this.membershipExpiryFn) {
      this.membershipExpiryFn = (loyalty: ILoyalty): Observable<string> =>
        (loyalty && loyalty.membershipExpiry) || loyalty.endDate
          ? of(
            `Account Expiry: ${this.datePipe.transform(
              loyalty.membershipExpiry || loyalty.endDate,
              'mediumDate'
            )}`
          )
          : of('');
    }

    if (this.showReferralProgress && !this.topScoreProgressFn) {
      this.topScoreProgressFn = () => of('');
    }


    if (!this.pointDenominationFn) {
      this.pointDenominationFn = () => of('');
    }


    if (!this.pointPretextFn) {
      this.pointPretextFn = () => of('');
    }

    if (!this.profile$) {
      this.profile$ = this.profileService.whoAmI();
    }

    if (!this.loyalty$) {
      this.loyalty$ = this.loyaltyService.getLoyalty(this.loyaltyId).pipe(
        catchError((val) => {
          if (val.status === 401) {
            this.loyaltyProgramExists = true;
          }
          return of(val);
        })
      );
    }
    this.loyalty$
      .pipe(
        tap((loyalty: ILoyalty) => {
          if (loyalty && loyalty.nextTierName) {
            // Todo variable neeed to be translated, but core don't have transalate service
            this.nextTierName = loyalty.nextTierName;
          }
        })
      )
      .subscribe((loyalty: ILoyalty) => {
        this.loyalty = loyalty;
        if (this.nextTierName) {
          this.pointTo = this.pointToFn().pipe(
            map((text) => text.replace('{nextTierName}', this.nextTierName))
          );
        }
      });
  }

  public getPercentageToNext(
    currentPoints: number,
    nextPoints: number | undefined
  ): number {
    if (currentPoints && nextPoints) {
      return Math.round((currentPoints / nextPoints) * 100);
    }
    return 0;
  }
}
