import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReward, ILoyalty, LoyaltyService } from '@perx/core';
import { TranslateService } from '@ngx-translate/core';
import { Profile } from 'selenium-webdriver/firefox';
// import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'hkbn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loyalty: ILoyalty;
  public subTitleFn: (loyalty: ILoyalty) => string;
  public titleFn: (profile: Profile) => string;

  constructor(
    private router: Router,
    private loyaltyService: LoyaltyService,
    private translate: TranslateService
  ) { }

  public goToReward(reward: IReward): void {
    this.router.navigate(['/reward', reward.id]);
  }

  public ngOnInit(): void {
    this.loyaltyService.getLoyalty()
      .subscribe(
        (loyalty: ILoyalty) => this.loyalty = loyalty
      );

    this.translate.get('YOU_HAVE')
      .subscribe((res: string) => {
        this.subTitleFn = () => res;
      });
    this.translate.get('HELLO')
      .subscribe((res: string) => {
        this.titleFn = () => res;
      });
  }
}
