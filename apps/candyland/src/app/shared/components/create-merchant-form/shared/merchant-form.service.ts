import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClValidators } from '@cl-helpers/cl-validators';

@Injectable({
  providedIn: 'root'
})
export class MerchantFormService {
  // tslint:disable
  private testData = {
    'name': 'Merchant 1',
    'image': 'data:image/png;base64,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',
    'description': 'description asldfasldkjf\'asdjf\'paosjdf\'pojfp asdfasdfasdf',
    'countryCode': '+994',
    'contactNumber': '55555556666666',
    'address': 'Some sity for test',
    'city': 'Tokio',
    'stateProvince': 'small-tokio',
    'postalCode': 3546464,
    'weblink': 'https://angular.io/api/forms/FormArray#clear',

    'branches': [{
      'name': 'aaaaaaaaaaaaaa',
      'address': 'dddddddddddddd',
      'contactNumber': 34534252345234
    }, {'name': 'bbbbbbbbbbbb', 'address': 'xxxxxxxxxxx', 'contactNumber': 345345345345}, {
      'name': 'gggggggggggggg',
      'address': 'tttttttttttttttt',
      'contactNumber': 344444444444
    }]
  };

  constructor(private fb: FormBuilder) {
  }

  public getMerchantForm(): FormGroup {
    return this.fb.group({
      name: ['Merchant 1', [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
      image: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(120)]],
      countryCode: [null, [Validators.required]],
      contactNumber: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      stateProvince: [null, [Validators.required]],
      postalCode: [null, [Validators.required]],
      weblink: [null, [Validators.required, ClValidators.checkUrl]],
      onBranches: [null],
      branches: this.fb.array([])
    });
  }

  public patchMerchantForm(form: FormGroup, val: any): void {
    val = this.testData;
    form.patchValue(val);
    if (val.branches && val.branches.length) {
      form.get('onBranches').patchValue(true);
      val.branches.forEach((branch) => {
        const merchantBranchField: FormGroup = this.getMerchantBranchField();
        merchantBranchField.patchValue(branch);
        (form.get('branches') as FormArray).push(merchantBranchField);
      })
    }
  }

  public getMerchantBranchField(): FormGroup {
    return this.fb.group({
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      address: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      contactNumber: [null]
    });
  }
}
