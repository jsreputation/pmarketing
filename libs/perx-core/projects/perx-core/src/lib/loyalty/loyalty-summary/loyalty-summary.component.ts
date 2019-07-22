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

  public profile$: Observable<IProfile>;
  public loyalty$: Observable<ILoyalty>;

  constructor(
    private profileService: ProfileService,
    private loyaltyService: LoyaltyService
  ) { }

  public ngOnInit(): void {
    this.profile$ = this.profileService.whoAmI();
    this.loyalty$ = this.loyaltyId === undefined ?
      this.loyaltyService.getLoyalties().pipe(
        map(loyalties => loyalties && loyalties.length > 0 && loyalties[0])
      ) : this.loyaltyService.getLoyalty(this.loyaltyId);
  }

  public consoleLog(log: any): void {
    console.log(log);
  }
}
