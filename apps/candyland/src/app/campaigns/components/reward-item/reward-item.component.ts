import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-reward-item',
  templateUrl: './reward-item.component.html',
  styleUrls: ['./reward-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RewardItemComponent {
  @Input() public group: FormGroup = new FormGroup({ value: new FormControl(null), propability: new FormControl(0) });
  @Output() public clickDelete: EventEmitter<any> = new EventEmitter<any>();

  get data(): any {
    return this.group.value.value;
  }

  get propability(): any {
    return this.group.get('probability') || null;
  }

  get isInvalid(): boolean {
    return this.group.parent.invalid;
  }

  public delete(): void {
    this.clickDelete.emit(this.data);
  }
}
