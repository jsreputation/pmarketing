import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cl-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  name: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.name = new FormControl('Campaign Name', [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(60)]
    );
  }

}
