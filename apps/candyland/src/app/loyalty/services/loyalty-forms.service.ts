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
      status: new FormControl(null),
      tiersCount: new FormControl(0),
      details: new FormGroup({
        pointsName: new FormControl(null,
          [Validators.required, Validators.minLength(1)]),
        imageUrl: new FormControl(null, [Validators.required]),
        joinMethod: new FormGroup({
          transactionAmount: new FormControl(false),
          signUp: new FormControl(false),
          inviteOnly: new FormControl(false),
          amount: new FormControl({value: null, disabled: true}, [Validators.required, Validators.min(1)]),
        }, [ClValidators.requiredGroup]),
        poolId: new FormControl(null,
          // [ Validators.required]
        )
      }),
      tiersConversions: new FormGroup({
        globalEarnRule: new FormGroup({
          amount: new FormControl(null, [Validators.required, Validators.min(1)]),
          points: new FormControl(null, [Validators.required, Validators.min(1)])
        }),
        globalBurnRule: new FormGroup({
          amount: new FormControl(null, [Validators.required, Validators.min(1)]),
          points: new FormControl(null, [Validators.required, Validators.min(1)])
        }),
        pointsExpiry: new FormGroup({
          amount: new FormControl(null, [Validators.required, Validators.min(1)]),
          type: new FormControl(null, [Validators.required]),
          trigger: new FormControl(null, [Validators.required]),
        })
      })
    });
  }

  public getDefaultValueForm(): any {
    return {
      name: null,
      tiersCount: 0,
      status: 'draft',
      details: {
        pointsName: 'Point as default',
        imageUrl: null,
        joinMethod: {
          inviteOnly: true,
        },
        poolId: null
      },
      tiersConversions: {
        globalEarnRule: {
          amount: 1,
          points: 1,
        },
        globalBurnRule: {
          amount: 100,
          points: 5,
        },
        pointsExpiry: {
          amount: 1,
          type: 'year',
          trigger: 'accrual',
        }
      }
    };
  }

  public getTireForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(60)]),
      joinMethod: new FormGroup({
        pointsThreshold: new FormControl(false),
        inviteOnly: new FormControl(false),
        points: new FormControl({value: null, disabled: true},
          [Validators.required, Validators.min(1)])
      }, [ClValidators.requiredGroup]),
      imageUrl: new FormControl(null,
        [Validators.required]),
      earnBonus: new FormControl(null,
        [Validators.required, Validators.min(0), Validators.max(100)]),
      burnDiscount: new FormControl(null,
        [Validators.required, Validators.min(0), Validators.max(100)]),
      pointsExpiry: new FormGroup({
        amount: new FormControl(null, [Validators.required, Validators.min(1)]),
        type: new FormControl(null, [Validators.required]),
        trigger: new FormControl(null, [Validators.required]),
      })
    });
  }

  public getDefaultValueTireForm(): any {
    return {
      name: null,
      joinMethod: {
        inviteOnly: true,
      },
      imageUrl: null,
      earnBonus: 0,
      burnDiscount: 0,
      pointsExpiry: {
        amount: 1,
        type: 'year',
        trigger: 'accrual',
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
