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
      name: new FormControl(null, [Validators.required]),
      tiersCount: new FormControl(0),
      details: new FormGroup({
        pointsName: new FormControl(null,
          [Validators.required, Validators.minLength(1)]),
        imageUrl: new FormControl('https://www.gettyimages.co.uk/gi-resources/images/RoyaltyFree/Apr17Update/ColourSurge1.jpg'),
        joinMethod: new FormGroup({
          transactionAmount: new FormControl(true),
          signUp: new FormControl(false),
          inviteOnly: new FormControl(false),
          amount: new FormControl(null, [Validators.required, Validators.minLength(1)]),
        }, [Validators.required, ClValidators.requiredGroup]),
        poolId: new FormControl('1', Validators.required)
      }),
      tiersConversions: new FormGroup({
        globalEarnRule: new FormGroup({
          amount: new FormControl(1, [Validators.required, Validators.min(1)]),
          points: new FormControl(1, [Validators.required, Validators.min(1)])
        }),
        globalBurnRule: new FormGroup({
          amount: new FormControl(100, [Validators.required, Validators.min(1)]),
          points: new FormControl(5, [Validators.required, Validators.min(1)])
        }),
        pointsExpiry: new FormGroup({
          amount: new FormControl(1, [Validators.required]),
          type: new FormControl('year', [Validators.required]),
          trigger: new FormControl('accural', [Validators.required]),
        }),
        // tiers: new FormArray([])
      })
    });
  }

  // public getStep(step: any): FormGroup {
  //   switch (step) {
  //     case this.loyaltyFormType.details: {
  //       return this.getDetailsStep();
  //     }
  //     case this.loyaltyFormType.tiers: {
  //       return this.getTiersConversionsStep();
  //     }
  //     // case this.loyaltyFormType.four: {
  //     //   // TODO: need implement
  //     //   return null;
  //     // }
  //   }
  // }

  // public getDetailsStep(): FormGroup {
  //   return new FormGroup({
  //     pointsName: new FormControl(null, [Validators.required, Validators.minLength(1)]),
  //     imageUrl: new FormControl('https://www.gettyimages.co.uk/gi-resources/images/RoyaltyFree/Apr17Update/ColourSurge1.jpg'),
  //     joinMethod: new FormGroup({
  //       transactionAmount: new FormControl(true),
  //       signUp: new FormControl(false),
  //       inviteOnly: new FormControl(false),
  //       amount: new FormControl(null, [Validators.required, Validators.minLength(1)]),
  //     }, [Validators.required, ClValidators.requiredGroup]),
  //     poolId: new FormControl('1', Validators.required)
  //   });
  // }
  //
  // public getTiersConversionsStep(): FormGroup {
  //   return new FormGroup({
  //     globalEarnRule: new FormGroup({
  //       amount: new FormControl(1, [Validators.required, Validators.min(1)]),
  //       points: new FormControl(1, [Validators.required, Validators.min(1)])
  //     }),
  //     globalburnRule: new FormGroup({
  //       amount: new FormControl(100, [Validators.required, Validators.min(1)]),
  //       points: new FormControl(5, [Validators.required, Validators.min(1)])
  //     }),
  //     pointsExpiry: new FormGroup({
  //       amount: new FormControl(1, [Validators.required]),
  //       type: new FormControl('year', [Validators.required]),
  //       trigger: new FormControl('earned', [Validators.required]),
  //     }),
  //     tiers: new FormArray([])
  //   });
  // }

  // public getTierField(): FormGroup {
  //   return new FormGroup({
  //     tier: new FormControl(null, [Validators.required]),
  //     joinMethod: new FormControl(null, [Validators.required]),
  //     earnBonus: new FormControl(null, [Validators.required]),
  //     burnDiscount: new FormControl(null, [Validators.required]),
  //     pointsExpiry: new FormControl(null, [Validators.required])
  //   });
  // }

  public getTireForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, [Validators.required]),
      joinMethod: new FormGroup({
        pointsThreshold: new FormControl(false),
        inviteOnly: new FormControl(false),
        points: new FormControl(null)
      }, [Validators.required]),
      imageUrl: new FormControl(null,
        // [Validators.required]
      ),
      earnBonus: new FormControl(null, [Validators.required, Validators.min(1)]),
      burnDiscount: new FormControl(null, [Validators.required, Validators.min(1)]),
      pointsExpiry: new FormGroup({
        amount: new FormControl(null, [Validators.required]),
        type: new FormControl(null, [Validators.required]),
        trigger: new FormControl(null, [Validators.required]),
      })
    });
  }

  public getDefaultValueTireForm(): any {
    return {
      name: 'Gold',
      joinMethod: {
        inviteOnly: true,
      },
      earnBonus: 20,
      burnDiscount: 10,
      pointsExpiry: {
        amount: 3,
        type: 'day',
        trigger: 'inactive',
      }
    };
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
