import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'cl-new-campaign-rewards-page',
  templateUrl: './new-campaign-rewards-page.component.html',
  styleUrls: ['./new-campaign-rewards-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsPageComponent implements OnInit {
  public enablePropability = false;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  changePropability(value: boolean) {
    this.enablePropability = value;
    this.cd.detectChanges();
  }

}
