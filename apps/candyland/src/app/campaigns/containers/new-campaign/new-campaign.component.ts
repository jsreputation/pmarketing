import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CampaignsService, SettingsService, OutcomesService, CommsService, LimitsService } from '@cl-core-services';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { MatDialog, MatStepper } from '@angular/material';
import { NewCampaignDonePopupComponent, NewCampaignDonePopupComponentData } from '../new-campaign-done-popup/new-campaign-done-popup.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Router, ActivatedRoute } from '@angular/router';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest, iif, of, Observable } from 'rxjs';
import { IComm, IOutcome } from '@perx/whistler';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';
import { AudiencesUserService } from '@cl-core/services/audiences-user.service';

@Component({
  selector: 'cl-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignComponent implements OnInit, OnDestroy {
  public id: string;
  public form: FormGroup;
  public campaign: ICampaign;
  public campaignBaseURL: string;
  public tenantSettings: ITenantsProperties;
  @ViewChild('stepper', { static: false }) private stepper: MatStepper;

  constructor(
    private store: CampaignCreationStoreService,
    private stepConditionService: StepConditionService,
    private campaignsService: CampaignsService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private settingsService: SettingsService,
    private commsService: CommsService,
    private outcomesService: OutcomesService,
    private limitsService: LimitsService,
    private audienceService: AudiencesUserService
  ) {
    store.resetCampaign();
  }

  public ngOnInit(): void {
    this.getTenants();
    this.initForm();
    this.form.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        this.store.updateCampaign(value);
      });
    this.handleRouteParams();
  }

  public ngOnDestroy(): void {
    this.store.currentCampaign = null;
    this.cdr.detach();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['Campaign Name', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)
      ]
      ]
    });
  }

  public get name(): AbstractControl {
    return this.form.get('name');
  }

  public getStepCondition(key: number): boolean {
    return this.stepConditionService.getStepCondition(key);
  }

  public goBack(): void {
    this.stepper.previous();
  }

  public goNext(): void {
    const stepIndex = this.stepper.selectedIndex;
    this.stepConditionService.nextEvent(stepIndex);
    this.store.updateCampaign(this.stepConditionService.getStepFormValue(stepIndex));
    this.stepper.next();
  }

  public get isLastStep(): boolean {
    return this.stepper && this.stepper.selectedIndex === this.stepper._steps.length - 1;
  }

  public save(): void {
    this.store.updateCampaign(this.form.value);
    let saveCampaign$;
    let updateLimitData$;
    const updateLimit$ = campaign => this.limitsService.updateLimits(
      this.store.currentCampaign.limits.id,
      this.store.currentCampaign.limits,
      this.store.currentCampaign.template.attributes_type,
      campaign.data.id,
      this.store.currentCampaign.template.id
    );
    const createLimit$ = campaign => this.limitsService.createLimits(
      this.store.currentCampaign.limits,
      this.store.currentCampaign.template.attributes_type,
      campaign.data.id,
      this.store.currentCampaign.template.id
    );

    if (this.campaign) {
      saveCampaign$ = this.campaignsService.updateCampaign(this.campaign.id, this.store.currentCampaign);
      updateLimitData$ = this.store.currentCampaign.limits.id ? updateLimit$ : createLimit$;
    } else {
      saveCampaign$ = this.campaignsService.createCampaign(this.store.currentCampaign);
      updateLimitData$ = createLimit$;
    }
    const hasLimitData = () => this.store.currentCampaign.limits && this.store.currentCampaign.limits.times;
    saveCampaign$.pipe(
      switchMap(
        (res) => iif(hasLimitData, updateLimitData$(res), of(res))
      )
    ).subscribe(
      data => {
        if (data) {
          this.campaignBaseURL = this.campaignBaseURL + '?cid=' + data.id;
          this.openDialog();
          this.store.currentCampaign = null;
        }
      },
      (error: Error) => console.warn(error.message)
    );
  }

  private getDialogData(campaign: ICampaign): Observable<NewCampaignDonePopupComponentData> {
    const type = ('channel' in campaign && 'type' in campaign.channel) ? campaign.channel.type : '';
    const title: string = 'Yay! You just created a campaign';
    if (type === 'weblink' && campaign.audience) {
      return this.buildCampaignCsv()
        .pipe(
          map(csv => ({
            title,
            subTitle: csv,
            type: 'download'
          }))
        );
    }
    if (type === 'weblink') {
      return this.blackcombUrl
        .pipe(map(url => ({
          title,
          subTitle: 'Copy the link and share your campaign.',
          url
        })));
    }

    return of({
      title,
      type
    });
  }

  private buildCampaignCsv(): Observable<string> {
    const getUsersPis: Observable<string[]> = this.audienceService
      .getAllPoolUser(this.campaign.audience.select)
      .pipe(
        map((users: IUserApi[]) => users.map(u => u.primary_identifier)),
      );
    const cid = this.campaign.id;
    return combineLatest(getUsersPis, this.blackcombUrl)
      .pipe(map(([pis, url]: [string[], string]) => {
        return pis.reduce((p: string, v: string) => `${p}${url}/?pi=${v}&cid=${cid},\n`, 'urls\n');
      }));
  }

  private get blackcombUrl(): Observable<string> {
    // TODO
    return of(this.campaignBaseURL);
  }

  private openDialog(): void {
    this.getDialogData(this.store.currentCampaign)
      .pipe(
        switchMap((config) => this.dialog.open(NewCampaignDonePopupComponent, { data: config }).afterClosed())
      )
      .subscribe(() => this.router.navigate(['/campaigns']));
  }

  private getTenants(): void {
    this.settingsService.getTenants()
      .subscribe((res: Tenants) => {
        this.tenantSettings = SettingsHttpAdapter.getTenantsSettings(res);
        this.campaignBaseURL = res.display_properties.campaign_base_url;
        this.cdr.detectChanges();
      });
  }

  private handleRouteParams(): void {
    const campaignId = this.route.snapshot.params.id;
    const params: HttpParamsOptions = {
      'filter[campaign_entity_id]': campaignId
    };
    if (campaignId) {
      combineLatest(
        this.campaignsService.getCampaign(campaignId),
        this.commsService.getCommsTemplate(params).pipe(
          map((comms: IComm[]) => comms[0])
        ),
        this.commsService.getCommsEvents(params).pipe(
          map((comms: IComm[]) => comms[0])
        ),
        this.outcomesService.getOutcomes(params)).pipe(
          map(
            ([campaign, commTemplate, commEvent, outcomes]:
              [ICampaign, IComm, IComm, IOutcome[]]): ICampaign => ({
                ...campaign,
                channel: {
                  type: campaign.channel.type,
                  ...commTemplate,
                  ...commEvent
                },
                rewardsList: outcomes
              }))
        ).subscribe(
          campaign => {
            this.campaign = Object.assign({}, campaign);
            this.store.initCampaign(campaign);
            this.form.patchValue({
              name: this.campaign.name
            });
          },
          () => this.router.navigateByUrl('/campaigns')
        );
    }
  }
}
