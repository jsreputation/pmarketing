import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { IWPools } from '@perx/whistler';

@Component({
  selector: 'cl-select-audience',
  templateUrl: './select-audience.component.html',
  styleUrls: ['./select-audience.component.scss']
})
export class SelectAudienceComponent implements OnInit {
  @Input() public group: FormGroup;
  @Input() public pools: IWPools;

  public get poolId(): AbstractControl {
    return this.group.get('poolId');
  }

  public ngOnInit(): void {
  }

}
