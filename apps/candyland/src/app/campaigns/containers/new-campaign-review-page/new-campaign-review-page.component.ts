import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { AbstractStepWithForm } from '../../step-page-with-form';

@Component({
  selector: 'cl-new-campaign-review-page',
  templateUrl: './new-campaign-review-page.component.html',
  styleUrls: ['./new-campaign-review-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignReviewPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  constructor(public store: CampaignCreationStoreService,
              public cd: ChangeDetectorRef) {
    super(0, store, null, cd);
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
  }
}
