import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AvailableNewEngagementService, EngagementsService } from '@cl-core/services';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { AbstractStepWithForm } from 'src/app/campaigns/step-page-with-form';
import { CreateEngagementPopupComponent } from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.component';

@Component({
  selector: 'cl-new-campaign-select-engagement-page',
  templateUrl: './new-campaign-select-engagement-page.component.html',
  styleUrls: ['./new-campaign-select-engagement-page.component.scss']
})
export class NewCampaignSelectEngagementPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  public form: FormGroup;
  public dataSource = new MatTableDataSource<IEngagement>();
  public defaultSearchValue = null;
  public defaultTypeValue = null;
  public typeFilterConfig: OptionConfig[];

  public get template(): AbstractControl {
    return this.form.get('template');
  }

  constructor(private engagementsService: EngagementsService,
              private availableNewEngagementService: AvailableNewEngagementService,
              public store: CampaignCreationStoreService,
              public stepConditionService: StepConditionService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              public cd: ChangeDetectorRef) {
    super(0, store, stepConditionService, cd);
    this.initForm();
    this.initFiltersDefaultValue();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.initData();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
  }

  public ngOnDestroy(): void {
    this.availableNewEngagementService.remove();
  }

  public createNewEngagement(): void {
    this.dialog.open(CreateEngagementPopupComponent);
  }

  private initForm(): void {
    this.form = this.fb.group({
      template: [null, [Validators.required]]
    });
    this.form.patchValue(this.store.currentCampaign);
  }

  private initFiltersDefaultValue(): void {
    if (this.availableNewEngagementService.isAvailable) {
      this.defaultSearchValue = this.availableNewEngagementService.newEngagement.title;
      this.defaultTypeValue = this.availableNewEngagementService.newEngagement.attributes_type;
    }
  }

  private initData(): void {
    this.engagementsService.getEngagements()
      .pipe(
        tap(data => {
          const counterObject = PrepareTableFilers.countFieldValue(data, 'attributes_type');
          this.typeFilterConfig = PrepareTableFilers.prepareOptionsConfig(counterObject);
        })
      )
      .subscribe((res: IEngagement[]) => {
        this.dataSource.data = res;
        this.initSelectedTemplate(res);
        this.cd.detectChanges();
      });
  }

  private initSelectedTemplate(res: IEngagement[]): void {
    if (this.availableNewEngagementService.isAvailable) {
      const id = this.availableNewEngagementService.newEngagement.id;
      const findTemplate = res.find(template => template.id === id);
      this.template.patchValue(findTemplate);
    }
  }
}
