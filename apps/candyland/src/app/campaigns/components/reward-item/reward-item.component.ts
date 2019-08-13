import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-reward-item',
  templateUrl: './reward-item.component.html',
  styleUrls: ['./reward-item.component.scss'],
})
export class RewardItemComponent implements OnInit {
  @Input() public group: FormGroup = new FormGroup({
    value: new FormControl(null),
    probability: new FormControl({value: 0, disabled: true})
  });
  @Output() clickDelete: EventEmitter<any> = new EventEmitter<any>();

  get data() {
    return this.group.value.value;
  }

  public get probability(): AbstractControl {
    return this.group.get('probability');
  }

  public get isInvalid() {
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
