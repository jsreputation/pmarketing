import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { SurveyService } from '@cl-core/services/survey.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cl-create-merchant-form',
  templateUrl: './create-merchant-form.component.html',
  styleUrls: ['./create-merchant-form.component.scss']
})
export class CreateMerchantFormComponent implements OnInit {
  @Input() public settings: IMerchantFormConfig = {
    title: 'Merchant Info',
    shoveName: false
  };
  @Input() public formMerchant: FormGroup;
  public countriesList$: Observable<any>;
  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    this.getCountries();
  }

  public get name(): AbstractControl {
    return this.formMerchant.get('name');
  }

  public get image(): AbstractControl {
    return this.formMerchant.get('image');
  }

  private getCountries(): void {
    this.countriesList$ = this.surveyService.getCountriesList();
  }

}
