import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { AbstractStepWithForm } from 'src/app/campaigns/step-page-with-form';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';

@Component({
  selector: 'cl-new-campaign-rewards-stamps-page',
  templateUrl: './new-campaign-rewards-stamps-page.component.html',
  styleUrls: ['./new-campaign-rewards-stamps-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsStampsPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  public form: FormGroup;
  private defaultValue = {
    rewardsList: [
      {
        stampSlotNumber: 2,
        rewardsOptions: {
          enableProbability: true,
          rewards: [
            {
              value: null,
              probability: 5
            },
            {
              value: {
                id: 1,
                image: 'assets/images/mask-group.png',
                name: 'Free Coffee',
                type: 'Starbucks',
                current: 500,
                total: 1000
              },
              probability: 20
            },
            {
              value: {
                id: 2,
                image: 'assets/images/mask-group.png',
                name: 'Free Coffee 2',
                type: 'Starbucks',
                current: 500,
                total: 800
              },
              probability: 43
            }
          ]
        }
      },
      {
        stampSlotNumber: 4,
        rewardsOptions: {
          enableProbability: false,
          rewards: [
            {
              value: {
                id: 1,
                image: 'assets/images/mask-group.png',
                name: 'Free Coffee',
                type: 'Starbucks',
                current: 500,
                total: 1000
              }
            },
            {
              value: {
                id: 2,
                image: 'assets/images/mask-group.png',
                name: 'Free Coffee 2',
                type: 'Starbucks',
                current: 500,
                total: 800
              }
            }
          ]
        }
      }
    ]
  };

  constructor(
    public store: CampaignCreationStoreService,
    public stepConditionService: StepConditionService,
    public cd: ChangeDetectorRef,
    private fb: FormBuilder) {
    super(1, store, stepConditionService, cd);
    this.initForm();
    // this.form = this.fb.group({
    //   rewardsList: this.fb.array([this.createRewardForm(0)])
    // });
  }

  public ngOnInit() {
    super.ngOnInit();
    const stampsSlotNumber = this.store.currentCampaign.template.payload.stampsSlotNumber;
    console.log('stampsSlotNumber', stampsSlotNumber);
    for (const slotNumber of stampsSlotNumber) {
      console.log('slotNumber', slotNumber);
      this.addReward(this.createRewardForm(slotNumber));
    }
    // this.form.patchValue(this.defaultValue);
  }

  ngOnDestroy(): void {
  }

  public get rewardsList() {
    return this.form.get('rewardsList') as FormArray;
  }

  private initForm(): void {
    this.form = this.fb.group({
      rewardsList: this.fb.array([]),
      limits: this.fb.group({
        enableStampCard: [true],
        stampCard: this.fb.group({
          perCampaign: [null, [Validators.max(1000)]],
          perUser: [null, [Validators.max(1000)]],
          duration: []
        }),
        enableStamp: [true],
        stamp: this.fb.group({
          perUser: [null, [Validators.max(1000)]],
          duration: []
        })
      }),
      enableStampCardsValidity: [],
      stampCardsValidity: this.fb.group({
        times: [],
        duration: []
      })
    });
  }


  public addReward(formGroup: FormGroup): void {
    this.rewardsList.push(formGroup);
    this.cd.detectChanges();
  }

  public removeReward(index: number): void {
    this.rewardsList.removeAt(index);
  }

  private createRewardForm(slotNumber: number): FormGroup {
    console.log(slotNumber);
    // return this.fb.control([]);
    return this.fb.group({
      stampSlotNumber: slotNumber,
      rewardsOptions: []
    });
  }
}
