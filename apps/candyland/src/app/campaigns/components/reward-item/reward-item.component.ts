import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-reward-item',
  templateUrl: './reward-item.component.html',
  styleUrls: ['./reward-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RewardItemComponent implements OnInit {
  @Input() public group: FormGroup = new FormGroup({value: new FormControl(null), propability: new FormControl(0)});
  @Output() clickDelete: EventEmitter<any> = new EventEmitter<any>();

  get data() {
    return this.group.value.value;
  }

  get propability() {
    return this.group.get('propability') || null;
  }

  get isInvalid() {
    return this.group.parent.invalid;
  }

  constructor() {
  }

  ngOnInit() {
  }

  public delete() {
    this.clickDelete.emit(this.data);
  }

}
