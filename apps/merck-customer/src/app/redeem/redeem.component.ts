import { Component, OnInit } from '@angular/core';
import { PageProperties, BarSelectedItem } from '../page-properties';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { combineLatest } from 'rxjs';
import { ProfileService } from '@perx/core';

@Component({
  selector: 'mc-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit, PageProperties {

  public rewardDetails: string = null;
  private rewardId: number = null;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private profileService: ProfileService
  ) {}

  public ngOnInit(): void {
    combineLatest([
      this.profileService.whoAmI() ,
      this.route.paramMap
    ]).subscribe(
        ([profile, params]) => {
          const rewarIdParam = params.get('rewardId');
          if (!rewarIdParam) {
            return;
          }
          this.rewardId = +rewarIdParam;
          this.rewardDetails = JSON.stringify(
            { id: profile.id,
              name: profile.lastName,
              rewardId: this.rewardId
            });
        }
    );
  }

  public onCancel(): void {
    this.location.back();
  }

  public showHeader(): boolean {
    return true;
  }

  public bottomSelectedItem(): BarSelectedItem {
    return BarSelectedItem.NONE;
  }

  public backButtonEnabled(): boolean {
    return true;
  }
}
