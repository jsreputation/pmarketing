import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { MatTableDataSource } from '@angular/material';
import { EngagementsService } from '@cl-core/services/engagements.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';

@Component({
  selector: 'cl-new-campaign-select-engagement-page',
  templateUrl: './new-campaign-select-engagement-page.component.html',
  styleUrls: ['./new-campaign-select-engagement-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignSelectEngagementPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public dataSource = new MatTableDataSource<Engagement>();
  public typeFilterConfig: OptionConfig[];

  public get template(): AbstractControl {
    return this.form.get('template');
  }

  constructor(private engagementsService: EngagementsService,
              private store: CampaignCreationStoreService,
              private campaignCreationStepConditionService: StepConditionService,
              private fb: FormBuilder,
              public cd: ChangeDetectorRef) {
    this.initForm();
  }

  ngOnInit() {
    this.initData();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.form.valueChanges.pipe(
      untilDestroyed(this)
    )
      .subscribe(value => {
        this.campaignCreationStepConditionService.registerStepCondition(0, this.form.valid);
        this.store.updateCampaign(value);
      });
  }

  ngOnDestroy(): void {
  }

  private initForm() {
    this.form = this.fb.group({
      template: [null, [Validators.required]]
    });
    this.form.patchValue(this.store.currentCampaign);
  }

  private initData() {
    this.engagementsService.getEngagements()
      .pipe(
        map((response: any) => response.results),
        tap(data => {
          const counterObject = PrepareTableFilers.countFieldValue(data, 'type');
          this.typeFilterConfig = PrepareTableFilers.prepareOptionsConfig(counterObject);
        }),
      )
      .subscribe((res: Engagement[]) => {
        this.dataSource.data = res;
        this.cd.detectChanges();
      });
  }

}
