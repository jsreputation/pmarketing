import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CampaignCreationStoreService} from "@cl-core/services/campaigns-creation-store.service";

@Component({
  selector: 'cl-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignComponent implements OnInit {
  form: FormGroup;

  constructor(private store: CampaignCreationStoreService,
              private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.form.valueChanges.subscribe(value => this.store.updateCampaign(value));
  }

  private initForm() {
      this.form = this.fb.group({
        name: ['Campaign Name', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(60)
        ]
        ]
      });
  }

  public get name(): AbstractControl {
    return this.form.get('name');
  }
}

