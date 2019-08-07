import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RewardService } from '@cl-core/http-services/reward.service';
import { Observable } from 'rxjs';
import { RoutingStateService } from '@cl-core/services/routing-state.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ControlsName } from '../../../../models/controls-name';

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
  public rewardsBackground$: Observable<IGraphic>;
  constructor(private fb: FormBuilder,
              private rewardService: RewardService,
              private routingState: RoutingStateService,
              private router: Router) { }

  public ngOnInit(): void {
    this.createRewardForm();
    this.getRewardData();
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
