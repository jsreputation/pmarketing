import { Component, OnInit } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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

    this.rewardId = +this.route.snapshot.paramMap.get('rewardId');

    this.profileService.whoAmI().subscribe(
        (profile) => {
          if (this.rewardId) {
            this.rewardDetails = JSON.stringify(
              {
                id: profile.id,
                name: profile.lastName,
                rewardId: this.rewardId
              });
          } else {
            this.rewardDetails = JSON.stringify(
            {
              id: profile.id,
              name: profile.lastName
            });
          }
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
