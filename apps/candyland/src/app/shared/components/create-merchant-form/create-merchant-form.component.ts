import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { SurveyService } from '@cl-core/services/survey.service';
import { Observable } from 'rxjs';
import { MerchantFormService } from '@cl-shared/components/create-merchant-form/shared/merchant-form.service';

@Component({
  selector: 'cl-create-merchant-form',
  templateUrl: './create-merchant-form.component.html',
  styleUrls: ['./create-merchant-form.component.scss']
})
export class CreateMerchantFormComponent implements OnInit {
  @Input() public settings: IMerchantFormConfig = {
    shoveName: false
  };
  @Input() public formMerchant: FormGroup;
  public countriesList$: Observable<any>;
  constructor(private surveyService: SurveyService,
              private merchantFormService: MerchantFormService) { }

  public ngOnInit(): void {
    this.getCountries();
  }

  public get name(): AbstractControl {
    return this.formMerchant.get('name');
  }

  public get description(): AbstractControl {
    return this.formMerchant.get('description');
  }

  public get weblink(): AbstractControl {
    return this.formMerchant.get('weblink');
  }

  public get image(): AbstractControl {
    return this.formMerchant.get('image');
  }

  public get onBranches(): AbstractControl {
    return this.formMerchant.get('onBranches');
  }

  public get branches(): FormArray {
    return (this.formMerchant.get('branches') as FormArray);
  }

  public removeBranches(i?: number): void {
    if (!i) {
      this.branches.clear();
      this.formMerchant.updateValueAndValidity();
      return;
    }
    this.branches.removeAt(i);
  }

  public addBranch(): void {
    this.branches.push(this.merchantFormService.getMerchantBranchField());
  }

  private getCountries(): void {
    this.countriesList$ = this.surveyService.getCountriesList();
  }

}
