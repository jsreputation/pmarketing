import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ICampaignOutcome } from '@cl-core/models/campaign/campaign';
import { IOutcome } from '@cl-core/models/outcome/outcome';
import { IRewardEntity } from '@cl-core/models/reward/reward-entity.interface';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'cl-reward-item',
  templateUrl: './reward-item.component.html',
  styleUrls: ['./reward-item.component.scss'],
})
export class RewardItemComponent implements OnInit {
  @Input() public templateID: number;
  @Input() public outcomeData: ICampaignOutcome;
  @Input() public enableProbability: boolean;
  @Input() public isInvalid: boolean;
  @Input() public overWriteProb: AbstractControl;

  @Output() private clickDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() private updateOutcome: EventEmitter<{ probability: number, limit: number }> =
    new EventEmitter<{ probability: number, limit: number }>();

  constructor(private cd: ChangeDetectorRef) {}

  public group: FormGroup = new FormGroup({
    probability: new FormControl(null, [Validators.min(1)]),
    limit: new FormControl(null, [Validators.min(1)])
  }, {updateOn: 'blur'});
  private destroy$: Subject<void> = new Subject();

  public get probability(): AbstractControl {
    return this.group.get('probability');
  }

  public get limit(): AbstractControl {
    return this.group.get('limit');
  }

  public get outcome(): IOutcome {
    return this.outcomeData.outcome;
  }

  public get data(): IRewardEntity {
    return this.outcomeData.reward;
  }

  public ngOnInit(): void {
    this.initForm();
    this.group.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      () => {
        this.updateOutcomeData();
      }
    );
  }

  private initForm(): void {
    this.group.patchValue({ probability: this.outcome.probability, limit: this.outcome.limit });
  }

  public updateOutcomeData(resetProb?: boolean): void {
    const updateData = {
      probability: resetProb ? null : (this.group.get('probability').value || null),
      limit: this.group.get('limit').value || null,
    };
    this.updateOutcome.emit(updateData);
  }
  public delete(): void {
    this.clickDelete.emit(this.outcomeData);
  }

  public runChangeDetection(): void {
    this.cd.detectChanges();
  }

}
