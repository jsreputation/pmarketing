import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RewardService } from '@cl-core/http-services/reward.service';
import { Observable, of } from 'rxjs';
import { RoutingStateService } from '@cl-core/services/routing-state.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ControlsName } from '../../../../models/controls-name';
import { IReward } from '@perx/core';
import { MockRewardsMobilePreview } from '../../../../../assets/actives/reward/reward-mock';
import { ControlValueService } from '@cl-core/services/control-value.service';

@Component({
  selector: 'cl-new-instant-reward-appearance-page',
  templateUrl: './new-instant-reward-appearance-page.component.html',
  styleUrls: ['./new-instant-reward-appearance-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewInstantRewardAppearancePageComponent implements OnInit {
  public formReward: FormGroup;
  public rewardData$: Observable<{
    background: IGraphic[],
    cardBackground: IGraphic[]
  }>;
  public reward$: Observable<IReward[]>;
  public reward: Observable<IReward>;
  public rewardId: number = 8;
  constructor(private fb: FormBuilder,
              private rewardService: RewardService,
              private routingState: RoutingStateService,
              private router: Router,
              private controlValueService: ControlValueService) { }

  public ngOnInit(): void {
    this.createRewardForm();
    this.getRewardData();
    console.log(MockRewardsMobilePreview);
    this.reward$ = of([MockRewardsMobilePreview[0]]);
    this.reward = of(MockRewardsMobilePreview[0]);
  }

  public save(): void {
    this.router.navigateByUrl('/engagements');
  }

  public comeBack(): void {
    this.routingState.comeBackPreviousUrl();
  }
  public get name(): AbstractControl {
    return this.formReward.get(ControlsName.name);
  }

  public get headlineMessage(): AbstractControl {
    return this.formReward.get(ControlsName.headlineMessage);
  }

  public get subHeadlineMessage(): AbstractControl {
    return this.formReward.get(ControlsName.subHeadlineMessage);
  }

  public get buttonText(): AbstractControl {
    return this.formReward.get(ControlsName.buttonText);
  }

  public get background(): AbstractControl {
    return this.formReward.get(ControlsName.background);
  }

  public getImgLink(control: FormControl, defaultImg: string): string {
    return this.controlValueService.getImgLink(control, defaultImg);
  }

  private createRewardForm(): void {
    this.formReward = this.fb.group({
      name: ['Instant Reward 1', [Validators.required,
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
      typeImage: ['2', [Validators.required]],
      cardBackground: [null, [Validators.required]],
      background: [null, [Validators.required]],
      buttonText: ['See my rewards', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]]
    });
  }

  private getRewardData(): void {
    this.rewardData$ = this.rewardService.getRewardData()
      .pipe(
        tap((res) => {
          this.formReward.patchValue({
            [ControlsName.background]: res.background[0],
            [ControlsName.cardBackground]: res.cardBackground[0]
          });
        })
      );
  }
}
