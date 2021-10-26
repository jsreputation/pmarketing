import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'bdo-treat-enroll-page',
  templateUrl: './treat-enroll-page.component.html',
  styleUrls: ['./treat-enroll-page.component.scss'],
})
export class TreatEnrollPageComponent {
  campaignID: number;
  constructor(
    // private campaignService: ICampaignService,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.activeRoute.params.pipe(
      switchMap((param) => this.campaignID = param.id)
    );
    console.log(this.campaignID)
  }

}
