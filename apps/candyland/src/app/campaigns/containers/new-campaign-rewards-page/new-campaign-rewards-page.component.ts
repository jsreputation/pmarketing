import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CampaignCreationStoreService} from "@cl-core/services/campaigns-creation-store.service";

@Component({
  selector: 'cl-new-campaign-rewards-page',
  templateUrl: './new-campaign-rewards-page.component.html',
  styleUrls: ['./new-campaign-rewards-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsPageComponent implements OnInit {
  // public enablePropability = false;
  public rewardsData = [
    {
      id: 1,
      image: '/assets/images/mask-group.png',
      name: 'Free Coffee',
      type: 'Starbucks',
      current: 500,
      total: 1000,
    },
    {
      id: 2,
      image: '/assets/images/mask-group.png',
      name: 'Free Coffee 2',
      type: 'Starbucks',
      current: 500,
      total: 1000,
    },
    {
      id: 3,
      image: '/assets/images/mask-group.png',
      name: 'Free Coffee 3',
      type: 'Starbucks',
      current: 500,
      total: 1000,
    }
  ];
  public form: FormGroup;

  constructor(
    // private cd: ChangeDetectorRef,
    private store: CampaignCreationStoreService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
    this.form.valueChanges.subscribe(value => this.store.updateCampaign(value));
  }

  private initForm() {
    this.form = this.fb.group({
      enablePropability: ([false]),
      // rewards: this.fb.array([{
      //   value: null,
      //   propability: 0
      // }]),
      limits: this.fb.group({
        times: [null, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(60)
        ]],
        duration: [null, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(60)
        ]]
      })
    });
    this.form.patchValue(this.store.currentCampaign);
  }

  get enablePropability() {
    return this.form.get('enablePropability').value;
  }

  public addReward(value = null, propability = 0): void {
    this.rewards.push(
      this.fb.group({value: value, propability: propability})
    );
  }

  public removeReward(index: number) {
    this.rewards.removeAt(index);
  }

  get rewards() {
    return <FormArray>this.form.get('rewards');
  }

  // changePropability(value: boolean) {
  //   this.enablePropability = value;
  //   this.cd.detectChanges();
  // }

}
