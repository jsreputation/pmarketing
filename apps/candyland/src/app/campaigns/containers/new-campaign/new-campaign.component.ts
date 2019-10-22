import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CampaignsService, SettingsService, OutcomesService, CommsService, LimitsService } from '@cl-core-services';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { MatDialog, MatStepper } from '@angular/material';
import { NewCampaignDonePopupComponent, NewCampaignDonePopupComponentData } from '../new-campaign-done-popup/new-campaign-done-popup.component';
import { Router, ActivatedRoute } from '@angular/router';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';

import { map, switchMap, tap, catchError, takeUntil } from 'rxjs/operators';
import { combineLatest, iif, of, Observable, Subject } from 'rxjs';

import { ICampaignAttributes } from '@perx/whistler';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';
import { AudiencesUserService } from '@cl-core/services/audiences-user.service';
import { IComm } from '@cl-core/models/comm/schedule';
import { IOutcome } from '@cl-core/models/outcome/outcome';

@Component({
  selector: 'cl-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignComponent implements OnInit, OnDestroy {
  // private id: string;
  public form: FormGroup;
  private campaign: ICampaign;
  private campaignBaseURL: string;
  public tenantSettings: ITenantsProperties;
  @ViewChild('stepper', { static: false }) private stepper: MatStepper;

  private destroy$: Subject<any> = new Subject();

  constructor(
    public store: CampaignCreationStoreService,
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
    private audienceService: AudiencesUserService,
  ) {
    store.resetCampaign();
  }

  public ngOnInit(): void {
    this.getTenants();
    this.initForm();
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.store.updateCampaign(value);
      });
    this.handleRouteParams();
  }

  public ngOnDestroy(): void {
    this.cdr.detach();
    this.destroy$.next();
    this.destroy$.complete();
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

  public goNext(value?: MatStepper): void {
    const stepIndex = this.stepper.selectedIndex;
    this.stepConditionService.nextEvent(stepIndex);
    this.store.updateCampaign(this.stepConditionService.getStepFormValue(stepIndex));
    if (!value) {
      this.stepper.next();
    }
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
      tap((res: IJsonApiPayload<ICampaignAttributes>) => this.campaignBaseURL = `${this.campaignBaseURL}?cid=${res.data.id}`),
      switchMap(
        (res) => iif(hasLimitData, updateLimitData$(res), of(res))
      ),
      takeUntil(this.destroy$)
    ).subscribe(
      data => {
        if (data) {
          this.openDialog();
        }
      },
      (error: Error) => console.warn(error.message)
    );
  }

  private getDialogData(campaign: ICampaign): Observable<NewCampaignDonePopupComponentData> {
    const type = ('channel' in campaign && 'type' in campaign.channel) ? campaign.channel.type : '';
    const title: string = 'Yay! You just created a campaign';
    if (type === 'weblink' && campaign.audience && campaign.audience.select) {
      return this.buildCampaignCsv(campaign)
        .pipe(
          map(csv => {
            // const b = new Blob([csv], { type: 'application/csv;charset=utf-8;' });
            //  const url = URL.createObjectURL(b);
            const url = `data:application/octet-stream;charset=utf-16le;base64,${btoa(csv)}`;

            return {
              title,
              subTitle: 'Download your individual links',
              url,
              type: 'download'
            };
          })
        );
    }
    if (type === 'weblink') {
      return this.blackcombUrl
        .pipe(map(url => ({
          title,
          subTitle: 'Copy the link and share your campaign.',
          url,
          type
        })));
    }

    return of({
      title,
      type
    });
  }

  private buildCampaignCsv(campaign: ICampaign): Observable<string> {
    const getUsersPis: Observable<string[]> = this.audienceService
      .getAllPoolUser(campaign.audience.select)
      .pipe(
        map((users: IJsonApiItem<IUserApi>[]) => users.map(u => u.attributes.primary_identifier)),
        takeUntil(this.destroy$)
      );
    return combineLatest(getUsersPis, this.blackcombUrl)
      .pipe(map(([pis, url]: [string[], string]) => {
        return pis.reduce((p: string, v: string) => `${p}${v},${url}&pi=${v},\n`, 'identifier,urls,\n');
      }),
      takeUntil(this.destroy$)
      );
  }

  private get blackcombUrl(): Observable<string> {
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
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((res: Tenants) => {
        this.tenantSettings = SettingsHttpAdapter.getTenantsSettings(res);
        this.campaignBaseURL = res.display_properties.campaign_base_url;
        this.cdr.detectChanges();
      });
  }

  private handleRouteParams(): void {
    const campaignId = this.route.snapshot.params.id;
    const paramsComm: HttpParamsOptions = {
      'filter[owner_id]': campaignId,
      'filter[owner_type]': 'Perx::Campaign::Entity',
      include: 'template',
    };
    const paramsPO: HttpParamsOptions = {
      'filter[campaign_entity_id]': campaignId
    };
    if (campaignId) {
      combineLatest(
        this.campaignsService.getCampaign(campaignId).pipe(catchError(() => of(null))),
        this.commsService.getCommsEvent(paramsComm).pipe(catchError(() => of(null))),
        this.outcomesService.getOutcomes(paramsPO).pipe(
          map(outcomes => outcomes.map(outcome => ({ ...outcome, probability: outcome.probability * 100 }))),
          catchError(() => of(null)))
      ).pipe(
        map(
          ([campaign, commEvent, outcomes]:
            [ICampaign | null, IComm | null, IOutcome[] | null]): ICampaign => ({
              ...campaign,
              audience: { select: commEvent && commEvent.poolId || null },
              channel: {
                type: commEvent && commEvent.channel || 'weblink',
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
