import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { LoyaltyService } from '../loyalty.service';
import { ProfileService } from '../../profile/profile.service';
import { IProfile } from '../../profile/profile.model';
import { ILoyalty } from '../models/loyalty.model';
import { map } from 'rxjs/operators';

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

  constructor(
    private profileService: ProfileService,
    private loyaltyService: LoyaltyService
  ) { }

  public ngOnInit(): void {
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
