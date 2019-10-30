import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { of } from 'rxjs';
import { tap, map, catchError, takeUntil } from 'rxjs/operators';

import { PrepareTableFilters } from '@cl-helpers/prepare-table-filters';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AvailableNewEngagementService, EngagementsService, LimitsService } from '@cl-core/services';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { AbstractStepWithForm } from 'src/app/campaigns/step-page-with-form';
import { CreateEngagementPopupComponent } from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.component';
import { ActivatedRoute } from '@angular/router';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';
import { ILimit } from '@cl-core/models/limit/limit.interface';

@Component({
  selector: 'cl-new-campaign-select-engagement-page',
  templateUrl: './new-campaign-select-engagement-page.component.html',
  styleUrls: ['./new-campaign-select-engagement-page.component.scss']
})
export class NewCampaignSelectEngagementPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  @Input() public tenantSettings: ITenantsProperties;
  public form: FormGroup;
  public dataSource: MatTableDataSource<IEngagement> = new MatTableDataSource<IEngagement>();
  public defaultSearchValue: any = null;
  public defaultTypeValue: any = null;
  public typeFilterConfig: OptionConfig[];
  public isFirstInit: boolean = true;

  public get template(): AbstractControl {
    return this.form.get('template');
  }

  constructor(
    private engagementsService: EngagementsService,
    private availableNewEngagementService: AvailableNewEngagementService,
    public store: CampaignCreationStoreService,
    public stepConditionService: StepConditionService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public cd: ChangeDetectorRef,
    private limitsService: LimitsService,
    private route: ActivatedRoute
  ) {
    super(0, store, stepConditionService);
    this.initForm();
    this.initFiltersDefaultValue();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.initData();
    this.dataSource.filterPredicate = PrepareTableFilters.getClientSideFilterFunction();
    this.subscribeFormValueChange();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.cd.detach();
    this.availableNewEngagementService.remove();
  }

  public createNewEngagement(): void {
    this.dialog.open(CreateEngagementPopupComponent);
  }

  private initForm(): void {
    this.form = this.fb.group({
      template: [null, [Validators.required]]
    });
    // this.form.patchValue({ theme: {} });
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
          const counterObject = PrepareTableFilters.countFieldValue(data, 'attributes_type');
          this.typeFilterConfig = PrepareTableFilters.prepareOptionsConfig(counterObject);
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
      this.initSelectedNewCreateTemplate(res, this.availableNewEngagementService.newEngagement.id);
    } else if (this.route.snapshot.params.id) {
      this.initSelectedTemplateFromEdit(res);
    }
  }
  private initSelectedNewCreateTemplate(res: IEngagement[], id: string): void {
    if (id) {
      const findTemplate = res.find(template => template.id === id);
      this.template.patchValue(findTemplate);
    }
  }

  private initSelectedTemplateFromEdit(res: IEngagement[]): void {
    this.store.currentCampaign$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(campaignData => {
        if (campaignData && campaignData.engagement_id && this.isFirstInit) {
          this.isFirstInit = false;
          const engagementId = campaignData.engagement_id.toString();
          const findTemplate = res.find(template =>
            template.id === engagementId && template.attributes_type === campaignData.engagement_type);
          this.getLimits(campaignData, findTemplate);
          this.template.patchValue(findTemplate);
        }
      });

  }

  private getLimits(campaignData: ICampaign, findTemplate: IEngagement): void {
    const params: HttpParamsOptions = {
      'filter[campaign_entity_id]': campaignData.id
    };
    this.limitsService.getLimits(params, findTemplate.attributes_type).pipe(
      map((limits: ILimit[]) => limits[0]),
      catchError(() => of({ times: null }))
    ).subscribe(
      limits => {
        const newCampaign = { ...campaignData, limits };
        this.store.updateCampaign(newCampaign);
      }
    );
  }

  private subscribeFormValueChange(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        this.store.updateCampaign(val);
      });
  }

}
