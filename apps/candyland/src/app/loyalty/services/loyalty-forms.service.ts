import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoyaltyStepForm } from '../models/loyalty-step-form.enum';
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
      case this.loyaltyFormType.details: {
        return this.getDetailsStep();
      }
      case this.loyaltyFormType.tiers: {
        return this.getTiersConversionsStep();
      }
      // case this.loyaltyFormType.four: {
      //   // TODO: need implement
      //   return null;
      // }
    }
  }

  public getDetailsStep(): FormGroup {
    return new FormGroup({
      pointsName: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      mainImage: new FormControl('https://www.gettyimages.co.uk/gi-resources/images/RoyaltyFree/Apr17Update/ColourSurge1.jpg'),
      joiningMethod: new FormGroup({
        transactionAmount: new FormControl(false),
        signUp: new FormControl(false),
        byInvite: new FormControl(false),
        amount: new FormControl(null),
      }, [Validators.required, ClValidators.requiredGroup]),
      poolId: new FormControl(null, Validators.required)
    });
  }

  public getTiersConversionsStep(): FormGroup {
    return new FormGroup({
      globalEarnRule: new FormGroup({
        amount: new FormControl(2, [Validators.required, Validators.min(1)]),
        points: new FormControl(10, [Validators.required, Validators.min(1)])
      }),
      globalBurnRule: new FormGroup({
        amount: new FormControl(20, [Validators.required, Validators.min(1)]),
        points: new FormControl(2, [Validators.required, Validators.min(1)])
      }),
      pointsExpiry: new FormGroup({
        amount: new FormControl(1, [Validators.required]),
        period: new FormControl('day', [Validators.required]),
        type: new FormControl('earned', [Validators.required]),
      }),
      tiers: new FormArray([])
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
      earnBonus: new FormControl(null, [Validators.required, Validators.min(1)]),
      burnRule: new FormControl(null, [Validators.required, Validators.min(1)]),
      pointsExpiry: new FormGroup({
        amount: new FormControl(1, [Validators.required]),
        period: new FormControl('days', [Validators.required]),
        type: new FormControl('earned', [Validators.required]),
      })
    });
  }

  public getStepName(index: number): string {
    switch (index) {
      case this.loyaltyFormType.stepDetails: {
        return this.loyaltyFormType.details;
      }
      case this.loyaltyFormType.TiersConversions: {
        return this.loyaltyFormType.tiers;
      }
      case this.loyaltyFormType.stepReview: {
        return this.loyaltyFormType.review;
      }
      case this.loyaltyFormType.stepFour: {
        return this.loyaltyFormType.four;
      }
    }
  }

  public getRuleForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(null),
      conditions: new FormArray([]),
      result: new FormGroup({
        bonus: new FormControl(null, [Validators.required]),
        award: new FormControl(null),
        points: new FormControl(null),
        typeMultiplier: new FormControl(null, [Validators.required]),
        applyMultiplier: new FormControl(null, [Validators.required]),
        maximumPoints: new FormControl(null, [Validators.required]),
      })
    });
  }

  public checkExistingStepForm(form: FormGroup, step: string): boolean {
    return !!form.get(step);
  }
}
