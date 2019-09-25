import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageControlValue } from '@cl-helpers/image-control-value';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { tap, map, switchMap } from 'rxjs/operators';
import { ControlsName } from '../../../../models/controls-name';
import { IReward } from '@perx/core';
import { MockRewardsMobilePreview } from '../../../../../assets/actives/reward/reward-mock';
import {
  AvailableNewEngagementService, EngagementsService, InstantRewardsService, RoutingStateService, SettingsService
} from '@cl-core/services';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';

@Component({
  selector: 'cl-new-instant-reward-manage-page',
  templateUrl: './new-instant-reward-manage-page.component.html',
  styleUrls: ['./new-instant-reward-manage-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewInstantRewardManagePageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  // public rewardData$: Observable<{
  //   background: IGraphic[],
  //   cardBackground: IGraphic[]
  // }>;
  public rewardData: {
    background: IGraphic[],
    cardBackground: IGraphic[]
  };
  public reward$: Observable<IReward[]>;
  public rewards$: Observable<IReward[]>;
  public id: string;
  public tenantSettings: ITenantsProperties;

  constructor(
    private fb: FormBuilder,
    private instantRewardsService: InstantRewardsService,
    private engagementsService: EngagementsService,
    private routingState: RoutingStateService,
    private availableNewEngagementService: AvailableNewEngagementService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private settingsService: SettingsService
  ) {
  }

  public ngOnInit(): void {
    this.initPreviewData();
    this.initTenants();
    this.initRewardForm();
    // this.handleRouteParams();
    this.form.patchValue(this.getDefaultValue())
  }

  public ngOnDestroy(): void {
  }

  public get name(): AbstractControl {
    return this.form.get(ControlsName.name);
  }

  public get headlineMessage(): AbstractControl {
    return this.form.get(ControlsName.headlineMessage);
  }

  public get subHeadlineMessage(): AbstractControl {
    return this.form.get(ControlsName.subHeadlineMessage);
  }

  public get buttonText(): AbstractControl {
    return this.form.get(ControlsName.buttonText);
  }

  public get background(): AbstractControl {
    return this.form.get(ControlsName.background);
  }

  public get cardBackground(): AbstractControl {
    return this.form.get(ControlsName.cardBackground);
  }

  public getImgLink(control: FormControl, defaultImg: string): string {
    return ImageControlValue.getImgLink(control, defaultImg);
  }

  public save(): void {
    this.instantRewardsService.createRewardGame((this.form.value as IInstantRewardForm))
      .pipe(
        untilDestroyed(this),
        map((engagement: IResponseApi<IEngagementApi>) => EngagementHttpAdapter.transformEngagement(engagement.data))
      )
      .subscribe((data: IEngagement) => {
        this.availableNewEngagementService.setNewEngagement(data);
        this.router.navigateByUrl('/engagements');
      });
  }

  public comeBack(): void {
    this.routingState.comeBackPreviousUrl();
  }

  private initRewardForm(): void {
    this.form = this.fb.group({
      name: ['Instant Reward Template', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]
      ],
      headlineMessage: ['You have got rewards!', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      subHeadlineMessage: [null, [
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      banner: ['reward', [Validators.required]],
      cardBackground: [null, [Validators.required]],
      background: [null, [Validators.required]],
      buttonText: ['See my rewards', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]]
    });
  }

  private getDefaultValue() {
    return {
      name: 'Instant Reward Template',
      headlineMessage: 'You have got rewards!',
      subHeadlineMessage: '',
      banner: 'reward',
      // cardBackground: null,
      // background: null,
      buttonText: 'See my rewards',
      [ControlsName.background]: this.rewardData.background[0],
      [ControlsName.cardBackground]: this.rewardData.cardBackground[0]
    };
  }

  private initPreviewData(): void {
    this.reward$ = of([MockRewardsMobilePreview[0]]);
    this.rewards$ = of(MockRewardsMobilePreview);
    // this.rewardData$ =  this.instantRewardsService.getRewardData();
    this.instantRewardsService.getRewardData().subscribe(data => this.rewardData = data);
    // this.instantRewardsService.getRewardData()
      // .pipe(untilDestroyed(this))
      // .subscribe(data => this.rewardData = data);
    // .pipe(
    //   tap((res) => {
    //     this.form.patchValue({
    //       [ControlsName.background]: res.background[0],
    //       [ControlsName.cardBackground]: res.cardBackground[0]
    //     });
    //   })
    // );
  }

  private initTenants(): void {
    this.settingsService.getTenantsSettings()
      .pipe(untilDestroyed(this))
      .subscribe(data => this.tenantSettings = data);
  }

  private handleRouteParams(): void {
    this.route.paramMap.pipe(
      untilDestroyed(this),
      map((params: ParamMap) => params.get('id')),
      tap(id => this.id = id),
      switchMap(id => this.engagementsService.getEngagement(id))
    )
      .subscribe(
        (reward) => {
          // this.form.patchValue(reward);
          // this.form.patchValue(this.getDefaultValue);
          // this.data = Utils.nestedObjectAssign(this.data, reward);
          this.cd.detectChanges();
        },
        // () => this.router.navigateByUrl('/rewards')
      );
  }
}
