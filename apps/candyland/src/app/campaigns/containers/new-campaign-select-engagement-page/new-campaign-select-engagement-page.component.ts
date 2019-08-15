import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { EngagementsService } from '@cl-core/services/engagements.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { AbstractStepWithForm } from 'src/app/campaigns/step-page-with-form';
import { CreateEngagementPopupComponent } from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.component';

@Component({
  selector: 'cl-new-campaign-select-engagement-page',
  templateUrl: './new-campaign-select-engagement-page.component.html',
  styleUrls: ['./new-campaign-select-engagement-page.component.scss'],
})
export class NewCampaignSelectEngagementPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  public form: FormGroup;
  public dataSource = new MatTableDataSource<Engagement>();
  public typeFilterConfig: OptionConfig[];

  public get template(): AbstractControl {
    return this.form.get('template');
  }

  constructor(private engagementsService: EngagementsService,
              public store: CampaignCreationStoreService,
              public stepConditionService: StepConditionService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              public cd: ChangeDetectorRef) {
    super(0, store, stepConditionService, cd);
    this.initForm();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.initData();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
  }

  public ngOnDestroy(): void {
  }

  public createNewEngagement() {
    this.dialog.open(CreateEngagementPopupComponent);
  }

  private initForm(): void {
    this.form = this.fb.group({
      template: [null, [Validators.required]]
    });
    this.form.patchValue(this.store.currentCampaign);
  }

  private initData(): void {
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
