import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RewardService } from '@cl-core/http-services/reward.service';
import { Observable } from 'rxjs';
import { RoutingStateService } from '@cl-core/services/routing-state.service';

@Component({
  selector: 'cl-new-instant-reward-appearance-page',
  templateUrl: './new-instant-reward-appearance-page.component.html',
  styleUrls: ['./new-instant-reward-appearance-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewInstantRewardAppearancePageComponent implements OnInit {
  public formReward: FormGroup;
  public rewardsCardBackground$: Observable<IGraphic>;
  public rewardsBackground$: Observable<IGraphic>;
  constructor(private fb: FormBuilder,
              private rewardService: RewardService,
              private routingState: RoutingStateService) { }

  ngOnInit() {
    this.createRewardForm();
    this.getRewardBackground();
    this.getRewardCardBackground();
  }

  public save(): void {
    console.log(this.formReward.value);
  }

  public comeBack(): void {
    this.routingState.comeBackPreviousUrl();
  }

  public get name(): AbstractControl {
    return this.formReward.get('name');
  }

  public get headlineMessage(): AbstractControl {
    return this.formReward.get('headlineMessage');
  }

  public get subHeadlineMessage(): AbstractControl {
    return this.formReward.get('subHeadlineMessage');
  }

  public get buttonText(): AbstractControl {
    return this.formReward.get('buttonText');
  }

  private createRewardForm(): void {
    this.formReward = this.fb.group({
      name: ['Instant Reward 1', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]
      ],
      headlineMessage: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      subHeadlineMessage: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      typeImage: [null, [Validators.required]],
      cardBackground: [null, [Validators.required]],
      background: [null, [Validators.required]],
      buttonText: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]]
    });
  }

  private getRewardCardBackground(): void {
    this.rewardsCardBackground$ = this.rewardService.getRewardCardBackground();
  }

  private getRewardBackground(): void {
    this.rewardsBackground$ = this.rewardService.getRewardBackground();
  }
}
