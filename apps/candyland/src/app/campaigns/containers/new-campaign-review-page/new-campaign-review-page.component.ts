import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CampaignCreationStoreService } from '@cl-core/services/campaigns-creation-store.service';

@Component({
  selector: 'cl-new-campaign-review-page',
  templateUrl: './new-campaign-review-page.component.html',
  styleUrls: ['./new-campaign-review-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignReviewPageComponent implements OnInit {
  public campaign;

  constructor( private store: CampaignCreationStoreService,
               private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.store.currentCampaign$.asObservable().subscribe( data => {
      this.campaign = data;
      this.cd.detectChanges();
    });
  }

}
