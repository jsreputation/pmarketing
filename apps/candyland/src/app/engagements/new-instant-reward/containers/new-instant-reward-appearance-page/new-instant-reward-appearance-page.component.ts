import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RewardService } from '@cl-core/http-services/reward.service';
import { Observable } from 'rxjs';
import { RoutingStateService } from '@cl-core/services/routing-state.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

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
              private routingState: RoutingStateService,
              private router: Router) { }

  public ngOnInit(): void {
    this.createRewardForm();
    this.getRewardBackground();
    this.getRewardCardBackground();
  }

  public save(): void {
    this.router.navigateByUrl('/engagements');
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

  private getRewardCardBackground(): void {
    this.rewardsCardBackground$ = this.rewardService.getRewardCardBackground()
      .pipe(
        tap((res) => {
          this.patchForm('cardBackground', res[0]);
        })
      );
  }

  private getRewardBackground(): void {
    this.rewardsBackground$ = this.rewardService.getRewardBackground()
      .pipe(
        tap((res) => {
          this.patchForm('background', res[0]);
        })
      );
  }

  private patchForm(fieldName: string, value: any): void {
    this.formReward.patchValue({
      [fieldName]: value
    });
  }
}
