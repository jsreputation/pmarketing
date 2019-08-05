import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'cl-new-campaign-review-page',
  templateUrl: './new-campaign-review-page.component.html',
  styleUrls: ['./new-campaign-review-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignReviewPageComponent implements OnInit, OnDestroy {
  public campaign;

  constructor(private store: CampaignCreationStoreService,
              private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.store.currentCampaign$.asObservable()
      .pipe(untilDestroyed(this))
      .subscribe(data => {
      this.campaign = data;
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
  }
}
