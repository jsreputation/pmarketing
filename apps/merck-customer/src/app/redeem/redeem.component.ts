import { Component, OnInit } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { combineLatest } from 'rxjs';
import { ProfileService } from '@perx/core';

@Component({
  selector: 'mc-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit, PageAppearence {

  public rewardDetails: string = null;
  public rewardId: number = null;

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

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: true,
      bottomSelectedItem: BarSelectedItem.NONE,
      pageTitle: ''
    };
  }
}
