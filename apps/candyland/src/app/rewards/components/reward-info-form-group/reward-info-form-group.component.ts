import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'cl-reward-info-form-group',
  templateUrl: './reward-info-form-group.component.html',
  styleUrls: ['./reward-info-form-group.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RewardInfoFormGroupComponent implements OnInit {
  @Input() formGroup: AbstractControl;
  @Input() config: { [key: string]: OptionConfig[] };

  constructor() {
  }

  ngOnInit() {
  }

}
