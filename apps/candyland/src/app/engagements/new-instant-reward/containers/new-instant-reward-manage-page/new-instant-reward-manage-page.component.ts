import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageControlValue } from '@cl-helpers/image-control-value';

import { combineLatest, Observable, of, Subject } from 'rxjs';
import { tap, map, switchMap, takeUntil } from 'rxjs/operators';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ControlsName } from '../../../../models/controls-name';
import { IReward } from '@perx/core';
import { MockRewardsMobilePreview } from '../../../../../assets/actives/reward/reward-mock';
import {
  AvailableNewEngagementService, InstantRewardsService, RoutingStateService
} from '@cl-core/services';
import { SimpleMobileViewComponent } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.component';
import { IWEngagementAttributes, IJsonApiItemPayload } from '@perx/whistler';
import { IUploadedFile } from '@cl-core/models/upload-file/uploaded-file.interface';
import { TenantService } from '@cl-core/services/tenant.service';

@Component({
  selector: 'cl-new-instant-reward-manage-page',
  templateUrl: './new-instant-reward-manage-page.component.html',
  styleUrls: ['./new-instant-reward-manage-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewInstantRewardManagePageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(SimpleMobileViewComponent, { static: false }) public simpleMobileViewComponent: SimpleMobileViewComponent;

  private destroy$: Subject<void> = new Subject();

  public currentSelectedMobileTab: number = 0;
  public form: FormGroup;
  public rewardData: IRewardDefaultValue;
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
    private routingState: RoutingStateService,
    private availableNewEngagementService: AvailableNewEngagementService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private tenantService: TenantService
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

  public ngAfterViewInit(): void {
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getImgLink(control: AbstractControl, defaultImg: string): string {
    return ImageControlValue.getImgLink(control, defaultImg);
  }

  public save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.simpleMobileViewComponent.createPreview()
      .pipe(switchMap((imageUrl: IUploadedFile) => {
        if (this.id) {
          return this.instantRewardsService.updateInstantReward(this.id,
            { ...(this.form.value as IRewardForm), image_url: imageUrl.url });
        }
        return this.instantRewardsService.createRewardGame({ ...this.form.value, image_url: imageUrl.url })
          .pipe(
            tap(
              (engagement: IJsonApiItemPayload<IWEngagementAttributes>) =>
                this.availableNewEngagementService.transformAndSetNewEngagement(engagement)
            )
          );
      })).pipe(takeUntil(this.destroy$))
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
      buttonText: ['See my Rewards', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]]
    });
  }

  private getDefaultValue(data: IRewardDefaultValue): IRewardForm {
    return {
      name: 'Instant Reward Template',
      headlineMessage: 'You have got rewards!',
      subHeadlineMessage: '',
      banner: 'reward',
      buttonText: 'See my Rewards',
      [ControlsName.background]: data.background[0],
      [ControlsName.cardBackground]: data.cardBackground[0],
      image_url: null
    };
  }

  private initPreviewData(): void {
    this.reward$ = of([MockRewardsMobilePreview[0]]);
    this.rewards$ = of(MockRewardsMobilePreview);
  }

  private initTenants(): void {
    this.tenantService.getSettings()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: ITenantsProperties) => {
        this.tenantSettings = res;
        this.cd.detectChanges();
      });
  }

  private getRewardData(): Observable<IRewardDefaultValue> {
    return this.instantRewardsService.getInstantRewardData()
      .pipe(
        tap(data => this.rewardData = data),
        takeUntil(this.destroy$)
      );
  }

  private handleRouteParams(): Observable<IRewardForm | null> {
    return this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      tap(id => this.id = id),
      switchMap(id => {
        if (id) {
          return this.instantRewardsService.getInstantReward(id);
        }
        return of(null);
      }),
      takeUntil(this.destroy$)
    );
  }
}
