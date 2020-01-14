import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClValidators } from '@cl-helpers/cl-validators';

@Injectable({
  providedIn: 'root'
})
export class MerchantFormService {
  // tslint:disable

  constructor(private fb: FormBuilder) {
  }

  public getMerchantForm(): FormGroup {
    return this.fb.group({
      id: [null],
      name: ['Merchant', [Validators.minLength(1), Validators.maxLength(60)]],
      image: ['https://static.tildacdn.com/tild6661-3337-4263-b030-356164653838/fid_dlya_google_merc.png', [ //'https://static.tildacdn.com/tild6661-3337-4263-b030-356164653838/fid_dlya_google_merc.png'
        // Validators.required
      ]],
      description: [null, [
        // Validators.required,
        Validators.minLength(1),
        Validators.maxLength(120)
      ]],
      countryCode: [null, []],
      phone: [null, []],
      address: [null, []],
      city: [null, []],
      state: [null, []],
      postalCode: [null, []],
      weblink: [null, [ClValidators.checkUrl]],
      // onBranches: [null],
      branches: this.fb.array([])
    });
  }

  public patchMerchantForm(form: FormGroup, val: any): void {
    if (val.branches && val.branches.length) {
      // form.get('onBranches').patchValue(true);
      val.branches.forEach((branch) => {
        const merchantBranchField: FormGroup = this.getMerchantBranchField();
        merchantBranchField.patchValue(branch);
        (form.get('branches') as FormArray).push(merchantBranchField);
      });
    }
    form.patchValue(val);
    form.updateValueAndValidity();
  }

  public getMerchantBranchField(): FormGroup {
    return this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      address: [null, [Validators.minLength(5), Validators.maxLength(60)]],
      phone: [null]
    });
  }
}
