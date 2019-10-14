import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-select-audience',
  templateUrl: './select-audience.component.html',
  styleUrls: ['./select-audience.component.scss']
})
export class SelectAudienceComponent implements OnInit {
  @Input() public group: FormGroup;

  public get selectAudience(): AbstractControl {
    return this.group.get('selectAudience');
  }
  public get audienceType(): AbstractControl {
    return this.group.get('selectAudience.audienceType');
  }


  ngOnInit() {
  }

}
