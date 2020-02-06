import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { SurveyService } from '@cl-core/services';
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
  @Output() public removeBranch: EventEmitter<number> = new EventEmitter<number>();

  constructor(private surveyService: SurveyService, private merchantFormService: MerchantFormService) { }

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

  public get branches(): FormArray {
    return (this.formMerchant.get('branches') as FormArray);
  }

  public removeBranches(index: number): void {
    this.removeBranch.emit(index);
  }

  public addBranch(): void {
    this.branches.push(this.merchantFormService.getMerchantBranchField());
    this.formMerchant.updateValueAndValidity();
  }

  private getCountries(): void {
    this.countriesList$ = this.surveyService.getCountriesList();
  }

}
