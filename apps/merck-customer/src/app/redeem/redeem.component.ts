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

  public rewardDetails?: string;
  public rewardId?: number;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private profileService: ProfileService
  ) { }

  public ngOnInit(): void {
    const stringId : string | null = this.route.snapshot.paramMap.get('rewardId')
    if (stringId) {
      this.rewardId = parseInt(stringId, 10);
    }

    this.profileService.whoAmI().subscribe(
      (profile) => {
        if (this.rewardId) {
          this.rewardDetails = JSON.stringify(
            {
              id: profile.id,
              name: profile.lastName,
              identifier: profile.identifier,
              rewardId: this.rewardId
            });
        } else {
          this.rewardDetails = JSON.stringify(
            {
              id: profile.id,
              name: profile.lastName,
              identifier: profile.identifier
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
