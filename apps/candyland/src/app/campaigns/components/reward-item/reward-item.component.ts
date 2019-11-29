import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { IRewardEntity } from '@cl-core/models/reward/reward-entity.interface';

@Component({
  selector: 'cl-reward-item',
  templateUrl: './reward-item.component.html',
  styleUrls: ['./reward-item.component.scss'],
})
export class RewardItemComponent implements OnInit {
  @Input() public group: FormGroup = new FormGroup({
    value: new FormControl(null),
    probability: new FormControl({ value: 0, disabled: true }),
    limit: new FormControl({ value: 0 })
  });
  @Output() private clickDelete: EventEmitter<any> = new EventEmitter<any>();

  public get data(): IRewardEntity | null {
    return this.group.value.value;
  }

  public get probability(): AbstractControl {
    return this.group.get('probability');
  }

  public get limit(): AbstractControl {
    return this.group.get('limit');
  }

  public get isInvalid(): boolean {
    return this.group.parent.invalid;
  }

  public ngOnInit(): void {
  }

  public delete(): void {
    this.clickDelete.emit(this.data);
  }
}
