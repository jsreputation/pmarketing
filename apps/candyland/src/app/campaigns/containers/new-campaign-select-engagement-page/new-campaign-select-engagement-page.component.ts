import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { of } from 'rxjs';
import { tap, map, catchError, takeUntil } from 'rxjs/operators';

import { PrepareTableFilters } from '@cl-helpers/prepare-table-filters';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { AvailableNewEngagementService, EngagementsService, LimitsService } from '@cl-core/services';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { AbstractStepWithForm } from 'src/app/campaigns/step-page-with-form';
import { CreateEngagementPopupComponent } from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.component';
import { ActivatedRoute } from '@angular/router';
import { ICampaign } from '@cl-core/models/campaign/campaign';
import { ILimit } from '@cl-core/models/limit/limit.interface';
import { IEngagementType } from '@cl-core/models/engagement/engagement.interface';
import { ITenantsProperties } from '@cl-core/models/settings/tenants.properties.interface';
import { HttpParamsOptions } from '@cl-core/models/params-map';
import { OptionConfig } from '@perx/candyshop';

@Component({
  selector: 'cl-new-campaign-select-engagement-page',
  templateUrl: './new-campaign-select-engagement-page.component.html',
  styleUrls: ['./new-campaign-select-engagement-page.component.scss']
})
export class NewCampaignSelectEngagementPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  @Input() public tenantSettings: ITenantsProperties;
  public form: FormGroup;
  public dataSource: MatTableDataSource<IEngagementType> = new MatTableDataSource<IEngagementType>();
  public defaultSearchValue: any = null;
  public defaultTypeValue: any = null;
  public typeFilterConfig: OptionConfig[];
  public isFirstInit: boolean = true;
  public hasData: boolean;
  public noData: boolean;
  public templateIndex: number;
  public campaignEngagementType: string;
  public templateID: string;
  @ViewChild(MatPaginator, { static: false }) private paginator: MatPaginator;

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
    super(1, store, stepConditionService);
    this.initForm();
    this.initFiltersDefaultValue();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.initData();
    this.subscribeFormValueChange();
    this.subscribeStoreChanges();
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
      .subscribe((res: IEngagementType[]) => {
        this.hasData = res && res.length > 0;
        this.noData = res && res.length === 0;
        this.dataSource.data = res;
        this.cd.detectChanges();
        if (this.noData) {
          return;
        }
        this.initSelectedTemplate(res);
        this.dataSource.filterPredicate = PrepareTableFilters.getClientSideFilterFunction();
        if (this.templateIndex) {
          this.paginator.pageIndex = Math.ceil(this.templateIndex / this.paginator.pageSize) - 1;
        }
        this.dataSource.paginator = this.paginator;
      });
  }

  private initSelectedTemplate(res: IEngagementType[]): void {
    if (this.availableNewEngagementService.isAvailable) {
      this.initSelectedNewCreateTemplate(res, this.availableNewEngagementService.newEngagement.id);
    } else if (this.route.snapshot.params.id) {
      this.initSelectedTemplateFromEdit(res);
    }
  }

  private initSelectedNewCreateTemplate(res: IEngagementType[], id: string): void {
    if (id) {
      this.templateIndex = res.findIndex(template => template.id === id);
      this.template.patchValue(res[this.templateIndex]);
    }
  }

  private initSelectedTemplateFromEdit(res: IEngagementType[]): void {
    this.store.currentCampaign$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(campaignData => {
        if (campaignData && campaignData.engagement_id && this.isFirstInit) {
          this.isFirstInit = false;
          const engagementId = campaignData.engagement_id.toString();
          this.templateIndex = res.findIndex(template =>
            template.id === engagementId && template.attributes_type === campaignData.engagement_type);
          const findTemplate = res[this.templateIndex];
          this.getLimits(campaignData, findTemplate);
          this.template.patchValue(findTemplate);
        }
      });

  }

  private getLimits(campaignData: ICampaign, findTemplate?: IEngagementType): void {
    if (!findTemplate) {
      return;
    }
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

  private subscribeStoreChanges(): void {
    this.store.currentCampaign$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ICampaign) => {
        if (data && data.template && (this.templateID !== data.template.id || !this.templateID)) {
          this.templateID = data.template.id;
          this.campaignEngagementType = data.template.attributes_type;
          this.cd.detectChanges();
        }
      });
  }

}
