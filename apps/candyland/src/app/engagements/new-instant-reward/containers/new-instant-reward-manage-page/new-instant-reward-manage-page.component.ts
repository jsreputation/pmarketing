import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageControlValue } from '@cl-helpers/image-control-value';
import { combineLatest, Observable, of } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { tap, map, switchMap } from 'rxjs/operators';
import { ControlsName } from '../../../../models/controls-name';
import { IReward } from '@perx/core';
import { MockRewardsMobilePreview } from '../../../../../assets/actives/reward/reward-mock';
import {
  AvailableNewEngagementService, InstantRewardsService, RoutingStateService, SettingsService
} from '@cl-core/services';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { CreateImageDirective } from '@cl-shared/directives/create-image.directive';

@Component({
  selector: 'cl-new-instant-reward-manage-page',
  templateUrl: './new-instant-reward-manage-page.component.html',
  styleUrls: ['./new-instant-reward-manage-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewInstantRewardManagePageComponent implements OnInit, OnDestroy {
  @ViewChild(CreateImageDirective, {static: false}) public createImagePreview: CreateImageDirective;
  public form: FormGroup;
  public rewardData: {
    background: IGraphic[],
    cardBackground: IGraphic[]
  };
  public reward$: Observable<IReward[]>;
  public rewards$: Observable<IReward[]>;
  public id: string;
  public tenantSettings: ITenantsProperties;

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

  constructor(
    private fb: FormBuilder,
    private instantRewardsService: InstantRewardsService,
    // private engagementsService: EngagementsService,
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
    combineLatest([this.getRewardData(), this.handleRouteParams()])
      .subscribe(
        ([previewData, reward]) => {
          const patchData = reward || this.getDefaultValue(previewData);
          this.form.patchValue(patchData);
          this.cd.detectChanges();
        },
        (error: Error) => {
          console.warn(error.message);
          this.router.navigateByUrl('/engagements');
        }
      );
  }

  public ngOnDestroy(): void {
  }

  public getImgLink(control: FormControl, defaultImg: string): string {
    return ImageControlValue.getImgLink(control, defaultImg);
  }

  public save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.createImagePreview.getPreviewUrl()
      .pipe(switchMap((imageUrl: IUploadedFile) => {
        if (this.id) {
          return this.instantRewardsService.updateInstantReward(this.id,
            {...(this.form.value as IInstantRewardForm), image_url: imageUrl.url});
        }
        return this.instantRewardsService.createRewardGame({...this.form.value , image_url: imageUrl.url}).pipe(
          map((engagement: IResponseApi<IEngagementApi>) => EngagementHttpAdapter.transformEngagement(engagement.data)),
          tap((data: IEngagement) => this.availableNewEngagementService.setNewEngagement(data))
        );
      })).pipe(untilDestroyed(this))
      .subscribe(() => this.router.navigateByUrl('/engagements'));
  }

  public comeBack(): void {
    this.routingState.comeBackPreviousUrl();
  }

  private initRewardForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]
      ],
      headlineMessage: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      subHeadlineMessage: [null, [
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      banner: [null, [Validators.required]],
      cardBackground: [null, [Validators.required]],
      background: [null, [Validators.required]],
      buttonText: ['See my rewards', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]]
    });
  }

  private getDefaultValue(data: any): any {
    return {
      name: 'Instant Reward Template',
      headlineMessage: 'You have got rewards!',
      subHeadlineMessage: '',
      banner: 'reward',
      buttonText: 'See my rewards',
      [ControlsName.background]: data.background[0],
      [ControlsName.cardBackground]: data.cardBackground[0]
    };
  }

  private initPreviewData(): void {
    this.reward$ = of([MockRewardsMobilePreview[0]]);
    this.rewards$ = of(MockRewardsMobilePreview);
  }

  private initTenants(): void {
    this.settingsService.getTenantsSettings()
      .pipe(untilDestroyed(this))
      .subscribe(data => this.tenantSettings = data);
  }

  private getRewardData(): Observable<any> {
    return this.instantRewardsService.getInstantRewardData()
      .pipe(
        untilDestroyed(this),
        tap(data => this.rewardData = data)
      );
  }

  private handleRouteParams(): Observable<any> {
    return this.route.paramMap.pipe(
      untilDestroyed(this),
      map((params: ParamMap) => params.get('id')),
      tap(id => this.id = id),
      switchMap(id => {
        if (id) {
          return this.instantRewardsService.getInstantReward(id);
        }
        return of(null);
      })
    );
  }
}
