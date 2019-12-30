import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { IPools } from '@cl-core/models/audiences/audiences';

@Component({
  selector: 'cl-select-audience',
  templateUrl: './select-audience.component.html',
  styleUrls: ['./select-audience.component.scss']
})
export class SelectAudienceComponent implements OnInit {
  @Input() public group: FormGroup;
  @Input() public pools: IPools;

  public get poolId(): AbstractControl {
    return this.group.get('poolId');
  }

  public ngOnInit(): void {
  }

}
