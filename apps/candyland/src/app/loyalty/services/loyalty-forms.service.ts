import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoyaltyStepForm } from '../models/loyalty-stap-form';
import { ClValidators } from '@cl-helpers/cl-validators';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyFormsService {
  private loyaltyFormType: typeof LoyaltyStepForm = LoyaltyStepForm;
  public getFormLoyalty(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
  }

  public getStep(step: any): FormGroup {
    switch (step) {
      case this.loyaltyFormType.one: {
        return this.getFirsStep();
      }
      case this.loyaltyFormType.two: {
        return this.getSecondaryStep();
      }
      case this.loyaltyFormType.three: {
        // TODO: need implement
        return null;
      }
      case this.loyaltyFormType.four: {
        // TODO: need implement
        return null;
      }
    }
  }

  public getFirsStep(): FormGroup {
    return new FormGroup({
      pointsName: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      mainImage: new FormControl(null),
      joiningMethod: new FormGroup( {
        transactionAmount: new FormControl(false),
        signUp: new FormControl(false),
        byInvite: new FormControl(false),
        amount: new FormControl(null),
      }, [Validators.required, ClValidators.requiredGroup]),
      selectAudience: new FormGroup({
        audienceType: new FormControl(null, [Validators.required]),
        allMyAudience: new FormControl(null),
        uploadFile: new FormControl(null)
      }, ClValidators.requiredGroup)
    });
  }

  public getSecondaryStep(): FormGroup {
    return new FormGroup({
      globalEarnRule: new FormGroup({
        amount: new FormControl(null, [Validators.required, Validators.min(1)]),
        points: new FormControl(null, [Validators.required, Validators.min(1)])
      }),
      globalBurnRule: new FormGroup({
        amount: new FormControl(null, [Validators.required, Validators.min(1)]),
        points: new FormControl(null, [Validators.required, Validators.min(1)])
      }),
      pointsExpiry: new FormGroup({
        pointWasEarnedAmount: new FormControl(1, [Validators.required]),
        pointWasEarnedPeriod: new FormControl('days', [Validators.required]),
        userInactivityAmount: new FormControl(1, [Validators.required]),
        userInactivityPeriod: new FormControl('days', [Validators.required])
      }),
      tiers: new FormArray([], [Validators.required])
    });
  }

  public getTierField(): FormGroup {
    return new FormGroup({
      tier: new FormControl(null, [Validators.required]),
      qualification: new FormControl(null, [Validators.required]),
      earnBonus: new FormControl(null, [Validators.required]),
      burnDiscount: new FormControl(null, [Validators.required]),
      pointsExpiry: new FormControl(null, [Validators.required])
    });
  }

  public getTireForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, [Validators.required]),
      qualification: new FormGroup({
        pointsThreshold: new FormControl(false),
        inviteOnly: new FormControl(false),
        points: new FormControl(null)
      }, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required]),
      earnForTier: new FormControl(null, [Validators.required, Validators.min(1)]),
      burnRule: new FormControl(null, [Validators.required, Validators.min(1)]),
      pointsExpiry: new FormGroup({
        pointWasEarnedAmount: new FormControl(1, [Validators.required]),
        pointWasEarnedPeriod: new FormControl('days', [Validators.required]),
        userInactivityAmount: new FormControl(1, [Validators.required]),
        userInactivityPeriod: new FormControl('days', [Validators.required])
      })
    });
  }

  public getStepName(index: number): string {
    switch (index) {
      case this.loyaltyFormType.stepOne: {
        return this.loyaltyFormType.one;
      }
      case this.loyaltyFormType.stepTwo: {
        return this.loyaltyFormType.two;
      }
      case this.loyaltyFormType.stepThree: {
        return this.loyaltyFormType.three;
      }
      case this.loyaltyFormType.stepFour: {
        return this.loyaltyFormType.four;
      }
    }
  }

  public checkExistingStepForm(form: FormGroup, step: string): boolean {
    return !!form.get(step);
  }
}
