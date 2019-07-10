import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cl-reward-item',
  templateUrl: './reward-item.component.html',
  styleUrls: ['./reward-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RewardItemComponent implements OnInit {
  @Input() public enableProbability = false;
  @Input() public data = {
    id: 1,
    image: '/assets/images/mask-group.png',
    name: 'Free Coffee',
    type: 'Starbucks',
    current: 500,
    total: 1000,
  };
  @Input() public control: FormControl = new FormControl('probability', []);

  @Output() clickDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  public delete() {
    this.clickDelete.emit(this.data);
  }

}
