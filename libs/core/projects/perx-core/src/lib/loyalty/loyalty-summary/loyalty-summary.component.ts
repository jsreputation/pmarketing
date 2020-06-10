import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LoyaltyService } from '../loyalty.service';
import { ProfileService } from '../../profile/profile.service';
import { IProfile } from '../../profile/profile.model';
import { ILoyalty } from '../models/loyalty.model';
import { DatePipe } from '@angular/common';
import { catchError, tap } from 'rxjs/operators';

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
  public membershipExpiryFn: (loyalty: ILoyalty) => string;

  @Input()
  public showLoyaltyProgress: boolean = true;

  public loyaltyProgramExists: boolean = true;

  private subTitle: string;
  private welcomeTxt: string;
  public pointTo: string;
  private nextTierName: string;
  private pointExpire: string;
  private accountExpire: string;

  constructor(
    private profileService: ProfileService,
    private loyaltyService: LoyaltyService,
    private datePipe: DatePipe,
    private translate: TranslateService
  ) {
    this.initTranslate();
  }

  public ngOnInit(): void {
    if (!this.subTitleFn) {
      this.subTitleFn = () => `${this.subTitle}${this.datePipe.transform(new Date(), 'mediumDate')}`;
    }

    if (!this.titleFn) {
      this.titleFn = (profile?: IProfile): string => {
        if (profile && profile.firstName) {
          return `${this.welcomeTxt}${profile.firstName}`;
        }
        if (profile && profile.lastName) {
          return `${this.welcomeTxt}${profile.lastName}`;
        }
        return `${this.welcomeTxt}`;
      };
    }

    if (!this.summaryExpiringFn) {
      this.summaryExpiringFn = (loyalty: ILoyalty): string => {
        const expiringPoints = loyalty && loyalty.expiringPoints && loyalty.expiringPoints.length ? loyalty.expiringPoints[0] : null;
        return expiringPoints && expiringPoints.expireDate && expiringPoints.points && expiringPoints.points !== 0 ?
          this.pointExpire
            .replace('{points}', String(expiringPoints.points))
            .replace('{date}', this.datePipe.transform(expiringPoints.expireDate, 'mediumDate') || '')
          : '';
      };
    }

    if (!this.membershipExpiryFn) {
      this.membershipExpiryFn = (loyalty: ILoyalty): string => loyalty && loyalty.membershipExpiry || loyalty.endDate ?
        `${this.accountExpire}: ${this.datePipe.transform(loyalty.membershipExpiry || loyalty.endDate, 'mediumDate')}` :
        '';
    }

    if (!this.profile$) {
      this.profile$ = this.profileService.whoAmI();
    }

    if (!this.loyalty$) {
      this.loyalty$ = this.loyaltyService.getLoyalty(this.loyaltyId)
        .pipe(
          catchError(val => {
            if (val.status === 401) {
              this.loyaltyProgramExists = true;
            }
            return of(val);
          })
        )
    }
    this.loyalty$.pipe(
      tap((loyalty: ILoyalty) => {
        if (loyalty && loyalty.nextTierName) {
          this.translate.get(loyalty.nextTierName).subscribe(txt => this.nextTierName = txt);
        }
      })
    ).subscribe(
      (loyalty: ILoyalty) => {
        this.loyalty = loyalty;
        if (this.nextTierName) {
          this.pointTo = this.pointTo.replace('{nextTierName}', this.nextTierName);
        }
      }
    );

  }

  public getPercentageToNext(currentPoints: number, nextPoints: number | undefined): number {
    if (currentPoints && nextPoints) {
      return Math.round((currentPoints / nextPoints) * 100);
    }
    return 0;
  }

  private initTranslate(): void {
    this.translate.get('HOME.POINT_TO').subscribe((text) => this.pointTo = text);
    this.translate.get('HOME.WELCOME').subscribe((text) => this.welcomeTxt = text);
    this.translate.get('HOME.SUBTITLE').subscribe((text) => this.subTitle = text);
    this.translate.get('HOME.POINT_EXPIRE').subscribe((text) => this.pointExpire = text);
    this.translate.get('HOME.ACCOUNT_EXPIRE').subscribe((text) => this.accountExpire = text);
  }
}
